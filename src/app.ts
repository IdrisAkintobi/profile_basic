import "dotenv/config";
import express, {
  json,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from "express";
import morgan from "morgan";
import passport from "passport";
import { connectDB } from "./db/connect";
import { jwtStrategy } from "./middlewares/authenticate";
import appRoutes from "./routes/app.routes";

//Instantiate app
const app = express();

//Middlewares
passport.use(jwtStrategy);
app.use(json(), urlencoded({ limit: "50mb", extended: true }), morgan("dev"));

//Routes
app.get("/", (_, res) => res.json({ message: "Connected" }));

app.use("/api/users", appRoutes);

// Not Found Error handler
app.use((req, res, next) => {
  const error = new Error("Not found");
  res.status(404);
  next(error);
});

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500);
  res.json({
    message: err.message,
  });
  const stack = process.env.NODE_ENV === "production" ? null : err.stack;
  console.log(stack);
});

// Connect to DB
connectDB();

export default app;
