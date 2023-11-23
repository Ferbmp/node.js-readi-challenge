import express from "express";
import userRoutes from "./routes/userRoutes.js";
import certificateRequestsRoutes from "./routes/certificateRoutes.js";
import { sequelize } from "./models/index.js";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors());

sequelize
  .sync()
  .then(() => {
    console.log("Banco de dados sincronizado com sucesso.");
  })
  .catch((error) => {
    console.error("Falha ao sincronizar o banco de dados:", error);
  });

app.use("/users", userRoutes);
app.use("/certificate", certificateRequestsRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}.`);
});

export default app;
