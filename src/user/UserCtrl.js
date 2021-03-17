import { save, fetchAllRoles } from "./UserAPI";

const saveUser = async (data) => {
    return await save(data);
}

const userRoles = async (data) => {
    return await fetchAllRoles(data);
}

const validate = () => {
    return 'errorMessage';
}

export { validate, saveUser, userRoles }

