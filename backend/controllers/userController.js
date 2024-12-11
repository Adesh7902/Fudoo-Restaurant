import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  //   checking if user is already exist or not
  try {
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res
        .status(409)
        .json({ success: false, message: "User already exist" });
    }

    // validating user email format and strong password
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters long, with one uppercase letter, one number, and one special character.",
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    res.status(200).json({
      success: true,
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({
      success: false,
      message: "Server error, please try again later",
    });
  }
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect crendentials" });
    }

    const token = createToken(user._id);
    res
      .status(200)
      .json({ success: true, message: "Login successfully", token });
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({
      success: false,
      message: "Server error, please try again later",
    });
  }
};

export { loginUser, registerUser };
