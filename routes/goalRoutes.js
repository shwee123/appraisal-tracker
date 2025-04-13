const express = require("express");
const router = express.Router();
const {
    createGoal,
    getAllGoals,
    getGoalsByUserId,
    updateGoal,
    updateGoalStatus
} = require("../controllers/employeeGoalController");

router.post("/create", createGoal);
router.get("/all", getAllGoals);
router.get("/user/:userId", getGoalsByUserId);
router.put("/update/:goalId", updateGoal);
router.patch("/status/:goalId", updateGoalStatus);

module.exports = router;
