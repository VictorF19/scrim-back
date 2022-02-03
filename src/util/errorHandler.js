module.exports = (error) => {
    const errorFields = Object.getOwnPropertyNames(error.errors);
  
    let formatedError = { errors: {} };
    errorFields.forEach((field) => {
      error.errors[field];
      formatedError.errors[field] = error.errors[field].message;
    });
  
    return formatedError;
  };
  