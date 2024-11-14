import { Knex } from "knex";

const config = require("../knexfile");
const db: Knex = require("knex")(config);

export default db;
