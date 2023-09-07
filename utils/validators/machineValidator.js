const { body, validationResult } = require("express-validator");
const validatorResult = require("../../middlwares/validatorMiddlwares");
const isValidObjectId = require("../validMongodbObjectid");

  exports.createMachineValidator = [
    body("name")
      .notEmpty()
      .withMessage("name is not allowed to be empty")
      .isLength({ max: 100 })
      .withMessage(
        "name length must be less than or equal to 100 characters long"
      )
      .isLength({ min: 2 })
      .withMessage("name length must be at least 2 characters long"),
    body("type")
      .notEmpty()
      .withMessage("type is not allowed to be empty")
      .isLength({ max: 150 })
      .withMessage(
        "type length must be less than or equal to 150 characters long"
      ),


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