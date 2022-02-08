module.exports = {
    path: "/user",
    method: "post",
    middlewares: [],
    handler: (models, errorHandler) => async (req, res) => {
        try {
            const jane = models.User.build({ name: "Jane", email: 'jane@hotmail.com' });
            console.log(jane.name); // "Jane"
            console.log(jane.email)
            return res.status(200).json(jane)
        } catch (error) {
            return res.status(500).json(errorHandler(error));
        }
    },
};