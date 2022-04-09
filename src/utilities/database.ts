import dotenv from "dotenv";
import { Pool } from "pg";
dotenv.config();
const client = new Pool({
  host: process.env.HOST,
  port: parseInt(process.env.PORT as string),
  database:
    process.env.ENVI === "test"
      ? process.env.DATABASE_TEST
      : process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
});

export default client;
