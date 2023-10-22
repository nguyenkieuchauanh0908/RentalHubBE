import { NextFunction } from "express";
import mongoose, { Schema } from "mongoose";
import validator from "validator";
import { genSalt, hash } from "bcrypt";

const usersSchema = new mongoose.Schema({
  _fname: {
    type: String,
    required: [true, "Firstname is required"],
    trim: true,
  },
  _lname: {
    type: String,
    required: [true, "Lastname is required"],
    trim: true,
  },
  _dob: {
    type: Date,
    validate: [validator.isDate, "DOB is invalid"],
  },
  _phone: {
    type: String,
  },
  _address: {
    type: String,
  },
  _avatar: {
    type: String,
  },
  _email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: [validator.isEmail, "Email is invalid"],
  },
  _pw: {
    type: String,
    required: [true, "Password is required"],
  },
  _active: {
    type: Boolean,
    default: true,
  },
  _rating: {
    type: Schema.Types.Number,
    default: 5.0,
  },
  _role: {
    type: Schema.Types.Number,
    default: 0,
  }, // 0: người dùng (có thể mua và thuê), 1: hãng vận chuyển
  _isHost: {
    type: Boolean,
    default: false,
  },
});

usersSchema.pre("save", async function (next: NextFunction) {
  if (!this.isModified("_pw")) return next();

  const salt = await genSalt(10);
  this._pw = await hash(this._pw, salt);
  next();
});

const Users = mongoose.model("users", usersSchema);
export default Users;
