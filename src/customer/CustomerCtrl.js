import { fetchCustomer, fetchAllCustomers, save, fetchAllCustomerTypes } from './CustomerAPI'

function fetchCustomerDetails(data) {
    return fetchCustomer(data);
}

function fetchAllCustomerDetails(data) {
    return fetchAllCustomers();
}

function fetchAllCustomerType() {
    return fetchAllCustomerTypes();
}

function saveCustomer(data) {
    return save(data);
}


export { fetchCustomerDetails, fetchAllCustomerDetails, saveCustomer, fetchAllCustomerType }