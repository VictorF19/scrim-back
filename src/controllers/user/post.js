exports.path = "/user";
exports.method = "post";
exports.middlewares = [];
exports.handler = models => async (req, res) => {
    const { name, email, password } = req.body;
    const user = await models.repository.User.createUser({ name, email, password });
    return res.status(200).json(user)
};