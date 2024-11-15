import { Knex } from "knex";

exports.up = function (knex: Knex) {
  return knex.schema.createTable("PAYMENT", function (table) {
    table.increments("id").primary(); // PK
    table.integer("payerId").unsigned().notNullable().references("id").inTable("MEMBER").onDelete("CASCADE"); // FK to MEMBER.id
    table.decimal("amount", 10, 2).notNullable(); // 数値型
    table.timestamp("timestamp").notNullable().defaultTo(knex.fn.now()); // 日付+時刻
    table.string("description").notNullable(); // 文字列型
  });
};

exports.down = function (knex: Knex) {
  return knex.schema.dropTable("PAYMENT");
};
