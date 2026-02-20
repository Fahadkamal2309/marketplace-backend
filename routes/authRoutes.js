const router = require("express").Router();
const protect = require("../middleware/protect.js");
const { register, login, getMe } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);

module.exports = router;

