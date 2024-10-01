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

const CharacterCreation: FC<ChildComponentProp> = ({ jsonData, CharacterCreateEvent }) => {
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
    const [instructionLabel, setInstructionLabel] = useState<string>(INSTRUCTION_NAME);

    function changeLabel(step: CustomizationSteps): void {
        if (step === CustomizationSteps.Name) {
            setInstructionLabel(INSTRUCTION_NAME);
        } else if (step === CustomizationSteps.Gender) {
            setInstructionLabel(EMPTY_STRING);
        } else if (step === CustomizationSteps.Hair || step === CustomizationSteps.Skin) {
            setInstructionLabel(INSTRUCTION_APPEARANCE);
        } else if (step === CustomizationSteps.Cloth) {
            setInstructionLabel(EMPTY_STRING);
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
            console.log("Data saved successfully:", result);
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

    return (
        <div className="d-flex flex-column min-vh-100">
            {/*<header className={`${styles.headerCC} d-flex align-items-center justify-content-center`}>
        <p className="mb-0">Header</p>
      </header>*/}

            <main className={`flex-grow-1 d-flex align-items-center justify-content-center ${styles.mainCC}`}>
                <div className="container mt-1">
                    <div className="row d-flex">
                        <div className="col-12 d-flex justify-content-center align-items-center mt-5">
                            <div className="d-flex justify-content-center align-items-center" style={{ height: "100%" }}>
                                <div style={{ width: "400px", position: "relative" }}>
                                    <div className="d-flex justify-content-center align-items-center" style={{ height: "100%" }}>
                                        <h4
                                            className={`${styles.fontMinaBold} text-center`}
                                            style={{ color: "white", position: "absolute", whiteSpace: "nowrap" }}
                                        >
                                            {LABEL_HEADER}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Character Viewer */}
                        <div className="col-12 d-flex justify-content-center align-items-center mt-5 mb-3" style={{ height: "20vh" }}>
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
                        <div className="col-12 d-flex justify-content-center align-items-center mt-5">
                            <div className="d-flex justify-content-center align-items-center" style={{ height: "100%" }}>
                                <div style={{ width: "400px", position: "relative" }}>
                                    <div className="d-flex justify-content-center align-items-center" style={{ height: "100%" }}>
                                        <h6
                                            className={`${styles.fontMinaBold} text-center`}
                                            style={{ color: "white", position: "absolute", whiteSpace: "nowrap" }}
                                        >
                                            {instructionLabel}
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Name */}
                        <div className="col-12 d-flex flex-column justify-content-center align-items-center mt-5" style={{ height: "10vh" }}>
                            {currentStep === CustomizationSteps.Name && (
                                <div style={{ margin: "20px auto" }}>
                                    <div className={styles.uiContainer}>
                                        <input
                                            type="text"
                                            className={`${styles.fontMinaBold} ${styles.inputText} mt-1 form-control`}
                                            autoComplete="off"
                                            id="inputField"
                                            defaultValue={heroName}
                                            placeholder="Hero Name"
                                            ref={inputRef}
                                            style={{
                                                backgroundColor: "transparent",
                                                width: "100%",
                                                height: "100%",
                                                border: "none",
                                                borderRadius: "100px",
                                                padding: "0 20px", //padding inside the input field
                                                outline: "none",
                                                fontSize: "16px",
                                                color: "white",
                                                textAlign: "center",
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Gender */}
                            {currentStep === CustomizationSteps.Gender && (
                                <div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="gender"
                                            id="male"
                                            value={Gender.Male}
                                            checked={selectedGender === Gender.Male}
                                            onChange={handleGenderChange}
                                        />
                                        <label className={`${styles.fontMinaBold} form-check-label`} htmlFor="male" style={{ color: textMaleColor }}>
                                            Male
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="gender"
                                            id="female"
                                            value={Gender.Female}
                                            checked={selectedGender === Gender.Female}
                                            onChange={handleGenderChange}
                                        />
                                        <label
                                            className={`${styles.fontMinaBold} form-check-label`}
                                            htmlFor="female"
                                            style={{ color: textFemaleColor }}
                                        >
                                            Female
                                        </label>
                                    </div>
                                </div>
                            )}

                            {/* Hair Chooser */}
                            {currentStep === CustomizationSteps.Hair && (
                                <div className="d-flex justify-content-between align-items-center w-50">
                                    <div style={{ width: "400px", margin: "20px auto" }}>
                                        <div className={styles.uiContainer}>
                                            <button
                                                className="btn"
                                                onClick={hairPrevious}
                                                style={{ border: "none", padding: 0, position: "absolute", left: "20px" }}
                                            >
                                                <Image src={arrowLeft} alt="arrowLeft" width={10} height={10} />
                                            </button>
                                            <h5
                                                className={`${styles.fontMinaBold} mt-3 text-center`}
                                                style={{ color: "white", position: "absolute" }}
                                            >
                                                Hair
                                            </h5>
                                            <button
                                                className="btn"
                                                onClick={hairNext}
                                                style={{ border: "none", padding: 0, position: "absolute", right: "20px" }}
                                            >
                                                <Image src={arrowRight} alt="arrowRight" width={20} height={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Skin Chooser */}
                            {currentStep === CustomizationSteps.Skin && (
                                <div className="d-flex justify-content-between align-items-center w-50">
                                    <div style={{ width: "400px", margin: "20px auto" }}>
                                        <div className={styles.uiContainer}>
                                            <button
                                                className="btn"
                                                onClick={skinPrevious}
                                                style={{ border: "none", padding: 0, position: "absolute", left: "20px" }}
                                            >
                                                <Image src={arrowLeft} alt="arrowLeft" width={10} height={10} />
                                            </button>
                                            <h5
                                                className={`${styles.fontMinaBold} mt-3 text-center`}
                                                style={{ color: "white", position: "absolute" }}
                                            >
                                                Skin
                                            </h5>
                                            <button
                                                className="btn"
                                                onClick={skinNext}
                                                style={{ border: "none", padding: 0, position: "absolute", right: "20px" }}
                                            >
                                                <Image src={arrowRight} alt="arrowRight" width={20} height={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Cloth Chooser */}
                            {currentStep === CustomizationSteps.Cloth && (
                                <div className="d-flex justify-content-between align-items-center w-50">
                                    <div style={{ width: "400px", margin: "20px auto" }}>
                                        <div className={styles.uiContainer}>
                                            {/*<button className="btn" onClick={clothPrevious} style={{ border: 'none', padding: 0, position: 'absolute', left: '20px' }}>
                  <Image src={arrowLeft} alt="arrowLeft" width={10} height={10} />
                </button>*/}
                                            <h5
                                                className={`${styles.fontMinaBold} mt-3 text-center`}
                                                style={{ color: "white", position: "absolute" }}
                                            >
                                                Cloth
                                            </h5>
                                            {/*<button className="btn" onClick={clothNext} style={{ border: 'none', padding: 0, position: 'absolute', right: '20px' }}>
                  <Image src={arrowRight} alt="arrowRight" width={20} height={20} />
                </button>*/}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Navigation Buttons */}
                        {currentStep === CustomizationSteps.Name && (
                            <div className="col-12 d-flex flex-column justify-content-center align-items-center" style={{ height: "10vh" }}>
                                <div className="container d-flex justify-content-center mt-5">
                                    <Button className={`${styles.fontMinaBold} ${styles.nextButton}`} onClick={handleNext}>
                                        NEXT
                                    </Button>
                                </div>
                            </div>
                        )}
                        {currentStep !== CustomizationSteps.Name && (
                            <div className="col-12 d-flex flex-column justify-content-center align-items-center" style={{ height: "10vh" }}>
                                <div className="container d-flex justify-content-center">
                                    <div className="row justify-content-center">
                                        <div className="col-6 d-flex justify-content-end mt-5">
                                            <Button className={`${styles.fontMinaBold} ${styles.backButton}`} onClick={handleBack}>
                                                BACK
                                            </Button>
                                        </div>
                                        <div className="col-6 d-flex justify-content-start mt-5">
                                            <Button className={`${styles.fontMinaBold} ${styles.nextButton}`} onClick={handleNext}>
                                                NEXT
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="col-12 mt-5 justify-content-center align-items-center">
                            <div>
                                <AvalorianDesignedSliderCC min={sliderMin} max={sliderMax} currentValue={sliderCurrentValue} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/*<footer className={`${styles.footerCC} d-flex align-items-center justify-content-center`}>
      <p className="mb-0">Footer</p>
    </footer>*/}
        </div>
    );
};

export default CharacterCreation;
