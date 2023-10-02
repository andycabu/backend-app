import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "No autorizado" });
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.status(401).json({ message: "Token invalido" });

    req.user = user;
    console.log("user", user);

    next();
  });
};
