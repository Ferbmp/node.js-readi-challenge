import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage:
    process.env.NODE_ENV === "test" ? "./test_database.db" : "./database.db",
});
