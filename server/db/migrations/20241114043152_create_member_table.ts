import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("MEMBER", function (table) {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("projectId").notNullable();

    table.foreign("projectId").references("id").inTable("PROJECT").onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("MEMBER");
}
