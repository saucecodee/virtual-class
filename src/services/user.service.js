const User = require("./../models/user.model");
const CustomError = require("./../utils/custom-error");
class UserService {
  async create(data) {
    return await new User(data).save();
  }

  async getAll() {
    return await User.find({}, { password: 0, __v: 0 });
  }

  async getOne(user_id) {
    const user = await User.findOne(
      { _id: user_id },
      { password: 0, __v: 0 }
    );
    if (!user) throw new CustomError("User does not exist");

    return user
  }

  async update(user_id, data) {
    const user = await User.findByIdAndUpdate(
      { _id: user_id },
      { $set: data },
      { new: true }
    );

    if (!user) throw new CustomError("User dosen't exist", 404);

    return user;
  }

  async delete(user_id) {
    const user = await User.findOne({ _id: user_id });
    user.remove()
    return user
  }
}

module.exports = new UserService();