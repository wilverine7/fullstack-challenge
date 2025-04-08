import { Router } from "express";
import db from "../db";
import { Deal } from "../models/deal";

const controller = Router();

controller.get("/api/deals", (req, res) => {
  const rows = db.prepare("SELECT * FROM deals").all() as Deal[];
  const totalValue = rows.reduce((sum, deal) => sum + deal.value, 0);
  res.json({ deals: rows, totalValue }); // Send proper structured response
});

export default controller;
