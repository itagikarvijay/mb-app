import axios from '../config/AxiosConfig'

const findOne = async (data) => {
    console.log('LoginAPI - findOne', data)
    return await axios.getData('login/findOne', data)
}

const authenticate = async (data) => {
    console.log('LoginAPI - authenticate', data)
    return await axios.getToken('login/token', data)
}

export { findOne, authenticate }