const initialState = {
    user: 'Annonymus User.!',
    logIn: false,
    logOut: false
}
const appReducer = (state = initialState, action) => {
    console.log('Reducer called', action)
    switch (action.type) {
        case "LOGIN":
            console.log('LOGIN DONE')
            return {
                ...state,
                user: action.payload.name,
                logIn: action.payload.logIn,
                logOut: action.payload.logOut
            };
        case "LOGOUT":
            console.log('LOGOUT DONE')
            return {
                ...state,
                user: 'Annonymus User.!',
                logIn: action.payload.logIn,
                logOut: action.payload.logOut
            };
        default:
            return state;
    }
};

export default appReducer;
