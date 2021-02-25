import axios from '../config/AxiosConfig'

const nothing = () => {
}

const save = async (data) => {
    console.log('userAPI', localStorage.getItem('token'))
    return await axios.postDataWithToken('user/register', data);
        // .then(result => {
        //     console.log(result);
        // }).catch(error => {
        //     console.log('error', error.response.status)
        // });
}

export { save };
export default nothing;
