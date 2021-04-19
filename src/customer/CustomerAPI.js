import axios from '../config/AxiosConfig'


const fetchCustomer = async (data) => {
    data = { 'gstNo': '29ABCDE1234F1CC' }
    console.log('fetchCustomer ', data)
    return await axios.getDataWithTokenAndRequestParams('party/find', data);
}

const fetchAllCustomers = async () => {
    console.log('fetchAllCustomers ')
    return await axios.getDataWithToken('party/findAll');
}

const save = async (data) => {
    return await axios.putDataWithToken('party/save', data);
}

const fetchAllCustomerTypes = async () => {
    console.log('fetchAllCustomers Types ')
    return await axios.getDataWithTokenAndRequestParams('categoryType/party', { category: 'PARTY_TYPE' });
}

export { fetchCustomer, fetchAllCustomers, save, fetchAllCustomerTypes };
