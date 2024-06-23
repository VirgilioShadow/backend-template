const userService = require("../services/userService");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// Define other user-related controller methods (createUser, getUserById, updateUser, deleteUser) similarly
