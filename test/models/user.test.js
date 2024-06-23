// test/models/user.test.js
const { User } = require("../../models");
const { sequelize } = require("../../models");

describe("User Model", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  test("should create a user", async () => {
    const user = await User.create({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
    });
    expect(user.firstName).toBe("John");
    expect(user.lastName).toBe("Doe");
    expect(user.email).toBe("john.doe@example.com");
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
