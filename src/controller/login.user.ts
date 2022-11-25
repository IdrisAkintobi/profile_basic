import bcrypt from "bcrypt";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { UsersDb } from "../model/Schema";

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array()[0].msg);
  }

  const { email, password } = req.body;

  // Check if user exists
  const user = await UsersDb.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      token: jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
        expiresIn: "1d",
      }),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});
