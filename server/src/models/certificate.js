// models/certificateRequest.js

import { DataTypes, UUIDV4 } from "sequelize";
import { sequelize } from "../configDB.js";

export const Certificate = sequelize.define("Certificate", {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
  },

  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  street: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  zipCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  attachedDocument: {
    type: DataTypes.BLOB("long"),
    allowNull: true,
  },

  certificateType: {
    type: DataTypes.ENUM,
    values: ["casamento", "nascimento", "imóvel"],
    allowNull: false,
    validate: {
      isIn: {
        args: [["casamento", "nascimento", "imóvel"]],
        msg: "Tipo de certidão inválido",
      },
    },
  },
  status: {
    type: DataTypes.ENUM,
    values: ["pendente", "emitida", "negada"],
    allowNull: false,
    defaultValue: "pendente",
    validate: {
      isIn: {
        args: [["pendente", "emitida", "negada"]],
        msg: "Status inválido",
      },
    },
  },
});
