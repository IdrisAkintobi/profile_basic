import bcrypt from "bcrypt";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import { PhotoDb, UsersDb } from "../model/Schema";

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      throw new Error(errors.array()[0].msg);
    }

    const { firstName, lastName, email, password, active, avatar, photos } =
      req.body;

    // Check if user already exists
    const userExists = await UsersDb.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    // Get uploaded photos from the request
    const uploadedPhotos = req.files as any;

    //Hash password to be stored to database
    const hashedPass = await bcrypt.hash(password, 10);

    //Create user data
    const user = {
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      email,
      password: hashedPass,
      active,
      avatar,
      photos,
    };

    //Create user document
    const newUser = new UsersDb(user);

    // Create all photos documents
    const photosArray = uploadedPhotos.map(
      (photo: { originalname: string; location: string }) => {
        const newPhoto = new PhotoDb({
          user: newUser._id,
          name: photo.originalname,
          url: photo.location,
        });
        // Add photo to the user document
        newUser.photos.push(newPhoto._id as any);
        return newPhoto.save();
      }
    );

    try {
      // Add photos and user to the database
      await Promise.all([newUser.save(), ...photosArray]);

      //Send response
      res.status(201).json({
        message: "User created successfully",
      });
    } catch (err) {
      console.log(err);
      res.status(500);
      throw new Error("Another Something went wrong");
    }
  }
);
