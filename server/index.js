import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { portfolio } from "./data/portfolio.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === "production";

app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.get("/api/portfolio", (_request, response) => {
  response.json(portfolio);
});

app.post("/api/contact", (request, response) => {
  const { name, email, message } = request.body ?? {};

  if (!name || !email || !message) {
    response.status(400).json({ message: "Name, email, and message are required." });
    return;
  }

  response.json({
    message: `Thanks ${name}, your message has been received.`
  });
});

if (isProduction) {
  const distPath = path.resolve(__dirname, "../dist");
  app.use(express.static(distPath));
  app.get("/{*splat}", (_request, response) => {
    response.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
