const express = require("express");
const authControllers = require("../controllers/authController");
const router = express.Router();

router.post("/signup", authControllers.signup);
router.post("/login", authControllers.login);

router.get("/verifyUser/:userId/:token", authControllers.verifyUser);
router.get("/resendToken/:email", authControllers.resendToken);

router.post(
  "/changePassword",
  authControllers.protectRoutes,
  authControllers.changePassword
);

module.exports = router;
