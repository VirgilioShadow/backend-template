import { expect } from "chai";
import request from "supertest";
import express from "express";
import db, { sequelize } from "../../models/index.js";

const { User } = db;

const app = express();
app.use(express.json());

app.post("/users", async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const newUser = await User.create({ firstName, lastName, email });
  res.json(newUser);
});

app.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.get("/users/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
});

app.put("/users/:id", async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const user = await User.findByPk(req.params.id);
  if (user) {
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    await user.save();
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
});

app.delete("/users/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.destroy();
    res.send("User deleted");
  } else {
    res.status(404).send("User not found");
  }
});

before(async () => {
  await sequelize.sync({ force: true });
});

beforeEach(async () => {
  await User.destroy({ where: {} }); // Clear all users before each test
});

after(async () => {
  await sequelize.close();
});

describe("User routes", () => {
  it("should create a new user", async () => {
    const response = await request(app).post("/users").send({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
    });
    expect(response.status).to.equal(200);
    expect(response.body.firstName).to.equal("John");
    expect(response.body.email).to.equal("john.doe@example.com");
  });

  it("should retrieve all users", async () => {
    await User.create({
      firstName: "Jane",
      lastName: "Doe",
      email: "jane.doe@example.com",
    });
    await User.create({
      firstName: "Alice",
      lastName: "Smith",
      email: "alice.smith@example.com",
    });
    const response = await request(app).get("/users");
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("array");
    expect(response.body.length).to.equal(2);
  });

  it("should retrieve a single user by ID", async () => {
    const user = await User.create({
      firstName: "Alice",
      lastName: "Smith",
      email: "alice.smith@example.com",
    });
    const response = await request(app).get(`/users/${user.id}`);
    expect(response.status).to.equal(200);
    expect(response.body.firstName).to.equal("Alice");
  });

  it("should update a user", async () => {
    const user = await User.create({
      firstName: "Bob",
      lastName: "Brown",
      email: "bob.brown@example.com",
    });
    const response = await request(app).put(`/users/${user.id}`).send({
      firstName: "Robert",
      lastName: "Brown",
      email: "robert.brown@example.com",
    });
    expect(response.status).to.equal(200);
    expect(response.body.firstName).to.equal("Robert");
  });

  it("should delete a user", async () => {
    const user = await User.create({
      firstName: "Charlie",
      lastName: "Black",
      email: "charlie.black@example.com",
    });
    const response = await request(app).delete(`/users/${user.id}`);
    expect(response.status).to.equal(200);
    const findResponse = await request(app).get(`/users/${user.id}`);
    expect(findResponse.status).to.equal(404);
  });
});
