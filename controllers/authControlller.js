import User from "../Models/UserModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { firstName, lastName, userName, password } = req.body;
console.log(req.body);
  if (!firstName || !lastName || !userName || !password) {
    return res.status(400).json({ status: "error", message: "Missing required fields" });
  }
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    firstName,
    lastName,
    userName,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    res.status(201).json({ status: "success", data: newUser });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { userName, password } = req.body;
  try {
    const validUser = await User.findOne({ userName });
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    const accessToken = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", accessToken, { httpOnly: true })
      .status(200)
      .json({ ...rest, accessToken });
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      console.log(accessToken);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", accessToken, { httpOnly: true })
        .status(200)
        .json({ ...rest, accessToken });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const accessToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", accessToken, { httpOnly: true })
        .status(200)
        .json({ ...rest, accessToken });
    }
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};
