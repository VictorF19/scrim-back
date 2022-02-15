module.exports = (error) => {
  console.log(error)
  const errorFields = Object.getOwnPropertyNames(error);

  let formatedError = { errors: {} };
  errorFields.forEach((field) => {
    error.errors[field];
    formatedError.errors[field] = error.errors[field].message;
  });

  return formatedError;
};
