import { findOne, authenticate } from './LoginAPI'

const nothing = () => {
}

//do validation on user data
const authenticateUser = (data) => {
    console.log(data);
    findOne(data).then(result => {
        console.log('User found successfully.!! ', result);
        authenticate(result).then(auth => {
            console.log('Auth .!! ', auth.data);
            localStorage.setItem('token', auth.data.token);
        });
    }).catch(err => { console.log(err); })
}

export { authenticateUser };
export default nothing;