import express from "express";
import cors from "cors";
import { portfolio } from "./data/portfolio.js";

const port = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.get("/api/portfolio", (_request, response) => {
  response.json(portfolio);
});


app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});


export default app;
