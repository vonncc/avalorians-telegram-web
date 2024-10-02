export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.dev.avalorians.io';

export const API_ENDPOINTS = {

    // USER PROFILE
    POST_PROFILE_SIGNUP: `${API_BASE_URL}/api/v1/auth/signup`,
    POST_PROFILE_SIGNIN: `${API_BASE_URL}/api/v1/auth/signin`,

    //USER STATE
    POST_USER_STATE_NEW: `${API_BASE_URL}/api/v1/user/user-state/create`,
    GET_USER_STATE: `${API_BASE_URL}/api/v1/user/user-state/get`,
    PATCH_USER_STATE: `${API_BASE_URL}/api/v1/user/user-state/update/state`,
    PATCH_USER_STATE_EXPERIENCE: `${API_BASE_URL}/api/v1/user/user-state/update/experience`,
    PATCH_USER_STATE_STATS: `${API_BASE_URL}/api/v1/user/user-state/update/stats`,

    // WALLET
    GET_WALLET: `${API_BASE_URL}/api/v1/wallet/get-all-items/`,
    PATCH_WALLET: `${API_BASE_URL}/api/v1/wallet/update-wallet/`,

    // USER QUESTS
    POST_GET_AND_SYNC_QUESTS: `${API_BASE_URL}/api/v1/user-quests/create/`,
    GET_USER_ACTIVE_QUESTS: `${API_BASE_URL}/api/v1/user-quests/get-all-quest/`,
    PATCH_FINISH_QUESTS: `${API_BASE_URL}/api/v1/user-quests/finish-quest/`,

    // INVENTORY
    POST_ADD_ITEM: `${API_BASE_URL}/api/v1/user-inventory/add`,
    GET_ALL_INVENTORY_ITEMS: `${API_BASE_URL}/api/v1/user-inventory/get/all`,

    // EQUIP ITEM
    POST_EQUIP_ITEM: `${API_BASE_URL}/api/v1/equipped/equip-many`,
    POST_EQUIP_ITEM_USING_MASTER_ID: `${API_BASE_URL}/api/v1/equipped/equip-many/master-id`,
    GET_EQUIP_ITEM: `${API_BASE_URL}/api/v1/equipped/get?organized=true`,
    GET_EQUIP_ITEM_USING_MASTER_ID: `${API_BASE_URL}/api/v1/equipped/get?organized=false`,

    // KINGDOM
};