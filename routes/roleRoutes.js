const router = require("express").Router()
const roleController = require("../controllers/roleController")
router.post("/",roleController.createRole)
router.get("/",roleController.getAllRoles)
module.exports = router