import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export const register = async (req, res) => {
  const { name, email, password1, password2 } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (userFound)
      return res.status(400).json({
        error: ["El correo electrónico ya está registrado"],
      });
    if (password1 !== password2) {
      return res.status(400).json({
        error: ["Las contraseñas no coinciden"],
      });
    }
    const password = (await password1) === password2 ? password1 : null;

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
      return res.status(400).json({ error: ["Usuario no encontrado"] });

    if (!userFound.password)
      return res
        .status(400)
        .json({ message: "La contraseña no está definida" });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json({ error: ["Contraseña incorrecta"] });

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

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound)
    return res.status(400).json({
      error: ["Usuario no encontrado "],
    });
  return res.json({
    id: userFound._id,
    name: userFound.name,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ error: ["No autorizado"] });

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ error: ["No autorizado"] });
    const userFound = await User.findById(user.id);

    if (!userFound) return res.status(401).json({ error: ["No autorizado"] });

    return res.json({
      id: userFound._id,
      name: userFound.name,
      email: userFound.email,
    });
  });
};
