export const ENUM = {
    USER: {
        STATUS: {
            ACTIVE: 1,
            INACTIVE: 2,
            DELETED: 3
        }
    }
}

export const ENUM_ARRAY = {
    USER: {
        STATUS: Object.values(ENUM.USER.STATUS)
    }
}