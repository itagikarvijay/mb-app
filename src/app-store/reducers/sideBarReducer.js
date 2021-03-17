const sideBarReducer = (state = { sideBar: false }, action) => {
    console.log('sideBarReducer called', action)
   switch (action.type) {
       case "TOGGLE":
           return {
               ...state,
               sideBar: true
           }
       default:
           return state;
   }
};

export default sideBarReducer;