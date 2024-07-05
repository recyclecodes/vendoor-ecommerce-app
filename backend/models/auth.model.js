import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/token.utils.js';
import mongoosePaginate from 'mongoose-paginate-v2';

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: [true, 'Fullname field is required.'],
      trim: true,
    },
    image: {
      type: String,
    },
    address: {
      type: String,
      required: [true, 'Address field is required.'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone Number field is required.'],
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
    dob: {
      type: String,
      validate: {
        validator: function (v) {
          return /^\d{1,2}-\d{1,2}-\d{4}$/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid Date of Birth format. Use MM-DD-YYYY.`,
      },
      required: [true, 'Date of Birth is required'],
    },
    password: {
      type: String,
      required: [true, 'Password field is required.'],
    },
    role: {
      type: String,
      enum: ['customer', 'admin'],
      default: 'customer',
    },
    confirmed: { type: Boolean, default: false },
    confirmationCode: {
      type: String,
    },
    resetPasswordToken: {
      token: {
        type: String,
      },
      expires: {
        type: Date,
      },
    },
    stripeCustomerId: {
      type: String,
    },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (possiblePassword) {
  return await bcrypt.compare(possiblePassword, this.password);
};

userSchema.methods.generateConfirmationCode = function () {
  this.confirmationCode = generateToken();
};

userSchema.methods.generateResetPasswordToken = function () {
  this.resetPasswordToken = {
    token: generateToken(),
    expires: new Date(Date.now() + 3600 * 1000),
  };
};

userSchema.methods.isResetPasswordTokenValid = function () {
  return (
    this.resetPasswordToken && this.resetPasswordToken.expires > Date.now()
  );
};

userSchema.plugin(mongoosePaginate);

const User = model('User', userSchema);
export default User;
