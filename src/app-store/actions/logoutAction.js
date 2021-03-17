export const logoutAction = () => {
    return {
        type: "LOGOUT",
        payload: {
            logOut: true,
            logIn : false
        }    
    }
};