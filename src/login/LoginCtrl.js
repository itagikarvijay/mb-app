import {getUser,save} from './APILogin'

const nothing = () => {
} 

//do validation on user data
const saveUser = (data)  => {
     console.log(data);
    // getUser(data);
    save(data);
}

export {saveUser};
export default nothing;












