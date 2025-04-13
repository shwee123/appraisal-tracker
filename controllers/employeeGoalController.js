const employeeGoalModel = require('../models/employeeGoalModel');

// Create a new goal
const createGoal = async (req, res) => {
    try {
        const goal = await employeeGoalModel.create(req.body);
        res.status(201).json({ success: true, goal });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get all goals
const getAllGoals = async (req, res) => {
    try {
        const goals = await employeeGoalModel.find().populate("user", "name email");
        res.status(200).json({ success: true, goals });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get goals by employee (user) ID
const getGoalsByUserId = async (req, res) => {
    try {
        const goals = await employeeGoalModel.find({ user: req.params.userId });
        res.status(200).json({ success: true, goals });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Update full goal (by goal ID)
const updateGoal = async (req, res) => {
    try {
        const updated = await employeeGoalModel.findByIdAndUpdate(req.params.goalId, req.body, { new: true });
        if (!updated) {
            return res.status(404).json({ success: false, message: "Goal not found" });
        }
        res.status(200).json({ success: true, updated });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Update only the goal status
const updateGoalStatus = async (req, res) => {
    try {
        const updated = await employeeGoalModel.findByIdAndUpdate(
            req.params.goalId,
            { status: req.body.status },
            { new: true }
        );
        if (!updated) {
            return res.status(404).json({ success: false, message: "Goal not found" });
        }
        res.status(200).json({ success: true, updated });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = {
    createGoal,
    getAllGoals,
    getGoalsByUserId,
    updateGoal,
    updateGoalStatus
};
