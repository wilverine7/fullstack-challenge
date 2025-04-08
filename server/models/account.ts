import db from "../db";

export type Account = {
  id: number;
  organization_id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

export function getAccountsByOrganizationId(orgId: number): Account[] {
  const stmt = db.prepare("SELECT * FROM accounts WHERE organization_id = ?");
  return stmt.all(orgId) as Account[];
}

export function createAccount(orgId: number, name: string): Account {
  const stmt = db.prepare(`
    INSERT INTO accounts (organization_id, name)
    VALUES (?, ?)
    RETURNING *;
  `);
  return stmt.get(orgId, name) as Account;
}
