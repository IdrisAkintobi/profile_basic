import { check } from "express-validator";

// Validation Array
export const registerValidate = [
  // check firstName
  check("firstName", "First Name is required")
    .isLength({ min: 2, max: 25 })
    .withMessage("First Name must be between 2 to 25 characters")
    .trim(),
  // check lastName
  check("lastName", "Last Name is required")
    .isLength({ min: 2, max: 25 })
    .withMessage("Last Name must be between 2 to 25 characters")
    .trim(),
  // Check Username
  check("email", "Must be a valid email").isEmail().trim().normalizeEmail(),
  // Check Password
  check("password")
    .isLength({ min: 8, max: 50 })
    .withMessage("Password must be between 8 and 50 characters")
    .matches("[0-9]")
    .withMessage("Password Must Contain a Number"),
  // check avatar
  check("avatar", "Avatar is required")
    .isString()
    .trim()
    .isURL()
    .withMessage("Avatar must be a valid URL"),
];

export const loginValidate = [
  // Check Username
  check("email", "Must be a valid email").isEmail().trim().normalizeEmail(),
  // Check Password
  check("password").isString(),
];
