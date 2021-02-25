import { save } from "./UserAPI";

const saveUser = (data) => {
    return save(data)
}

const validate = () => {
    return 'errorMessage';
}

export { saveUser, validate }