export const loginAction = (data) => {
    console.log('login action', data)
    return {
        type: "LOGIN",
        payload: {            
            ...data,
            logIn: true,
            logOut: false
        }
    }
};