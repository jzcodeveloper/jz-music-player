const Validator = require("validator");
const { isEmpty } = require("./isEmpty");

module.exports = function validateLogin(body) {
  const { email, password } = body;

  const errors = {};

  if (!Validator.isEmail(email)) {
    errors.email = "Email is invalid";
  }

  if (isEmpty(email)) {
    errors.email = "Email is required";
  }

  if (isEmpty(password)) {
    errors.password = "Password is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
