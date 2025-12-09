// server/controllers/auth.controller.js
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import errorHandler from "./error.controller.js";

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).exec();
    if (!user || !user.authenticate(password)) {
      return res.status(401).json({ error: "Email and password do not match." });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    });

    // Optionally set cookie:
    // res.cookie("t", token, { httpOnly: true });

    user.hashed_password = undefined;
    user.salt = undefined;

    return res.json({ token, user });
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const signout = (req, res) => {
  // If you set a cookie on signin, clear it:
  // res.clearCookie("t");
  return res.json({ message: "Signout successful" });
};

/**
 * requireSignin
 * Verifies JWT from Authorization header "Bearer <token>" or cookie "t"
 * Attaches decoded payload to req.auth
 */
const requireSignin = (req, res, next) => {
  try {
    let token = null;
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else if (req.cookies && req.cookies.t) {
      token = req.cookies.t;
    }

    if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.auth = decoded; // { _id: '...' }
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token. Please sign in again." });
  }
};

/**
 * hasAuthorization
 * Checks that the authenticated user is the same as the resource owner
 * Expects req.profile to be set by param middleware (e.g., userByID)
 */
const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id.toString() === req.auth._id;
  if (!authorized) {
    return res.status(403).json({ error: "User is not authorized." });
  }
  next();
};

export default { signin, signout, requireSignin, hasAuthorization };
