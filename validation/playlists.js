const Validator = require("validator");
const { isEmpty } = require("./isEmpty");

module.exports = function validatePlaylists(body) {
  const { name, description } = body;

  const errors = {};

  if (isEmpty(name)) {
    errors.name = "Playlist Name is required";
  }

  if (isEmpty(description)) {
    errors.description = "Playlist Description is required";
  }

  if (!Validator.isLength(description, { min: 2, max: 35 })) {
    errors.description =
      "Playlist Description must be between 2 and 35 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
