import axios from 'axios'
// Create instance called instance
const instance = axios.create({
    baseURL: 'http://localhost:9090'
    // headers: {
    //     'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjEzNzU1Mzg3fQ.OIB4CPXGTkW3XcXZ_kJfaGwyORs77-nh1qVdfOs-0tv0LZfx8ukZYwQPFEg9-ePhRlfkgmSER4aZ6KKQRbQQ2Q'
    // }
});

const axiosCopnfig = {
    getData: (url, data) =>
        instance({
            method: 'GET',
            url: `/api/${url}`
        }),
    postData: (url, data) =>
        instance({
            method: 'POST',
            url: '/api/' + url,
            data: data
        }),
    postDataWithToken: (url, data) =>
        instance({
            method: 'POST',
            url: '/api/' + url,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            data: data
        }),
    getToken: (url, data) =>
        instance({
            method: 'POST',
            url: '/' + url,
            data: data
        })
}

export default axiosCopnfig;