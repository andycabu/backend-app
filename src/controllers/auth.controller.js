import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!password) {
      throw new Error("Se requiere una contraseña");
    }

    const passwordHash = await bcrypt.hash(password.toString(), 10);

    const newUser = new User({ name, email, password: passwordHash });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });

    res.cookie("token", token);

    res.json(userSaved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email }).select("+password");

    if (!userFound)
      return res.status(400).json({ message: "Usuario no encontrado" });

    if (!password)
      return res.status(400).json({ message: "Se requiere una contraseña" });

    if (!userFound.password)
      return res
        .status(400)
        .json({ message: "La contraseña no está definida" });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token);

    res.json({
      id: userFound._id,
      name: userFound.name,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = (req, res) => {
  const userFound = User.findById(req.user, id);
  if (!userFound)
    return res.status(400).json({
      message: "Usuario no encontrado ",
    });
  return res.json({
    id: userFound._id,
    name: userFound.name,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};
