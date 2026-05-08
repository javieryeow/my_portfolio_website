import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { portfolio } from "./data/portfolio.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === "production";
const isVercel = process.env.VERCEL === "1";
const isDirectRun = process.argv[1] === __filename;

const DEFAULT_ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

function getAllowedOrigins() {
  const configuredOrigins = process.env.CORS_ALLOWED_ORIGINS;
  if (!configuredOrigins) {
    return "*";
  }

  return configuredOrigins
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function applyCors(request, response, next) {
  const requestOrigin = request.headers.origin;
  const allowedOrigins = getAllowedOrigins();

  if (allowedOrigins === "*") {
    response.setHeader("Access-Control-Allow-Origin", "*");
  } else if (requestOrigin && allowedOrigins.includes(requestOrigin)) {
    response.setHeader("Access-Control-Allow-Origin", requestOrigin);
  }

  response.setHeader("Vary", "Origin");
  response.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");

  if (request.method === "OPTIONS") {
    response.status(204).end();
    return;
  }

  next();
}

const app = express();

app.use(applyCors);

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.get("/api/portfolio", (_request, response) => {
  response.json(portfolio);
});

if (isProduction) {
  const distPath = path.resolve(__dirname, "../dist");
  app.use(express.static(distPath));
  app.get("/{*splat}", (_request, response) => {
    response.sendFile(path.join(distPath, "index.html"));
  });
}

if (!isVercel && isDirectRun) {
  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}

export default app;
