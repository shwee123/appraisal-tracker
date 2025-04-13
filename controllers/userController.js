const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const mailutil = require("../utils/mailUtil")

const getWelcomeMailHTML = (name, email, password) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
      <h2>Welcome to the Team, ${name} 👋</h2>
      <p>We're excited to have you on board!</p>

      <h3>Your Login Credentials</h3>
      <table style="border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; font-weight: bold;">Email:</td>
          <td style="padding: 8px;">${email}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Password:</td>
          <td style="padding: 8px;">${password}</td>
        </tr>
      </table>

      <p>Please change your password after logging in for the first time for security reasons.</p>

      <p>Best regards,<br/>HR Team</p>
    </div>
  `;
};


// Create User
const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, contact, role } = req.body;

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword
    const newUser = await userModel.create(req.body);
    const fullName = `${newUser.firstName} ${newUser.lastName}`;
    const mailHTML = getWelcomeMailHTML(fullName, req.body.email, password);

    await mailutil.sendingMail(email, "🎉 Welcome to the Company!", mailHTML);

    res.status(201).json({ message: "User created successfully", data: newUser });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Error while creating user", error: err });
  }
};

// User Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email,password)
    const user = await userModel.findOne({ email:email }).populate("role");
    console.log(user)
    if (!user) return res.status(404).json({ message: "User not found" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // Generate JWT Token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token, user,data:user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error during login", error: err });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().populate("role");
    res.status(200).json({ message: "Users fetched successfully", data: users });
  } catch (err) {
    res.status(500).json({ message: "Error while fetching users", error: err });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id).populate("role");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User fetched successfully", data: user });
  } catch (err) {
    res.status(500).json({ message: "Error while fetching user", error: err });
  }
};

// Get users by role
const getUsersByRole = async (req, res) => {
  try {
    const users = await userModel.find({ role: req.params.roleId }).populate("role");
    res.status(200).json({ message: "Users fetched successfully", data: users });
  } catch (err) {
    res.status(500).json({ message: "Error while fetching users by role", error: err });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const { password, ...updateData } = req.body;

    // If password is provided, encrypt it
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await userModel.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User updated successfully", data: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Error while updating user", error: err });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error while deleting user", error: err });
  }
};

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  getUsersByRole,
  updateUser,
  deleteUser,
};
