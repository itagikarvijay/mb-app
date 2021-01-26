import axios from '../config/AxiosConfig'

const getUser = (data) => {
    axios.getData('users/findOne').then(data => {
        console.log('User found successfully.!');
    })
}

const save = (data) => {
    axios.postData('users/save', data).then(data => {
        console.log('User saved successfully.!');
    })
}

export { getUser, save }