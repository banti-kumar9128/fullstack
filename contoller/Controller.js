import { User } from "../schema/User.Schema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// 🔹 Token generator
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
}
// 🔹 Register Controller


export const register = async (req, res) => {
  try {
    const { name, email, number, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      number,
      password: hashedPassword,
    });

    // Generate token
     const token = generateToken(user._id);
    
 

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};


// 🔹 Signin Controller
 export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ success: false, message: "User not found!" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    // Generate token
    const token = generateToken(existingUser._id);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: existingUser._id,
        name: existingUser.name,
        number: existingUser.number,
        email: existingUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Logout Controller
export const logout = async (req, res) => {
  try {
    // Correct cookie clearing method
    res.clearCookie("token");
    res.json({ success: true, message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
