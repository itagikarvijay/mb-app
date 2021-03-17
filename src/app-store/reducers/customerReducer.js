const initialState = {
    customerList: [],
    name: 'Annonymus User.!',
}
const customerReducer = (state = initialState, action) => {
    console.log('Customer reducer called', action)
    switch (action.type) {
        case "GET":
            console.log('GET Customer')
            return {
                ...state
            };
        case "CREATE":
            console.log('CREATE Customer ')
            return {
                ...state,
                customerList: [...state.customerList,action.payload]
            };
        default:
            return state;
    }
};

export default customerReducer;