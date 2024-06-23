import dotenv from "dotenv";
dotenv.config();

const config = {
  development: {
    username: process.env.DB_USERNAME || "default_username",
    password: process.env.DB_PASSWORD || "default_password",
    database: process.env.DB_NAME || "default_database",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: process.env.DB_DIALECT || "postgres",
    logging: false,
  },
  test: {
    username: process.env.DB_USERNAME || "default_username",
    password: process.env.DB_PASSWORD || "default_password",
    database: process.env.DB_NAME_TEST || "database_test",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: process.env.DB_DIALECT || "postgres",
    logging: false,
  },
  production: {
    username: process.env.DB_USERNAME || "default_username",
    password: process.env.DB_PASSWORD || "default_password",
    database: process.env.DB_NAME_PROD || "database_production",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: process.env.DB_DIALECT || "postgres",
    logging: false,
  },
};

export default config;
