import axios from '../config/AxiosConfig'

const nothing = () => {
}

const save = async (data) => {
    console.log('userAPI', localStorage.getItem('token'))
    await axios.postData('user/register', {
        name: data.name,
        password: data.pwd
    }).then(result => {
        console.log(result);
    })
}

export { save };
export default nothing;
