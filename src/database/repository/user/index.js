const bcrypt = require('bcryptjs');

class User {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async createUser(data) {
    const user = this.userModel.build(data);
    return user.save();
  }

  async findUser({ email, password }) {
    const user = await this.userModel.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      return { hasUser: true, user };
    }

    return { hasUser: false };
  }
}

module.exports = (models) => new User(models);
