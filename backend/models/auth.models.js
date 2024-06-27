import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/token.utils.js';

const UserSchema = new Schema(
  {
    fullname: {
      type: String,
      required: [true, 'Fullname field is required.'],
    },
    email: {
      type: String,
      required: [true, 'Email field is required.'],
      unique: [true, 'This email is already registered.'],
      match: [
        /^\w+([.-]?\w+)*(\+\w+)?@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address.',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password field is required.'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    confirmed: { type: Boolean, default: false },
    confirmationCode: {
      type: String,
      unique: true,
    },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = async function (possiblePassword) {
  return await bcrypt.compare(possiblePassword, this.password);
};

UserSchema.methods.generateConfirmationCode = function () {
  this.confirmationCode = generateToken();
};

const User = model('User', UserSchema);
export default User;
