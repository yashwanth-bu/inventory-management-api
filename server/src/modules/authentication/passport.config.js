import passport from "passport";
import { localStrategy, 
    serializeStrategy, 
    deserializeStrategy 
} from "./strategies/local.strategy.js";

passport.use("local", localStrategy);

passport.serializeUser(serializeStrategy);

passport.deserializeUser(deserializeStrategy);

export default passport;