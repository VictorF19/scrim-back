exports.path = "/user";
exports.method = "post";
exports.middlewares = [];
exports.handler = models => async (req, res) => {
    const jane = models.User.build({ name: "Jane", email: 'jane@hotmail.com' });
    console.log(jane.name); // "Jane"
    console.log(jane.email)
    return res.status(200).json(jane)
};