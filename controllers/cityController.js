const cityModel = require("../models/cityModel")
const stateModel = require("../models/stateModel")
const createCity = async (req, res) => {
    try {
        const savedCity = await cityModel.create(req.body);
        res.status(200).json({
            message: "city saved...",
        });
    } catch (err) {
        res.status(500).json({
            message: "error while saving city",
        });
    }
};
const getAllCities = async (req, res) => {
    try {
        const cities = await cityModel.find().populate("state");
        res.status(200).json({
            message: "city fetch successfully..",
            data: cities,
        });
    } catch (err) {
        res.status(500).json({
            message: "error while fetching city..",
        });
    }
}

const getCityByState = async (req, res) => {
    try {
        const cities = await cityModel.find({ state: req.params.stateId }).populate("state");
        res.status(200).json({ message: "Cities fetched successfully", data: cities });
    } catch (err) {
        res.status(500).json({ message: "Error while fetching cities by state", error: err });
    }
};
module.exports = {
    createCity, getAllCities, getCityByState
}