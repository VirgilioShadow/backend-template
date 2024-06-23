// test/routes/user.test.js
const request = require("supertest");
const express = require("express");
const { sequelize } = require("../../models");
const userRouter = require("../../routes/user"); // Assuming you have a user route

const app = express();
app.use(express.json());
app.use("/users", userRouter);

describe("User Routes", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  test("POST /users should create a new user", async () => {
    const response = await request(app).post("/users").send({
      firstName: "Jane",
      lastName: "Doe",
      email: "jane.doe@example.com",
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.firstName).toBe("Jane");
    expect(response.body.email).toBe("jane.doe@example.com");
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
