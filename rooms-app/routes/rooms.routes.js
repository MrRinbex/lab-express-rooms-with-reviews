const router = require("express").Router();
const Room = require("../models/room.model");
const User = require("../models/User.model");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/:id", (req, res) => {
    Room.findById(req.params.id)
      .populate("owner")
      .populate({ path: "reviews", populate: { path: "user" } })
      .then((results) => {
        res.render("room", results);
      });
  });

module.exports = router;