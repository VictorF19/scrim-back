class User {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async createUser(data) {
    const user = this.userModel.build(data);
    return user.save();
  }
}

module.exports = (models) => new User(models);
