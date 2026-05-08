import express from "express";
import cors from "cors";
import { fileURLToPath } from "node:url";
import { portfolio } from "./data/portfolio.js";

const port = process.env.PORT || 3001;
const isVercel = process.env.VERCEL === "1";
const currentFilePath = fileURLToPath(import.meta.url);
const isDirectRun = process.argv[1] === currentFilePath;


const app = express();
const apiRouter = express.Router();

app.use(cors());
app.use(express.json());

apiRouter.get("/health", (_request, response) => {
  response.json({ status: "ok" });
});

apiRouter.get("/portfolio", (_request, response) => {
  response.json(portfolio);
});

app.use("/api", apiRouter);

if (!isVercel && isDirectRun) {
  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}

export default app;
