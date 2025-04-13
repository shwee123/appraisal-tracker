const router = require("express").Router();
const userController = require("../controllers/userController");

// Create a new user
router.post("/", userController.createUser);

// Get all users
router.get("/", userController.getAllUsers);

// Get a user by ID
router.get("/:id", userController.getUserById);

// Get users by role
router.get("/role/:roleId", userController.getUsersByRole);

// Update a user by ID
router.put("/:id", userController.updateUser);

// Delete a user by ID
router.delete("/:id", userController.deleteUser);


router.post("/login",userController.loginUser)

module.exports = router;
