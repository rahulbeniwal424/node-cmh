const { body, validationResult } = require("express-validator");
const validatorResult = require("../../middlwares/validatorMiddlwares");
const isValidObjectId = require("../validMongodbObjectid");

  exports.createMachineValidator = [
    body("category")
      .notEmpty()
      .withMessage("category is not allowed to be empty")
      .isLength({ max: 100 })
      .withMessage(
        "category length must be less than or equal to 100 characters long"
      )
      .isLength({ min: 2 })
      .withMessage("category length must be at least 2 characters long"),

    validatorResult,
  ];
  exports.removeMachineValidator = [
    body("id").custom((value, { req }) => {
      if (!isValidObjectId(req.params.id)) {
        throw new Error(`Invalid Machine id format`);
      }
      return true;
    }),
  
    validatorResult,
  ];