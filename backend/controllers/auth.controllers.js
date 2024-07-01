import User from '../models/auth.model.js';
import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} from '../middlewares/auth.middlewares.js';
import { asyncHandler } from '../middlewares/error.middlewares.js';
import { sendEmail } from '../services/email.services.js';

export const signup = asyncHandler(async (request, response) => {
  const { fullname, email, password, address, phoneNumber, dob } = request.body;

  if (!fullname || !email || !password || !address || !phoneNumber || !dob) {
    return response.status(400).json({
      message:
        'All fields (fullname, email, password, address, phoneNumber, dob) are required.',
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response.status(400).json({ message: 'Email already exists.' });
    }

    const newUser = new User({
      fullname,
      email,
      password,
      address,
      phoneNumber,
      dob,
    });
    newUser.generateConfirmationCode();
    await newUser.save();

    const confirmationLink = `http://localhost:${process.env.PORT}/api/v1/confirm/${newUser.confirmationCode}`;
    await sendEmail(
      newUser.email,
      'Please confirm your email',
      `Tap the button below to confirm your email address. If you didn't create an account with Vendoor, you can safely delete this email.`,
      'Confirm Email',
      confirmationLink,
      true,
      "You received this email because a new account was created using this email address. If you didn't create an account, you can safely ignore and delete this email."
    );

    response.status(201).json({
      message: 'User has been created. Please check your email to confirm.',
      data: {
        id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'Server error during signup.' });
  }
});

export const signin = asyncHandler(async (request, response) => {
  const { email, password } = request.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return response.status(404).json({ message: 'User does not exist.' });
    }

    if (!user.confirmed) {
      return response
        .status(401)
        .json({ message: 'Email not confirmed. Please check your email.' });
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return response.status(401).json({ message: "Password didn't match." });
    }

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    response.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'Strict',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    response.status(200).json({
      message: 'Login successful.',
      data: {
        username: user.username,
        accessToken,
      },
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'Server error during signin.' });
  }
});

export const refreshToken = asyncHandler(async (request, response) => {
  const refreshToken = request.cookies.jwt;

  if (!refreshToken) {
    return response.status(403).json({ message: 'Refresh token not found.' });
  }

  try {
    const decoded = await verifyRefreshToken(refreshToken);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return response.status(401).json({ message: 'User not found.' });
    }

    const accessToken = createAccessToken(user);

    response.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'Strict',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    response.status(200).json({
      accessToken,
    });
  } catch (error) {
    console.error(error);
    response.status(403).json({ message: 'Invalid refresh token.' });
  }
});

export const confirmUserEmail = asyncHandler(async (request, response) => {
  const { confirmationCode } = request.params;

  try {
    const user = await User.findOne({ confirmationCode });

    if (!user) {
      return response
        .status(404)
        .json({ message: 'Invalid confirmation code' });
    }

    user.confirmed = true;
    user.confirmationCode = '';
    await user.save();

    response.status(200).json({ message: 'Email confirmed successfully' });
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ message: 'Server error during email confirmation.' });
  }
});

export const sendPasswordResetEmail = asyncHandler(
  async (request, response) => {
    const { email } = request.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return response.status(404).json({ message: 'User not found.' });
      }

      user.generateResetPasswordToken();
      await user.save();

      const resetLink = `http://localhost:${process.env.PORT}/api/v1/reset/${user.resetPasswordToken.token}`;
      await sendEmail(
        user.email,
        'Reset Your Password',
        `Tap the button below to reset your password. If you didn't request this, you can safely ignore this email.`,
        'Reset Password',
        resetLink,
        true,
        'You received this email because a request to reset your password was made. If you did not request a password reset, you can safely ignore and delete this email.'
      );

      response.status(200).json({
        message: 'Password reset email sent. Please check your email.',
      });
    } catch (error) {
      console.error(error);
      response
        .status(500)
        .json({ message: 'Server error during password reset.' });
    }
  }
);

export const getResetToken = asyncHandler(async (request, response) => {
  const { resetToken } = request.params;

  try {
    const user = await User.findOne({
      'resetPasswordToken.token': resetToken,
      'resetPasswordToken.expires': { $gt: Date.now() },
    });

    if (!user) {
      return response
        .status(400)
        .json({ message: 'Invalid or expired token.' });
    }

    response.status(200).json({ message: 'Token is valid.' });
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ message: 'Server error during token validation.' });
  }
});

export const resetPassword = asyncHandler(async (request, response) => {
  const { resetToken } = request.params;
  const { newPassword } = request.body;

  try {
    const user = await User.findOne({
      'resetPasswordToken.token': resetToken,
      'resetPasswordToken.expires': { $gt: Date.now() },
    });

    if (!user) {
      return response
        .status(400)
        .json({ message: 'Invalid or expired token.' });
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    await user.save();

    const vendoorLink = `http://localhost:${process.env.PORT}/`;
    await sendEmail(
      user.email,
      'Password Updated!',
      `Your password has been successfully changed. Please use your new password to login!`,
      'SIGN IN',
      vendoorLink,
      false
    );

    response.status(200).json({ message: 'Password reset successful.' });
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ message: 'Server error during password reset.' });
  }
});
