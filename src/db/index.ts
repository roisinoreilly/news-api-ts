import { Pool } from "pg";
import dotenv from "dotenv";

const ENV = process.env.NODE_ENV || "dev";

dotenv.config({
  path: `${__dirname}/../../.env.${ENV}`,
});

const config =
  ENV === "production"
    ? {
        connectionString: process.env.DATABASE_URL,
        max: 2,
      }
    : {};

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
}

export default new Pool(config);