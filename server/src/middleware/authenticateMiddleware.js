import { verifyToken } from "../auth.js";
import { User } from "../models/user.js";

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Acesso negado." });
  }

  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  try {
    const decoded = verifyToken(token);
    req.user = await User.findByPk(decoded.id);
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido ou expirado." });
  }
};
