import db from "../db";

export type Deal = {
  id: number;
  account_id: number;
  start_date: string;
  end_date: string;
  value: number;
  status: string;
};

export function getDealsByOrganizationId(orgId: number): Deal[] {
  const stmt = db.prepare(`
    SELECT deals.*, accounts.name AS account_name
    FROM deals
    JOIN accounts ON deals.account_id = accounts.id
    WHERE accounts.organization_id = ?
  `);
  return stmt.all(orgId) as Deal[];
}

export function createDeal(
  deal: Omit<Deal, "id" | "created_at" | "updated_at">
): Deal {
  const stmt = db.prepare(`
    INSERT INTO deals (account_id, start_date, end_date, value, status)
    VALUES (?, ?, ?, ?, ?)
    RETURNING *;
  `);

  const { account_id, start_date, end_date, value, status } = deal;
  return stmt.get(account_id, start_date, end_date, value, status) as Deal;
}
