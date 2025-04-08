import { Router } from "express";
import db from "../db";

const controller = Router();

controller.get("/", (req, res) => {
  const rows = db.prepare("SELECT * FROM organizations").all();
  res.json(rows);
});

export default controller;
