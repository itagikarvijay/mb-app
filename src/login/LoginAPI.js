import axios from '../config/AxiosConfig'

const find = async (data) => {
    console.log('LoginAPI - find User', data)
    return await axios.postData('login/find', data)
}

const authenticate = async (data) => {
    console.log('LoginAPI - Authenticate User', data)
    return await axios.postData('login', data)
}



export { find, authenticate }