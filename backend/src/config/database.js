import {Sequelize} from 'sequelize';
import 'dotenv/config';

const {
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DIALECT
} = process.env;

const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USERNAME,
    DATABASE_PASSWORD, {
      dialect: DIALECT || "mysql",
      host : DATABASE_HOST
    });

export default sequelize;
