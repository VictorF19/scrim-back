exports.path = "/user";
exports.method = "post";
exports.middlewares = [];
exports.handler = models => async (req, res) => {

    const { name, email, password } = req.body;
    const user = await models.repository.User.createUser({ name, email, password });
    console.log(user.name);
    console.log(user.email);
    return res.status(200).json(user)
};