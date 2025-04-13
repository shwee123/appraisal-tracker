const employeeAppriciationModel = require('../models/employeeAppriciationModel');

// Create appreciation
const createAppriciation = async (req, res) => {
  try {
    const data = await employeeAppriciationModel.create(req.body);
    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all appreciations
const getAllAppriciations = async (req, res) => {
  try {
    const data = await employeeAppriciationModel.find().populate("user","firstName lastName").populate("hr","firstName lastName");
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get appreciation by employee ID
const getAppriciationsByUserId = async (req, res) => {
  try {
    const data = await employeeAppriciationModel.find({ user: req.params.userId }).populate("user","firstName lastName").populate("hr","firstName lastName");
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update appreciation by ID
const updateAppriciation = async (req, res) => {
  try {
    const updated = await employeeAppriciationModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: "Appreciation not found" });
    }
    res.status(200).json({ success: true, updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete appreciation by ID
const deleteAppriciation = async (req, res) => {
  try {
    const deleted = await employeeAppriciationModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Appreciation not found" });
    }
    res.status(200).json({ success: true, message: "Appreciation deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createAppriciation,
  getAllAppriciations,
  getAppriciationsByUserId,
  updateAppriciation,
  deleteAppriciation
};
