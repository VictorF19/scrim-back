// parameter of controller: (req, res, next) {}

exports.controllerHandler = (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.error(error);
    res.status(500).json('An unexpected error occurred');
  }
};
