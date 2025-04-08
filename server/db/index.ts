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
  for (let i = 1; i <= 3; i++) {
    const orgName = `Org ${i}`;
    const orgId = Number(orgInsert.run(orgName).lastInsertRowid);

    const numAccounts = Math.floor(Math.random() * 3) + 1; // 1–3 accounts
    for (let j = 1; j <= numAccounts; j++) {
      const accountName = `Account ${i}.${j}`;
      const accountId = Number(
        accountInsert.run(orgId, accountName).lastInsertRowid
      );

      const numDeals = Math.floor(Math.random() * 3) + 1; // 1–3 deals
      for (let k = 1; k <= numDeals; k++) {
        const value = (k + 1) * 1000;
        const statuses = ["open", "closed", "pending"];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const startDate = `2025-04-${(k * 3).toString().padStart(2, "0")}`;
        const endDate = `2025-04-${(k * 3 + 2).toString().padStart(2, "0")}`;

        dealInsert.run(accountId, startDate, endDate, value, status);
      }
    }
  }
}
export default db;
