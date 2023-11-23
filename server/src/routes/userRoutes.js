// routes/userRoutes.js
import express from "express";
import { User } from "../models/user.js";
import { generateToken } from "../auth.js";
import { authenticate } from "../middlewares/authenticateMiddleware.js";

const router = express.Router();

router.get("/me", authenticate, (req, res) => {
  res.json(req.user);
});

router.post("/register", async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      profile: req.body.profile,
    });

    newUser.password = undefined;
    res.json(newUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Email não encontrado." });
    }

    const isValid = await user.isPasswordValid(password);
    if (!isValid) {
      return res.status(401).json({ message: "Senha inválida." });
    }

    const token = generateToken(user);

    res.json({
      message: "Login bem-sucedido!",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profile: user.profile,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
