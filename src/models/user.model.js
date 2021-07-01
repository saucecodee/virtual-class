const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { BCRYPT_SALT } = require("./../config")
const Schema = mongoose.Schema;


const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Email is required"],
    },
    role: {
      type: String,
      trim: true,
      enum: ["ADMIN", "STUDENT", "TUTOR"]
    },
    is_active: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified('password')) return next()

  const hash = await bcrypt.hash(this.password, BCRYPT_SALT);
  this.password = hash;

  next();
});



module.exports = mongoose.model('users', userSchema)