const express = require("express");
const router = express.Router();
const authController = require('../controllers/auth')

router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});

router.post("/signup", function (req, res) {
    authController.registerUser(req, res);
});
router.post("/signin", function (req, res) {
    authController.login(req, res);
});
router.get("/signout", function (req, res) {
    authController.logout(req, res);
});
module.exports = router;