export const sideBarAction = (data) => {
    console.log('sideBarAction', data)
    return {
        type: "TOGGLE",
        payload: {
            ...data
        }
    }
};