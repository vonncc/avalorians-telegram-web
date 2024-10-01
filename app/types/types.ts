//define the prop type
export interface ChildComponentProp {
    jsonData?: string;
    CharacterCreateEvent?: (response: string) => void;
}

export interface CharacterCustomizationData {
    name: string;
    gender: string;
    skin: string;
    hair: string;
    cloth: string;
}

export interface HairData {
    hairM: string[];
    hairF: string[];
}

export interface SkinData {
    skinM: string[];
    skinF: string[];
}

export interface ClothData {
    clothM: string[];
    clothF: string[];
}

export interface AppearanceData {
    hairM: string[];
    skinM: string[];
    clothM: string[];
    hairF: string[];
    skinF: string[];
    clothF: string[];
    [key: string]: any; //allows for additional properties
}

export enum CustomizationSteps {
    Name = 'name',
    Gender = 'gender',
    Hair = 'hair',
    Skin = 'skin',
    Cloth = 'cloth'
}

export enum Gender {
    Male = 'male',
    Female = 'female'
}

