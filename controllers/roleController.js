const { json } = require("express");
const roleModel = require("../models/roleModel");
const createRole = async (req, res) => {
  try {
    const savedRole = await roleModel.create(req.body);
    res.status(200).json({
      message: "role saved...",
    });
  } catch (err) {
    res.status(500).json({
      message: "error while saving role",
    });
  }
};

const getAllRoles = async (req, res) => {
  try {
    const roles = await roleModel.find();
    res.status(200).json({
      message: "role fetch successfully..",
      data: roles,
    });
  } catch (err) {
    res.status(500).json({
      message: "error while fetching role..",
    });
  }
};


module.exports ={
    createRole,getAllRoles
}