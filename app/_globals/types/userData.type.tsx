export interface TUser_state {
    character_name: string;
    hit_points: number;
    attack_speed: number;
    armor: number;
    mana: number;
    experience: number;
    is_done_tutorial: boolean;

    user: TUser;

    equipment: TEquipment;
}

export interface TUser {
    username: string;
}

export interface TEquipment {
    gender: string;
    skin: string;
    hair: string;
    cloth: string;
}
