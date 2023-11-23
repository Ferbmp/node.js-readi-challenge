import { sequelize } from "../configDB.js";
import { User } from "../models/user.js";

const usersData = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    profile: "admin",
  },
  {
    name: "Client User",
    email: "client@example.com",
    password: "client123",
    profile: "client",
  },
  {
    name: "Client User 2",
    email: "client2@example.com",
    password: "client123",
    profile: "client",
  },
  {
    name: "Client User 3",
    email: "client3@example.com",
    password: "client123",
    profile: "client",
  },
  {
    name: "Client User 4",
    email: "client4@example.com",
    password: "client123",
    profile: "client",
  },
  {
    name: "Operator User",
    email: "operator@example.com",
    password: "operator123",
    profile: "operator",
  },
];

const seedUsers = async () => {
  try {
    await sequelize.sync();
    for (const userData of usersData) {
      await User.create(userData);
    }
    console.log("Usuários inseridos com sucesso!");
  } catch (error) {
    console.error("Erro ao inserir usuários:", error);
  } finally {
    await sequelize.close();
  }
};

async function seed() {
  await seedUsers();
}
seed();
