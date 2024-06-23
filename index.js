const express = require("express");
const { Sequelize } = require("sequelize");
const models = require("./models");

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// CRUD routes for User
app.get("/users", async (req, res) => {
  const users = await models.User.findAll();
  res.json(users);
});

app.post("/users", async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const newUser = await models.User.create({ firstName, lastName, email });
  res.json(newUser);
});

app.get("/users/:id", async (req, res) => {
  const user = await models.User.findByPk(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
});

app.put("/users/:id", async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const user = await models.User.findByPk(req.params.id);
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
  const user = await models.User.findByPk(req.params.id);
  if (user) {
    await user.destroy();
    res.send("User deleted");
  } else {
    res.status(404).send("User not found");
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
