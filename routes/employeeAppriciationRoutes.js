const express = require("express");
const router = express.Router();
const {
  createAppriciation,
  getAllAppriciations,
  getAppriciationsByUserId,
  updateAppriciation,
  deleteAppriciation
} = require("../controllers/employeeAppriciationController");

router.post("/create", createAppriciation);
router.get("/all", getAllAppriciations);
router.get("/user/:userId", getAppriciationsByUserId);
router.put("/update/:id", updateAppriciation);
router.delete("/delete/:id", deleteAppriciation);

module.exports = router;
