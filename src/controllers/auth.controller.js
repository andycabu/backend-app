import User from "../models/user.models.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = new User({ name, email, password });

    const userSaved = await newUser.save();
    res.json(userSaved);
  } catch (error) {
    console.log(error);
  }
};
export const login = async (req, res) => {
  res.send("login");
};
