var express = require("express");
var router = express.Router();

const { getUsers, getUserbyId, insertUser, updateUser, deleteUser } = require("../controllers/usersController");

const { searchUserValidationRules, InsertUserValidationRules, idValidationRules, validate } = require("../middlewares/validator");

router.get("/", searchUserValidationRules(), validate, getUsers);

router.get("/:id", idValidationRules(), validate, getUserbyId);

router.post("/", InsertUserValidationRules(), validate, insertUser);

router.put("/:id", idValidationRules(), validate, updateUser);

router.delete("/:id", idValidationRules(), validate, deleteUser);

module.exports = router;
