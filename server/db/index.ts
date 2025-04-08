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

// Seed data if needed
const orgInsert = db.prepare("INSERT INTO organizations (name) VALUES (?)");
const accountInsert = db.prepare(
  "INSERT INTO accounts (organization_id, name) VALUES (?, ?)"
);
const dealInsert = db.prepare(
  "INSERT INTO deals (account_id, start_date, end_date, value, status) VALUES (?, ?, ?, ?, ?)"
);

// Only seed if empty
const orgsCount =
  (
    db.prepare("SELECT COUNT(*) as count FROM organizations").get() as {
      count: number;
    }
  )?.count ?? 0;
if (orgsCount === 0) {
  const info = orgInsert.run("Org A");
  const orgId = info.lastInsertRowid as number;

  const accountInfo = accountInsert.run(orgId, "Account 1");
  const accountId = accountInfo.lastInsertRowid as number;

  dealInsert.run(accountId, "2025-04-01", "2025-04-30", 1000, "open");
  dealInsert.run(accountId, "2025-05-01", "2025-06-01", 2500, "closed");
}
export default db;
