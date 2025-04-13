const router = require("express").Router();
const stateController = require("../controllers/stateController");
router.post("/", stateController.createState);
router.get("/", stateController.getAllStates);
module.exports = router;