import axios from '../config/AxiosConfig'

const nothing = () => {
}

const save = async (data) => {
    console.log('userAPI', data)
    return await axios.postDataWithToken('user/register', data);
}

const fetchAllRoles = async (data) => {
    console.log('fetchAllRoles ', data)
    return await axios.getDataWithToken('role/fetchAllRole', data);
}

export { save, fetchAllRoles };
export default nothing;
