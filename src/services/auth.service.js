const bcrypt = require("bcrypt")

const User = require("./../models/user.model");
const CustomError = require("./../utils/custom-error");


class AuthService {
  // User sign up
  async signup(data) {
    let user = await User.findOne({ email: data.email })
    if (user) throw new CustomError("Email already exists");

    user = new User(data);
    await user.save();

    return data = {
      user_id: user._id,
      email: user.email,
      role: user.role,
      name: user.name
    };
  }

  // User sign in
  async signin(data) {
    if (!data.email) throw new CustomError("Email is required");
    if (!data.password) throw new CustomError("Password is required");

    // Check if user exist
    const user = await User.findOne({ email: data.email });
    if (!user) throw new CustomError("Incorrect email or password");

    //Check if user password is correct
    const isCorrect = await bcrypt.compare(data.password, user.password)
    if (!isCorrect) throw new CustomError("Incorrect email or password");

    return data = {
      user_id: user._id,
      email: user.email,
      role: user.role,
      name: user.name
    };
  }
}

module.exports = new AuthService();