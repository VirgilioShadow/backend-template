import { expect } from "chai";
import request from "supertest";
import express from "express";
import { sequelize } from "../models/index.js";

const app = express();

app.get("/", (req, res) => {
  res.json({ msg: "ok" });
});

before(async () => {
  await sequelize.sync({ force: true });
});

after(async () => {
  await sequelize.close();
});

describe("GET /", () => {
  it('should respond with a JSON object containing msg: "ok"', async () => {
    const response = await request(app).get("/");
    // console.log(response);
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ msg: "ok" });
  });
});
