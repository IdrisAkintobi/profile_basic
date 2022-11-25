import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { UsersDb } from "../model/Schema";

export const getUserProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await UsersDb.findById(req.user)
      .populate("photos", "name url -_id")
      .select("-password -__v -_id");
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  }
);
