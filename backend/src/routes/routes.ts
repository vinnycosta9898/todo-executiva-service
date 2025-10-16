import express from "express";
import { register } from "../http/users/register";
import { authenticate } from "../http/users/authenticate";
import { getUserProfile } from "../http/users/get-user-profile";

const router = express.Router();

export const corsOptions = {
	origin: "http://localhost:5173", // seu frontend
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization"],
};

router.post("/register", register)
router.post("/authenticate", authenticate)
router.get("/me", getUserProfile)


export { router };
