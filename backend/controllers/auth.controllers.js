import User from '../models/auth.model.js';
import { createAccessToken } from '../middlewares/auth.middlewares.js';
import { asyncHandler } from '../middlewares/error.middlewares.js';
import { sendConfirmationEmail } from '../services/email.services.js';

const signup = asyncHandler(async (request, response) => {
  const { fullname, email, password } = request.body;
  console.log(request.body);

  if (!fullname || !email || !password) {
    return response.status(400).json({
      message: 'All fields (fullname, email, password) are required.',
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response.status(400).json({ message: 'Email already exists.' });
    }

    const newUser = new User({ fullname, email, password });
    newUser.generateConfirmationCode();
    await newUser.save();

    await sendConfirmationEmail(newUser.email, newUser.confirmationCode);

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
    response.status(500).json({ message: 'Server error.' });
  }
});

const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User does not exist.' });
    }

    if (!user.confirmed) {
      return res
        .status(401)
        .json({ message: 'Email not confirmed. Please check your email.' });
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return res.status(401).json({ message: "Password didn't match." });
    }

    const accessToken = createAccessToken(user);

    res.status(200).json({
      message: 'Login successful.',
      data: {
        username: user.username,
        accessToken,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
});

const confirmUserEmail = asyncHandler(async (request, response) => {
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
    response.status(500).json({ message: 'Server error.' });
  }
});

const deleteUser = asyncHandler(async (request, response) => {
  const { id } = request.params;

  try {
    let user = await User.findOne({ _id: id, deleted: false });
    if (!user) {
      return response.status(404).json({ message: 'User does not exist.' });
    }

    user.deleted = true;
    await user.save();

    response.json({ message: `User ${user} has been deleted` });
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ message: 'Server error.' });
  }
});

const restoreUser = asyncHandler(async (request, response) => {
  const { id } = request.params;

  try {
    let user = await User.findOne({ _id: id, deleted: true });
    if (!user) {
      return response.status(404).json({ message: 'User does not exist.' });
    }

    user.deleted = false;
    await user.save();

    response.json({ message: `User ${user} has been restored` });
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ message: 'Server error.' });
  }
});

export { signup, signin, confirmUserEmail, deleteUser, restoreUser };
