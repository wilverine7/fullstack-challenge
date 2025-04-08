import Database from "better-sqlite3";
import {
  createOrganizationsTable,
  createAccountsTable,
  createDealsTable,
} from "./schema";

const db = new Database("./database.sqlite", { verbose: console.log });

db.prepare(createOrganizationsTable).run();
db.prepare(createAccountsTable).run();
db.prepare(createDealsTable).run();

export default db;
