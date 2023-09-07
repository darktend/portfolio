import {ErrorMessages} from "./ErrorMessage.js";
const EMAIL_PATTERN = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const validateEmail = (email) => {

    if (!email.trim() || !EMAIL_PATTERN.test(email)) {
        return ErrorMessages.Required('email');
    }
    return "";

};
const validateInput = (name) => {
    if (!name.trim() || !name.trim()||!name.trim() ) {
        return ErrorMessages.Required('email');
    }
    return "";
};

export {validateInput,validateEmail}
