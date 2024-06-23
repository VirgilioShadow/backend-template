import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import { fileURLToPath } from "url";
import config from "../config/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const db = {};

const currentConfig = config[env];

let sequelize;
if (currentConfig.use_env_variable) {
  sequelize = new Sequelize(
    process.env[currentConfig.use_env_variable],
    currentConfig
  );
} else {
  sequelize = new Sequelize(
    currentConfig.database,
    currentConfig.username,
    currentConfig.password,
    currentConfig
  );
}

const files = fs.readdirSync(__dirname).filter((file) => {
  return (
    file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  );
});

for (const file of files) {
  const model = (await import(path.join(__dirname, file))).default(
    sequelize,
    Sequelize.DataTypes
  );
  db[model.name] = model;
}

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
export { sequelize };
