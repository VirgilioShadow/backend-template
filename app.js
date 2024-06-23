import express from "express";
import models, { sequelize } from "./models/index.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "ok" });
});

app.post("/users", async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const newUser = await models.User.create({ firstName, lastName, email });
  res.json(newUser);
});

app.get("/users", async (req, res) => {
  const users = await models.User.findAll();
  res.json(users);
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

app.listen(port, async () => {
  console.log(`Server is running on port: ${port}`);
  try {
    await sequelize.authenticate();
    console.log("Sequelize is connected to db.");
  } catch (error) {
    console.error("Sequelize unable to connect to db:", error);
  }
});
