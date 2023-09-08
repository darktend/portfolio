import { ErrorMessages } from "./ErrorMessage.js";
const EMAIL_PATTERN = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const validateEmail = (email) => {
  if (!email.trim()) {
    return ErrorMessages.Required("email");
  }
  if (!EMAIL_PATTERN.test(email)) {
    return ErrorMessages.InvalidEmail;
  }
};
const validateInput = (name) => {
  if (!name.trim()) {
    return ErrorMessages.Required("name");
  }
};
const validateMessage = (message) => {
  if (!message.trim()) {
    return ErrorMessages.Required("message");
  }
};

export { validateInput, validateEmail, validateMessage };
