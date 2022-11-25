import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersDb } from "../model/Schema";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

export const jwtStrategy = new Strategy(opts, (jwt_payload, done) => {
  UsersDb.findById(jwt_payload.id)
    .then((user) => {
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    })
    .catch((err) => console.log(err));
});
