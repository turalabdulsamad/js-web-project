const express = require("express");
const router = express.Router();
const usersContoller = require("../../controllers/usersController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(verifyRoles(ROLES_LIST.Admin), usersContoller.getAllUsers)
  .put(verifyRoles(ROLES_LIST.Admin), usersContoller.updateUser)
  .delete(verifyRoles(ROLES_LIST.Admin), usersContoller.deleteUser);

router.route("/:id").get(verifyRoles(ROLES_LIST.Admin), usersContoller.getUser);

module.exports = router;
