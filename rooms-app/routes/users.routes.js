const router = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const {getProfile} = require('../controllers/user.controller')

router.get("/:user", isLoggedIn, getProfile)
module.exports = router