import axios from 'axios'
// Create instance called instance
const instance = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'x-access-token': localStorage.getItem('token')
    }
});

const axiosCopnfig = {
    getData: (url, data) =>
        instance({
            method: 'GET',
            url: '/api/' + url + '/' + data.name
        }),
    postData: (url, data) =>
        instance({
            method: 'POST',
            url: '/api/' + url,
            data: data
        }),
    getToken: (url, data) =>
        instance({
            method: 'POST',
            url: '/api/' + url,
            data: data
        }),
}

export default axiosCopnfig;