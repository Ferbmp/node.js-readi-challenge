import express from "express";
import { Certificate } from "../models/certificate.js";
import multer from "multer";
import { User } from "../models/user.js";

const router = express.Router();

const storage = multer.memoryStorage();

import { authenticate } from "../middlewares/authenticateMiddleware.js";
import { authorize } from "../middlewares/authorizationMiddleware.js";

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .pdf and .png files are allowed!"));
    }
  },
});

router.use(authenticate);

router.patch(
  "/:id/status",

  authorize("operator", "admin"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const certificate = await Certificate.findByPk(id);

      if (!certificate) {
        return res.status(404).json({ message: "Certificado não encontrado." });
      }

      if (req.user.profile === "admin" || req.user.profile === "operator") {
        certificate.status = status;
        await certificate.save();

        res.json({
          message: "Status do certificado atualizado com sucesso.",
          certificate,
        });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.get(
  "/list",

  authorize("operator", "admin"),
  async (req, res) => {
    try {
      const { profile } = req.query;
      let whereClause = {};
      if (profile) {
        whereClause = {
          "$User.profile$": profile,
        };
      }

      const certificates = await Certificate.findAll({
        include: [
          {
            model: User,
            attributes: ["profile"],
            where: whereClause,
          },
        ],
      });

      res.json(certificates);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.get(
  "/findByUser/:userId",
  authorize("client", "operator", "admin"),
  async (req, res) => {
    try {
      const userRequests = await Certificate.findAll({
        where: {
          userId: req.params.userId,
        },
      });
      res.json(userRequests);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

router.delete(
  "/:id",
  authorize("client", "operator", "admin"),
  async (req, res) => {
    try {
      const request = await Certificate.findByPk(req.params.id);

      if (!request) {
        return res.status(404).send("Solicitação não encontrada.");
      }

      if (request.status === "emitida" && req.user.profile !== "admin") {
        return res
          .status(403)
          .send("Não permitido excluir solicitações já emitidas.");
      }

      await request.destroy();
      res.send("Solicitação excluída com sucesso.");
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

router.post(
  "/generate",
  authorize("client", "admin"),
  upload.single("attachedDocument"),
  async (req, res) => {
    try {
      const {
        fullName,
        cpf,
        phoneNumber,
        birthDate,
        city,
        state,
        street,
        number,
        zipCode,
        certificateType,
        userId,
        status,
      } = req.body;
      const attachedDocument = req.file ? req.file.buffer : null;

      const newRequest = await Certificate.create({
        userId,
        fullName,
        cpf,
        phoneNumber,
        birthDate,
        city,
        state,
        street,
        number,
        zipCode,
        certificateType,
        attachedDocument,
        status,
      });

      res.status(201).json(newRequest);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

export default router;
