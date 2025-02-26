import jwt from "jsonwebtoken";
import User from "../model/UserSchema.js";

// Constants for expiration (6 hours)
const EXPIRATION_HOURS = 6;
const EXPIRATION_MS = EXPIRATION_HOURS * 60 * 60 * 1000; // 48 hours in milliseconds

// Generate JWT Token with 6 hour expiration
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: `${EXPIRATION_HOURS}h`, // 6 hours
  });
};

const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user._id);

  const options = {
    expires: new Date(Date.now() + EXPIRATION_MS),
    httpOnly: true,
    sameSite: "strict",
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      token,
      expiresIn: EXPIRATION_MS,
      user,
    });
};
export const signup = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      password,
    });

    sendTokenResponse(user, 201, res);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;
    console.log();
    
    if (!emailOrUsername || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const isEmail = emailOrUsername.includes("@");
    const user = await User.findOne(
      isEmail ? { email: emailOrUsername } : { username: emailOrUsername }
    ).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Try to signup",
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


export const logout = async (req, res) => {
  console.log("logout");

  // Set cookie to expire immediately
  res.cookie("token", "none", {
    expires: new Date(Date.now()),
    httpOnly: true,
    sameSite: "strict",
  });

  // Clear any authorization header
  res.setHeader("Authorization", "");

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

// Optional: Refresh token endpoint if needed
export const refreshToken = async (req, res) => {
  try {
    const user = req.user; // From auth middleware
    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Token refresh failed",
    });
  }
};
