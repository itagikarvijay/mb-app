import { find, authenticate } from './LoginAPI'

const LoginCtrl = async (data) => {
    console.log('findUser', data);
    let response = await find(data).catch(error => {
        console.log('error Value', error.response);
        // findUser$Message = error.response;
    });
    console.log('result', response);
    if (response.data.found === true) {
        // findUser$result = true;
        await authenticate(data).then(result => {
            console.log('User found successfully.!! ', result);
            response.data.token = result.data;
            localStorage.setItem('token', result.data);
        }).catch(err => { console.log(err); })
    }
    console.log('done')
    return response;
}
export default LoginCtrl;