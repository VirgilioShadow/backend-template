import { expect } from "chai";
import db, { sequelize } from "../../models/index.js";

const { User } = db;

before(async () => {
  await sequelize.sync({ force: true });
});

after(async () => {
  await sequelize.close();
});

describe("User model", () => {
  it("should create a new user", async () => {
    const user = await User.create({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
    });
    expect(user.firstName).to.equal("John");
    expect(user.lastName).to.equal("Doe");
    expect(user.email).to.equal("john.doe@example.com");
  });
});
