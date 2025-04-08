import { Router, Request, Response } from "express";
import db from "../db";

interface Deal {
  id: number;
  name: string;
  value: number;
  status: string;
  start_date: string;
  account_id: number;
  account_name: string;
}

const controller = Router();

controller.get("/api/deals", (req, res) => {
  const { status, year, orgId } = req.query;

  if (!orgId) {
    res.status(400).json({ error: "orgId query parameter is required" });
    return;
  }

  let query = `
    SELECT 
      deals.*, 
      accounts.name as account_name 
    FROM deals
    JOIN accounts ON deals.account_id = accounts.id
    JOIN organizations ON accounts.organization_id = organizations.id
    WHERE organizations.id = ?
  `;

  const conditions: string[] = [];
  const params: any[] = [orgId];

  if (status) {
    conditions.push("status = ?");
    params.push(status);
  }

  if (year) {
    conditions.push("strftime('%Y', start_date) = ?");
    params.push(year);
  }

  if (conditions.length > 0) {
    query += " AND " + conditions.join(" AND ");
  }

  const deals = db.prepare(query).all(...params) as Deal[];
  const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0);

  res.json({
    deals,
    totalValue,
  });
});

export default controller;
