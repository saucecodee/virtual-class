const JWT = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const User = require("./../models/user.model");
const CustomError = require("./../utils/custom-error");
const { JWT_SECRET, BCRYPT_SALT } = require("./../config");


class AuthService {
  // User sign up
  async signup(data) {
    let user = await User.findOne({ email: data.email })
    if (user) throw new CustomError("Email already exists");

    user = new User(data);
    const token = JWT.sign({ id: user._id, role: user.role }, JWT_SECRET);
    await user.save();

    return data = {
      uid: user._id,
      email: user.email,
      role: user.role,
      verified: user.isVerified,
      token: token
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

    const token = await JWT.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: 60 * 60 });

    return data = {
      uid: user._id,
      email: user.email,
      role: user.role,
      verified: user.isVerified,
      token: token
    };
  }

  // Update user password
  async updatePassword(user_id, data) {
    const user = await User.findOne({ _id: user_id });
    if (!user) throw new CustomError("User dose not exist")

    //Check if user password is correct
    const isCorrect = await bcrypt.compare(data.password, user.password)
    if (!isCorrect) throw new CustomError("Incorrect password");

    const hash = await bcrypt.hash(password, BCRYPT_SALT)

    await User.updateOne(
      { _id: user_id },
      { $set: { password: hash } },
      { new: true })

    return
  }
}

module.exports = new AuthService();