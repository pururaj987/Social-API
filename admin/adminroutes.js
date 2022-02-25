const adminControllers = require("./admincontroller");
const express = require("express");
const router = express.Router();
router.post('/signup', adminControllers.signup);
router.post('/login', adminControllers.login);
router.post('/update' , adminControllers.update);
router.post('/profileDetails', adminControllers.profileDetails);
module.exports = router