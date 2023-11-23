import supertest from "supertest";
import app from "../../src/app.js";
import { sequelize } from "../../src/configDB.js";

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("User Routes", () => {
  describe("POST /register", () => {
    test("should register a new user", async () => {
      const userData = {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        profile: "client",
      };

      const response = await supertest(app)
        .post("/users/register")
        .send(userData);
      expect(response.statusCode).toBe(200);
      expect(response.body.name).toBe(userData.name);
      expect(response.body.email).toBe(userData.email);
      // Não devemos enviar a senha de volta
      expect(response.body.password).toBeUndefined();
    });
  });

  describe("POST /login", () => {
    test("should login the user and return a token", async () => {
      const loginData = {
        email: "test@example.com",
        password: "password123",
      };

      const response = await supertest(app)
        .post("/users/login")
        .send(loginData);
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe("Login bem-sucedido!");
      expect(response.body.token).toBeDefined();
      expect(response.body.user).toBeDefined();
    });
  });
});
