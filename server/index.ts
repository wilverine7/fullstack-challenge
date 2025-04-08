import express from "express";
import cors from "cors";
import getOrganizations from "./controllers/getOrganizations";
import getDeals from "./controllers/getDeals";

const app = express();
const port = process.env.PORT || 3000;

/**
 * Welcome to the Fullstack Challenge for the Server!
 *
 * This is a basic express server.
 * You can customize and organize it to your needs.
 * Good luck!
 */

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(getOrganizations);
app.use(getDeals);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
