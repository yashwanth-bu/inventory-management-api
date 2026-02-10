import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { findUserByEmail, findUserById } from "../auth.service.js";

export const localStrategy = new LocalStrategy(
    { usernameField: "email" }, async (email, password, done) => {
    try {
        const user = await findUserByEmail(email);
        if (!user) return done(null, false, { message: "Incorrect email or password." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return done(null, false, { message: "Incorrect email or password." });

        return done(null, user);
    } catch (error) {
        return done(error);
    }
})

export const serializeStrategy = (user, done) => {
    done(null, user.id);
}

export const deserializeStrategy = async (id, done) => {
    try {
        const user = await findUserById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
}