import User from "../models/user.models.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: passwordHash });

    const userSaved = await newUser.save();
    res.json(userSaved);
  } catch (error) {
    console.log(error);
  }
};
export const login = async (req, res) => {
  res.send("login");
};
