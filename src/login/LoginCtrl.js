import { find, authenticate } from './LoginAPI'

const nothing = () => {
}

const findUser = async (data) => {
    console.log('findUser', data);
    let findUser$result = false;
    let findUser$Message = '';
    await find(data).then(response => {
        console.log('Result', response.data)
        findUser$Message = response.data;
        if (response.data === true) {
            console.log('if part')
            findUser$result = true;
            authenticate(data).then(result => {
                console.log('User found successfully.!! ', result);
                localStorage.setItem('token', result.data);
            }).catch(err => { console.log(err); })
        }
    }).catch(error => {
        console.log('error Value', error.response);
        findUser$Message = error.response;
    });
    return findUser$result ? findUser$result : findUser$Message;
}

export { findUser };
export default nothing;