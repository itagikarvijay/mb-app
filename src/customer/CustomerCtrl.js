import { fetchCustomer, fetchAllustomers, save } from './CustomerAPI'

function fetchCustomerDetails(data) {
    return fetchCustomer(data);
}

function fetchAllCustomerDetails(data) {
    return fetchAllustomers();
}

function saveCustomer(data) {
    return save(data);
}

export { fetchCustomerDetails, fetchAllCustomerDetails, saveCustomer }