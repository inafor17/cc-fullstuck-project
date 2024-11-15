import { Knex } from "knex";

// migrations/20211115123457_create_payment_payee_table.js
exports.up = function (knex: Knex) {
  return knex.schema.createTable("PAYMENT_PAYEE", function (table) {
    table.increments("id").primary();
    table.integer("paymentId").unsigned().notNullable().references("id").inTable("PAYMENT").onDelete("CASCADE");
    table.integer("payeeId").unsigned().notNullable().references("id").inTable("MEMBER").onDelete("CASCADE");
  });
};

exports.down = function (knex: Knex) {
  return knex.schema.dropTable("PAYMENT_PAYEE");
};
