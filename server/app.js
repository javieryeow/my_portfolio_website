import express from "express";
import { portfolio } from "./data/portfolio.js";

const DEFAULT_ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

function getAllowedOrigins() {
  const configuredOrigins = process.env.CORS_ALLOWED_ORIGINS;
  if (!configuredOrigins) {
    return DEFAULT_ALLOWED_ORIGINS;
  }

  return configuredOrigins
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function applyCors(request, response, next) {
  const requestOrigin = request.headers.origin;
  const allowedOrigins = getAllowedOrigins();

  if (requestOrigin && allowedOrigins.includes(requestOrigin)) {
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

export default app;
