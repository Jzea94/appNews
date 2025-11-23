import { body, param } from "express-validator";

export const createUserValidator = [
  body("username")
    .trim()
    .notEmpty().withMessage("Username is required")
    .isLength({ min: 3 }).withMessage("Username must be greater than 3 characters"),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),

  body("password")
    .trim()
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("The password must be greater than 6 chatacters"),

  body("role")
    .optional()
    .isIn(["admin", "editor", "superadmin"])
    .withMessage("Invalid role"),
];


export const updateUserValidator = [
  param("id").isMongoId().withMessage("invalid ID"),

  body("username")
    .optional()
    .trim()
    .isLength({ min: 3 }).withMessage("Username must be greater than 3 characters"),

  body("email")
    .optional()
    .trim()
    .isEmail().withMessage("The email must be in a valid format"),

  body("role")
    .optional()
    .isIn(["admin", "editor", "superadmin"])
    .withMessage("Invalid role"),

  body("isActive")
    .optional()
    .isBoolean().withMessage("isActive must be Boolean"),
];
