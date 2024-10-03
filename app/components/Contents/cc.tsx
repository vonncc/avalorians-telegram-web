"use client";

import { FC, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@nextui-org/react";

import styles from "../../styles/cc.module.css";
import characterCustomizationData from "../../data/character-customization-data.json";
import {
    ChildComponentProp,
    CharacterCustomizationData,
    Gender,
    HairData,
    SkinData,
    ClothData,
    AppearanceData,
    CustomizationSteps,
} from "../../types/types";

import arrowLeft from "../../../public/assets/images/icons/arrowLeft.png";
import arrowRight from "../../../public/assets/images/icons/arrowRight.png";
import { AvalorianDesignedSliderCC } from "../elements/avalorianDesignedSliderCC";
import { API_ENDPOINTS } from "@/app/_globals/constants/baseUrl";
import { useToken } from "@/app/context/token.context";

const PATH_CHARACTER: string = "/assets/images/character";
const PATH_SKIN_M: string = `${PATH_CHARACTER}/skin/male/`;
const PATH_SKIN_F: string = `${PATH_CHARACTER}/skin/female/`;
const PATH_HAIR_M: string = `${PATH_CHARACTER}/hair/male/`;
const PATH_HAIR_F: string = `${PATH_CHARACTER}/hair/female/`;
const PATH_CLOTH_M: string = `${PATH_CHARACTER}/cloth/male/`;
const PATH_CLOTH_F: string = `${PATH_CHARACTER}/cloth/female/`;

const colorChosen: string = "rgb(0, 156, 254)";
const colorUnchosen: string = "white";
const EMPTY_STRING: string = "";
const PNG: string = ".png";

//VS Code supports code folding based on #region/#endregion comments, so you can collapse or expand sections marked with these comments

//{"name":"chris","gender":"male","skin":"light-brown-male","hair":"hair-1-m"} sample jsonData string

const CharacterCreationV2: FC<ChildComponentProp> = ({ jsonData, CharacterCreateEvent }) => {
    //pass optional json string

    // #region Mount/Unmount
    const genderCC = useRef<Gender>();
    const initLoadFlag = useRef<boolean>(jsonData ? true : false);

    const defaultData: CharacterCustomizationData = {
        name: EMPTY_STRING,
        gender: "Male",
        skin: "200",
        hair: "206",
        cloth: "222",
    };

    const dataCC = useRef<CharacterCustomizationData>(defaultData);

    //const jsonString = JSON.stringify(defaultData);

    useEffect(() => {
        //runs once when the component mounts

        //parse JSON string if provided, otherwise use default data
        try {
            dataCC.current = jsonData ? JSON.parse(jsonData) : defaultData;
        } catch (error) {
            //console.error('Invalid JSON string:', error);
            //dataCC.current = defaultData;
        }

        const genderTest: Gender | undefined = stringToGender(dataCC.current.gender);

        if (genderTest !== undefined) {
            genderCC.current = genderTest;

            setHeroName(dataCC.current.name);
            setSelectedGender(genderCC.current);
            setGenderTextColor(genderCC.current);

            setCurrentIndexHairM(genderCC.current === Gender.Male ? hairColorsM.indexOf(dataCC.current.hair) : 0);
            setCurrentIndexHairF(genderCC.current === Gender.Female ? hairColorsF.indexOf(dataCC.current.hair) : 0);
            setCurrentIndexSkinM(genderCC.current === Gender.Male ? skinColorsM.indexOf(dataCC.current.skin) : 0);
            setCurrentIndexSkinF(genderCC.current === Gender.Female ? skinColorsF.indexOf(dataCC.current.skin) : 0);
            setCurrentIndexClothM(genderCC.current === Gender.Male ? clothColorsM.indexOf(dataCC.current.cloth) : 0);
            setCurrentIndexClothF(genderCC.current === Gender.Female ? clothColorsF.indexOf(dataCC.current.cloth) : 0);

            setSkin(
                genderCC.current === Gender.Male
                    ? `url('${PATH_SKIN_M}${skinColorsM[skinColorsM.indexOf(dataCC.current.skin)]}${PNG}`
                    : `url('${PATH_SKIN_F}${skinColorsF[skinColorsF.indexOf(dataCC.current.skin)]}${PNG}`
            );

            setHair(
                genderCC.current === Gender.Male
                    ? `url('${PATH_HAIR_M}${hairColorsM[hairColorsM.indexOf(dataCC.current.hair)]}${PNG}`
                    : `url('${PATH_HAIR_F}${hairColorsF[hairColorsF.indexOf(dataCC.current.hair)]}${PNG}`
            );

            setCloth(
                genderCC.current === Gender.Male
                    ? `url('${PATH_CLOTH_M}${clothColorsM[clothColorsM.indexOf(dataCC.current.cloth)]}${PNG}`
                    : `url('${PATH_CLOTH_F}${clothColorsF[clothColorsF.indexOf(dataCC.current.cloth)]}${PNG}`
            );
        } else {
            //handle error in parsing gender (if loaded from json), possibly json is modified manually
            genderCC.current = Gender.Male; //temporary, should be revised later
        }

        return () => {
            //runs when the component unmounts
        };
    }, []); //empty dependency array ensures this runs only once
    // #endregion

    // #region CharacterViewer
    const [viewerColor, setviewerColor] = useState<string>(EMPTY_STRING);

    function displayViewer(): void {
        setviewerColor("rgb(180, 186, 192)");
    }

    function hideViewer(): void {
        setviewerColor(EMPTY_STRING);
    }
    // #endregion

    // #region Steps
    const [currentStep, setCurrentStep] = useState<CustomizationSteps>(CustomizationSteps.Name);

    const changeStep = (setStep: React.Dispatch<React.SetStateAction<CustomizationSteps>>, step: CustomizationSteps) => {
        setStep(step);
        changeLabel(step);
    };
    // #endregion

    // #region InstructionLabel
    const LABEL_HEADER: string = "CREATE YOUR OWN HERO";
    const INSTRUCTION_NAME: string = "ENTER THE NAME OF YOUR HERO";
    const INSTRUCTION_APPEARANCE: string = "CHOOSE THE APPEARANCE OF THE ENTIRE HERO";
    const INSTRUCTION_CLOTH: string = "CHOOSE THE CLOTHES OF THE HERO";
    const [instructionLabel, setInstructionLabel] = useState<string>(INSTRUCTION_NAME);

    function changeLabel(step: CustomizationSteps): void {
        if (step === CustomizationSteps.Name) {
            setInstructionLabel(INSTRUCTION_NAME);
        } else if (step === CustomizationSteps.Gender) {
            setInstructionLabel(EMPTY_STRING);
        } else if (step === CustomizationSteps.Hair || step === CustomizationSteps.Skin) {
            setInstructionLabel(INSTRUCTION_APPEARANCE);
        } else if (step === CustomizationSteps.Cloth) {
            setInstructionLabel(INSTRUCTION_CLOTH);
        }
    }
    // #endregion

    // #region HeroName
    const inputRef = useRef<HTMLInputElement>(null);
    const [heroName, setHeroName] = useState<string>(EMPTY_STRING); //will be overriden in useEffect()

    function checkName(): boolean {
        const inputVal = inputRef.current?.value.trim(); //get the input value and trim whitespace
        if (inputVal) {
            setHeroName(inputVal);
            return true;
        } else return false;
    }
    // #endregion

    // #region Gender
    const [selectedGender, setSelectedGender] = useState<Gender>(Gender.Male); //will be overriden in useEffect()
    const [previousGender, setPreviousGender] = useState<Gender | null>(null);
    const [textMaleColor, setTextMaleColor] = useState<string>(colorChosen);
    const [textFemaleColor, setTextFemaleColor] = useState<string>(colorUnchosen);

    function setGenderTextColor(gender: Gender) {
        if (gender === Gender.Male) {
            setTextMaleColor(colorChosen);
            setTextFemaleColor(colorUnchosen);
        } else if (gender === Gender.Female) {
            setTextMaleColor(colorUnchosen);
            setTextFemaleColor(colorChosen);
        }
    }

    function stringToGender(genderStr: string): Gender | undefined {
        if (genderStr in Gender) {
            return Gender[genderStr as keyof typeof Gender];
        }
        return undefined;
    }

    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const gender = event.target.value as Gender;
        setSelectedGender(gender);
        setGenderTextColor(gender);
    };
    // #endregion

    // #region Hair
    //Male
    const { hairM: hairColorsM }: HairData = characterCustomizationData;
    const [indexChosenHairM, setCurrentIndexHairM] = useState<number>(0); //will be overriden in useEffect()

    //Female
    const { hairF: hairColorsF }: HairData = characterCustomizationData;
    const [indexChosenHairF, setCurrentIndexHairF] = useState<number>(0); //will be overriden in useEffect()

    const [hairChoice, setHair] = useState<string>(`url('${PATH_HAIR_M}${hairColorsM[0]}${PNG}`); //will be overriden in useEffect()

    function initHair(gender: Gender) {
        if (gender === Gender.Male) {
            setCurrentIndexHairM(0);
            setHair(`url('${PATH_HAIR_M}${hairColorsM[0]}${PNG}`);
        } else if (gender === Gender.Female) {
            setCurrentIndexHairF(0);
            setHair(`url('${PATH_HAIR_F}${hairColorsF[0]}${PNG}`);
        }
    }

    const hairNext = () => {
        if (selectedGender === Gender.Male) {
            setCurrentIndexHairM((prevIndex) => {
                const newIndex = (prevIndex + 1) % hairColorsM.length;
                setHair(`url('${PATH_HAIR_M}${hairColorsM[newIndex]}${PNG}`);
                return newIndex;
            });
        } else if (selectedGender === Gender.Female) {
            setCurrentIndexHairF((prevIndex) => {
                const newIndex = (prevIndex + 1) % hairColorsF.length;
                setHair(`url('${PATH_HAIR_F}${hairColorsF[newIndex]}${PNG}`);
                return newIndex;
            });
        }
    };

    const hairPrevious = () => {
        if (selectedGender === Gender.Male) {
            setCurrentIndexHairM((prevIndex) => {
                const newIndex = prevIndex === 0 ? hairColorsM.length - 1 : prevIndex - 1;
                setHair(`url('${PATH_HAIR_M}${hairColorsM[newIndex]}${PNG}`);
                return newIndex;
            });
        } else if (selectedGender === Gender.Female) {
            setCurrentIndexHairF((prevIndex) => {
                const newIndex = prevIndex === 0 ? hairColorsF.length - 1 : prevIndex - 1;
                setHair(`url('${PATH_HAIR_F}${hairColorsF[newIndex]}${PNG}`);
                return newIndex;
            });
        }
    };
    // #endregion

    // #region Skin
    //Male
    const { skinM: skinColorsM }: SkinData = characterCustomizationData;
    const [indexChosenSkinM, setCurrentIndexSkinM] = useState<number>(0); //will be overriden in useEffect()

    //Female
    const { skinF: skinColorsF }: SkinData = characterCustomizationData;
    const [indexChosenSkinF, setCurrentIndexSkinF] = useState<number>(0); //will be overriden in useEffect()

    const [skinChoice, setSkin] = useState<string>(`url('${PATH_SKIN_M}${skinColorsM[0]}${PNG}`); //will be overriden in useEffect()

    function initSkin(gender: Gender) {
        if (gender === Gender.Male) {
            setCurrentIndexSkinM(0);
            setSkin(`url('${PATH_SKIN_M}${skinColorsM[0]}${PNG}`);
        } else if (gender === Gender.Female) {
            setCurrentIndexSkinF(0);
            setSkin(`url('${PATH_SKIN_F}${skinColorsF[0]}${PNG}`);
        }
    }

    const skinNext = () => {
        if (selectedGender === Gender.Male) {
            setCurrentIndexSkinM((prevIndex) => {
                const newIndex = (prevIndex + 1) % skinColorsM.length;
                setSkin(`url('${PATH_SKIN_M}${skinColorsM[newIndex]}${PNG}`);
                return newIndex;
            });
        } else if (selectedGender === Gender.Female) {
            setCurrentIndexSkinF((prevIndex) => {
                const newIndex = (prevIndex + 1) % skinColorsF.length;
                setSkin(`url('${PATH_SKIN_F}${skinColorsF[newIndex]}${PNG}`);
                return newIndex;
            });
        }
    };

    const skinPrevious = () => {
        if (selectedGender === Gender.Male) {
            setCurrentIndexSkinM((prevIndex) => {
                const newIndex = prevIndex === 0 ? skinColorsM.length - 1 : prevIndex - 1;
                setSkin(`url('${PATH_SKIN_M}${skinColorsM[newIndex]}${PNG}`);
                return newIndex;
            });
        } else if (selectedGender === Gender.Female) {
            setCurrentIndexSkinF((prevIndex) => {
                const newIndex = prevIndex === 0 ? skinColorsF.length - 1 : prevIndex - 1;
                setSkin(`url('${PATH_SKIN_F}${skinColorsF[newIndex]}${PNG}`);
                return newIndex;
            });
        }
    };
    // #endregion

    // #region Cloth
    const { clothM: clothColorsM }: ClothData = characterCustomizationData;
    const [indexChosenClothM, setCurrentIndexClothM] = useState<number>(0); //will be overriden in useEffect()

    //Female
    const { clothF: clothColorsF }: ClothData = characterCustomizationData;
    const [indexChosenClothF, setCurrentIndexClothF] = useState<number>(0); //will be overriden in useEffect()

    const [clothChoice, setCloth] = useState<string>(`url('${PATH_CLOTH_M}${clothColorsM[0]}${PNG}`); //will be overriden in useEffect()

    function initCloth(gender: Gender) {
        if (gender === Gender.Male) {
            setCurrentIndexClothM(0);
            setCloth(`url('${PATH_CLOTH_M}${clothColorsM[0]}${PNG}`);
        } else if (gender === Gender.Female) {
            setCurrentIndexClothF(0);
            setCloth(`url('${PATH_CLOTH_F}${clothColorsF[0]}${PNG}`);
        }
    }

    const clothNext = () => {
        if (selectedGender === Gender.Male) {
            setCurrentIndexClothM((prevIndex) => {
                const newIndex = (prevIndex + 1) % clothColorsM.length;
                setCloth(`url('${PATH_CLOTH_M}${clothColorsM[newIndex]}${PNG}`);
                return newIndex;
            });
        } else if (selectedGender === Gender.Female) {
            setCurrentIndexClothF((prevIndex) => {
                const newIndex = (prevIndex + 1) % clothColorsF.length;
                setCloth(`url('${PATH_CLOTH_F}${clothColorsF[newIndex]}${PNG}`);
                return newIndex;
            });
        }
    };

    const clothPrevious = () => {
        if (selectedGender === Gender.Male) {
            setCurrentIndexClothM((prevIndex) => {
                const newIndex = prevIndex === 0 ? clothColorsM.length - 1 : prevIndex - 1;
                setCloth(`url('${PATH_CLOTH_M}${clothColorsM[newIndex]}${PNG}`);
                return newIndex;
            });
        } else if (selectedGender === Gender.Female) {
            setCurrentIndexClothF((prevIndex) => {
                const newIndex = prevIndex === 0 ? clothColorsF.length - 1 : prevIndex - 1;
                setCloth(`url('${PATH_CLOTH_F}${clothColorsF[newIndex]}${PNG}`);
                return newIndex;
            });
        }
    };
    // #endregion

    // #region Data
    const data: AppearanceData = characterCustomizationData;

    const characterData = {
        name: heroName,
        gender: selectedGender,
        hair: selectedGender === Gender.Male ? data.hairM[indexChosenHairM] : data.hairF[indexChosenHairF],
        skin: selectedGender === Gender.Male ? data.skinM[indexChosenSkinM] : data.skinF[indexChosenSkinF],
        cloth: selectedGender === Gender.Male ? data.clothM[indexChosenClothM] : data.clothF[indexChosenClothF],
    };
    // #endregion

    // #region SaveData

    const { token } = useToken();

    async function saveUserState(): Promise<void> {
        try {
            const response2 = await fetch(API_ENDPOINTS.POST_USER_STATE_NEW, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify({
                    character_name: characterData.name,
                }),
            });

            if (!response2.ok) {
                throw new Error(`Error: ${response2.status} ${response2.statusText}`);
            }
            const result2 = await response2.json();
        } catch (err) {}
    }

    async function saveData(): Promise<void> {
        const jsonString = JSON.stringify(characterData);
        console.log(characterData);
        try {
            const response = await fetch(API_ENDPOINTS.POST_EQUIP_ITEM_USING_MASTER_ID, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
                body: jsonString,
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            saveUserState();
            if (CharacterCreateEvent) CharacterCreateEvent(result.data);
            console.info("Data saved successfully:", result);
        } catch (error) {
            console.error("Error saving data:", error);
        }

        //
    }
    // #endregion

    // #region Next
    const handleNext = () => {
        if (currentStep === CustomizationSteps.Name) {
            if (checkName()) {
                changeStep(setCurrentStep, CustomizationSteps.Gender);
                sliderIncreaseWidth();
            }
        } else {
            if (currentStep === CustomizationSteps.Gender) {
                if (initLoadFlag.current) {
                    //important to skip 'else if' once upon loading of character data from json
                    initLoadFlag.current = false;

                    if (genderCC.current !== selectedGender) {
                        initHair(selectedGender);
                        initSkin(selectedGender);
                        initCloth(selectedGender);
                    }
                } else if ((previousGender !== null && selectedGender !== previousGender) || previousGender === null) {
                    initHair(selectedGender);
                    initSkin(selectedGender);
                    initCloth(selectedGender);
                }

                //alert(`${skinChoice}, ${hairChoice}, ${skinChoice}`);

                setPreviousGender(selectedGender);
                displayViewer();
                changeStep(setCurrentStep, CustomizationSteps.Skin);
                sliderIncreaseWidth();
            } else if (currentStep === CustomizationSteps.Skin) {
                changeStep(setCurrentStep, CustomizationSteps.Hair);
                sliderIncreaseWidth();
            } else if (currentStep === CustomizationSteps.Hair) {
                changeStep(setCurrentStep, CustomizationSteps.Cloth);
                sliderIncreaseWidth();
            } else if (currentStep === CustomizationSteps.Cloth) {
                saveData();
            }
        }
    };
    // #endregion

    // #region Back
    const handleBack = () => {
        if (currentStep === CustomizationSteps.Cloth) {
            changeStep(setCurrentStep, CustomizationSteps.Hair);
            sliderDecreaseWidth();
        }
        if (currentStep === CustomizationSteps.Hair) {
            changeStep(setCurrentStep, CustomizationSteps.Skin);
            sliderDecreaseWidth();
        } else if (currentStep === CustomizationSteps.Skin) {
            hideViewer();
            changeStep(setCurrentStep, CustomizationSteps.Gender);
            sliderDecreaseWidth();
        }
        if (currentStep === CustomizationSteps.Gender) {
            changeStep(setCurrentStep, CustomizationSteps.Name);
            sliderDecreaseWidth();
        }
    };
    // #endregion

    // #region Slider
    const sliderMin = 0;
    const sliderMax = 5;

    const [sliderCurrentValue, setWidth] = useState<number>(1);

    const sliderIncreaseWidth = () => {
        setWidth((prevWidth) => (prevWidth < sliderMax ? prevWidth + 1 : sliderMax));
    };

    const sliderDecreaseWidth = () => {
        setWidth((prevWidth) => (prevWidth > sliderMin ? prevWidth - 1 : sliderMin));
    };
    // #endregion

    const Chooser = ({ title, onNext, onPrevious }) => {
        return (
            <div className="flex-grow flex justify-center items-center">
                <div className="bg-white rounded-[30px] p-4 shadow-md w-full">
                    <div className="flex  justify-center items-center">
                        <button className="btn text-black btn-primary mx-2" onClick={onPrevious}>
                            <img src={arrowLeft.src} />
                        </button>
                        <h5 className="text-black flex-grow text-center">{title}</h5>
                        <button className="btn text-black btn-primary mx-2" onClick={onNext}>
                            <img src={arrowRight.src} />
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <main
            className=" overflow-hidden"
            style={{
                backgroundImage: 'url("/assets/images/character/frame/bg.png")',
                backgroundSize: "100% 100%", // Stretches the image to fit the area
                backgroundPosition: "center", // Centers the image
                backgroundRepeat: "no-repeat", // Prevents repeating the image
            }}
        >
            <div className="h-screen flex flex-col pt-10">
                <div className="text-center ">
                    <h4>{LABEL_HEADER}</h4>
                </div>
                <div className="flex-grow p-4">
                    {" "}
                    {/* Ensure padding is applied within the area */}
                    {/* Header Label */}
                    {/* Character Viewer */}
                    <div className="flex-grow flex justify-center items-center">
                        <div>
                            <div className={styles.heroViewer}>
                                {" "}
                                {/*style={{ backgroundColor: viewerColor }}*/}
                                {(currentStep === CustomizationSteps.Skin ||
                                    currentStep === CustomizationSteps.Hair ||
                                    currentStep === CustomizationSteps.Cloth) && <div className={styles.heroFrame} />}
                                {(currentStep === CustomizationSteps.Skin ||
                                    currentStep === CustomizationSteps.Hair ||
                                    currentStep === CustomizationSteps.Cloth) && (
                                    <div className={styles.skin} style={{ backgroundImage: skinChoice }} />
                                )}
                                {(currentStep === CustomizationSteps.Hair || currentStep === CustomizationSteps.Cloth) && (
                                    <div className={styles.hair} style={{ backgroundImage: hairChoice }} />
                                )}
                                {currentStep === CustomizationSteps.Cloth && (
                                    <div className={styles.cloth} style={{ backgroundImage: clothChoice }} />
                                )}
                            </div>
                        </div>
                    </div>
                    {/* Instruction Label */}
                    <div className="text-center">
                        <h6>{instructionLabel}</h6>
                    </div>
                    {/* Name Input */}
                    {currentStep === CustomizationSteps.Name && (
                        <div className="flex justify-center">
                            <input
                                className="w-full text-black"
                                type="text"
                                autoComplete="off"
                                id="inputField"
                                defaultValue={heroName}
                                placeholder="Hero Name"
                                ref={inputRef}
                            />
                        </div>
                    )}
                    {/* Gender Selector */}
                    {currentStep === CustomizationSteps.Gender && (
                        <div className="flex-grow flex justify-center items-center">
                            <div>
                                <input
                                    type="radio"
                                    name="gender"
                                    id="male"
                                    value={Gender.Male}
                                    checked={selectedGender === Gender.Male}
                                    onChange={handleGenderChange}
                                />
                                <label htmlFor="male">Male</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    name="gender"
                                    id="female"
                                    value={Gender.Female}
                                    checked={selectedGender === Gender.Female}
                                    onChange={handleGenderChange}
                                />
                                <label htmlFor="female">Female</label>
                            </div>
                        </div>
                    )}
                    {currentStep === CustomizationSteps.Hair && <Chooser title="Hair" onNext={hairNext} onPrevious={hairPrevious} />}
                    {currentStep === CustomizationSteps.Skin && <Chooser title="Skin" onNext={skinNext} onPrevious={skinPrevious} />}
                    {currentStep === CustomizationSteps.Cloth && <Chooser title="Cloth" onNext={clothNext} onPrevious={clothPrevious} />}
                </div>

                {/* Hair/Skin/Cloth Chooser */}

                {/* Navigation Buttons */}
                <div className="flex justify-center items-center space-x-4 mb-16">
                    {currentStep !== CustomizationSteps.Name && (
                        <button onClick={handleBack} className="px-4 py-2 border rounded-lg w-full">
                            BACK
                        </button>
                    )}
                    <button
                        onClick={handleNext}
                        className="px-4 py-2 border rounded-lg w-full"
                        style={{ backgroundColor: "#FFAB2B", color: "black" }}
                    >
                        {currentStep === CustomizationSteps.Cloth ? "SAVE" : "NEXT"}
                    </button>
                </div>

                {/* Slider Component at the Bottom */}
                <div className="h-16">
                    {/* Fixed height for the slider */}
                    <AvalorianDesignedSliderCC min={sliderMin} max={sliderMax} currentValue={sliderCurrentValue} />
                </div>
            </div>
        </main>
    );
};

export default CharacterCreationV2;
