const request = require("supertest");
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

describe("GET /", () => {
  it("should respond with Hello World!", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("Hello World!");
  });
});