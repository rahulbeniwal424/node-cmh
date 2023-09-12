const { body, validationResult } = require("express-validator");
const validatorResult = require("../../middlwares/validatorMiddlwares");
const isValidObjectId = require("../validMongodbObjectid");

  exports.createPlantValidator = [
    body("name")
      .notEmpty()
      .withMessage("name is not allowed to be empty")
      .isLength({ max: 100 })
      .withMessage(
        "name length must be less than or equal to 100 characters long"
      )
      .isLength({ min: 2 })
      .withMessage("name length must be at least 2 characters long"),
    body("description")
      .notEmpty()
      .withMessage("description is not allowed to be empty")
      .isLength({ min: 10 })
      .withMessage(
        "description length must be more than  10 characters long"
      ),


    validatorResult,
  ];
  exports.removePlantValidator = [
    body("id").custom((value, { req }) => {
      if (!isValidObjectId(req.params.id)) {
        throw new Error(`Invalid Plant id format`);
      }
      return true;
    }),
  
    validatorResult,
  ];