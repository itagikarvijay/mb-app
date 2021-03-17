import { createStore, combineReducers } from "redux";
import appReducer from "./reducers/appReducer";
import sideBarReducer from "./reducers/sideBarReducer";
import customerReducer from "./reducers/customerReducer";

const rootReducer = combineReducers({
    appReducer,
    sideBarReducer,
    customerReducer
})


// function configureStore() {
//     return createStore(rootReducer,
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
//     //  return createStore(appReducer);
// };


const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
// const store = createStore(appReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


// const store = createStore(rootReducer);

export default store;