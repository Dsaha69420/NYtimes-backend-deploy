import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const apiKey = process.env.NY_TIMES_API_KEY;

const allowedOrigins = [
  "http://localhost:3000", // Localhost for development
  "https://nytimes-backend-deploy.onrender.com", // Replace with the actual link
  "https://nytimes-frontend-deploy.onrender.com" // Replace with the actual React app link
];

app.use(cors({ origin: allowedOrigins }));

app.get("/api/articles", async (req, res) => {
  console.log(apiKey);
  const { query } = req.query;
  console.log(req.query.q);
  const apiUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${req.query.q}&api-key=${apiKey}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  res.json(data);
});

app.listen(5000, () => console.log("Server running on 5000"));
