exports.path = "/user";
exports.method = "post";
exports.middlewares = [];
exports.handler = models => async (req, res) => {
    const user = await models.repository.User.createUser({ name: req.body.name, email: req.body.email });
    console.log(user.name);
    console.log(user.email);
    return res.status(200).json(user)
};