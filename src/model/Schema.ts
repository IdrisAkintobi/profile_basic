import { model, Schema } from "mongoose";

const PhotoSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "userData",
    },
    name: { type: String, trim: true },
    url: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    fullName: {
      type: String,
      trim: true,
      minLength: 5,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    photos: [
      {
        type: Schema.Types.ObjectId,
        ref: "photoData",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UsersDb = model("userData", UserSchema);
const PhotoDb = model("photoData", PhotoSchema);

export { UsersDb, PhotoDb };
