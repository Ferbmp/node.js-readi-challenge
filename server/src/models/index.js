import { sequelize } from "../configDB.js";
import { User } from "./user.js";
import { Certificate } from "./certificate.js";

// Associações
Certificate.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Certificate, { foreignKey: "userId" });

export { sequelize, User, Certificate };
