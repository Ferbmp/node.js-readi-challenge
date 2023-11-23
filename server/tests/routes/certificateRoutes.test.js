import supertest from "supertest";
import app from "../../src/app.js";
import { User } from "../../src/models/user.js";
import { verifyToken } from "../../src/auth.js";
import { jest } from "@jest/globals";

jest.mock("../../src/auth.js", () => ({
  verifyToken: jest.fn(),
}));

jest.mock("../../src/models/user.js");
jest.mock("../../src/models/certificate.js");

verifyToken.mockImplementation((token) => ({ id: userData.id }));

const userData = {
  id: 1,
  profile: "client",
};

User.findByPk.mockResolvedValue({
  id: userData.id,
  profile: "client",
});

const certificateData = {
  userId: userData.id,
  fullName: "Felipe Bastos",
  cpf: "123.456.789-00",
  phoneNumber: "1234567890",
  birthDate: "1990-01-01",
  city: "Test City",
  state: "Test State",
  street: "Test Street",
  number: "12333123",
  zipCode: "12345-678",
  certificateType: "casamento",
};

// Funções auxiliares mockadas

describe("Certificate Generation Route", () => {
  it("should successfully create a certificate", async () => {
    const response = await supertest(app)
      .post("/generate")
      .set("Authorization", `Bearer validtoken`)
      .send({
        fullName: certificateData.fullName,
        cpf: certificateData.cpf,
        phoneNumber: certificateData.phoneNumber,
        birthDate: certificateData.birthDate,
        city: certificateData.city,
        state: certificateData.state,
        street: certificateData.street,
        number: certificateData.number,
        zipCode: certificateData.zipCode,
        certificateType: certificateData.certificateType,
        userId: certificateData.userId,
      })
      .expect(201);
  });
});
