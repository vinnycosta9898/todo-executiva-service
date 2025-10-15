import express from "express";

const router = express.Router();

export const corsOptions = {
	origin: "http://localhost:5173", // seu frontend
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization"],
};

export { router };
