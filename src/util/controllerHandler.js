/* eslint-disable no-console */
// parameter of controller: (req, res, next) {}

exports.controllerHandler = (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(error);
    }

    let status = 500;
    let message = 'An unexpected error ocurred';

    // improve the way to decide if a error can be shown to the user
    if (error.errors[0]) {
      status = 400;
      message = error.errors[0].message;
    }

    return res.status(status).json(message);
  }
};
