const stateModel = require("../models/stateModel")
const createState = async (req, res) => {
    try {
        const savedState = await stateModel.create(req.body);
        res.status(200).json({
            message: "state saved...",
        });
    } catch (err) {
        res.status(500).json({
            message: "error while saving state",
        });
    }
};
const getAllStates = async (req, res) => {
    try {
        const states = await stateModel.find();
        res.status(200).json({
            message: "state fetch successfully..",
            data: states,
        });
    } catch (err) {
        res.status(500).json({
            message: "error while fetching state..",
        });
    }
}

module.exports = {
    createState, getAllStates
}