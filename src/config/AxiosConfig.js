import axios from 'axios'
// Create instance called instance
const instance = axios.create({
    baseURL: 'http://localhost:8000',
});

const axiosCopnfig = {
    getData: (url) =>
        instance({
            'method': 'GET',
            'url': '/api/' + url
        }),
    postData: (url, data) =>
        instance({
            method: 'POST',
            url: '/api/' + url,
            data: data
        })
}

export default axiosCopnfig;