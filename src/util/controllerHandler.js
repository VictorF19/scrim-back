/* eslint-disable no-console */
// parameter of controller: (req, res, next) {}

exports.controllerHandler = (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(error);
    }

    return res.status(500).json({ message: 'An unexpected error ocurred' });
  }
};
