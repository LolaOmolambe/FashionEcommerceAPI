const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const authController = require("../controllers/authController");

router
  .route("/")
  .get(
    authController.protectRoutes,
    authController.restrictTo("admin"),
    customerController.getAllCustomers
  )
  .post(
    authController.protectRoutes,
    authController.restrictTo("user"),
    customerController.createCustomer
  );

router
  .route("/mycustomers")
  .get(
    authController.protectRoutes,
    authController.restrictTo("user"),
    customerController.getAllCustomersForAUser
  );

router
  .route("/mycustomers/:id")
  .put(
    authController.protectRoutes,
    authController.restrictTo("user"),
    customerController.updateCustomer
  )
  .get(
    authController.protectRoutes,
    authController.restrictTo("user"),
    customerController.getACustomerById
  )
  .delete(
    authController.protectRoutes,
    authController.restrictTo("user"),
    customerController.deleteCustomer
  );

module.exports = router;
