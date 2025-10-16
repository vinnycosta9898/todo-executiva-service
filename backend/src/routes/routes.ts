import express from "express";
import { register } from "../http/controllers/users/register";
import { authenticate } from "../http/controllers/users/authenticate";
import { getUserProfile } from "../http/controllers/users/get-user-profile";
import { isAuthenticated } from "../http/middlewares/is-authenticated";

const router = express.Router();

export const corsOptions = {
	origin: "http://localhost:5173", // seu frontend
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization"],
};

// User routes 

router.post("/register", register)
router.post("/authenticate", authenticate)
router.get("/me", isAuthenticated, getUserProfile)


export { router };
