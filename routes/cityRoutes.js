const router = require("express").Router();
const cityController = require("../controllers/cityController");
router.post("/", cityController.createCity);
router.get("/", cityController.getAllCities);
router.get("/:stateId", cityController.getCityByState);
module.exports = router;