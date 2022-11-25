import { Router } from "express";
import passport from "passport";
import { loginUser } from "../controller/login.user";
import { getUserProfile } from "../controller/me.user";
import { registerUser } from "../controller/register.user";
import { upload } from "../middlewares/photo.upload";
import { loginValidate, registerValidate } from "../middlewares/validator";

const router = Router();

router.post(
  "/register",
  upload.array("photos", 5),
  registerValidate,
  registerUser
);

router.post("/login", loginValidate, loginUser);

router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  getUserProfile
);

export default router;
