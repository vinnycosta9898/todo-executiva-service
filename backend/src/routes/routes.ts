import express from "express";
import { register } from "../http/controllers/users/register";
import { authenticate } from "../http/controllers/users/authenticate";
import { getUserProfile } from "../http/controllers/users/get-user-profile";
import { isAuthenticated } from "../http/middlewares/is-authenticated";
import { createTask } from "../http/controllers/tasks/create-task";
import { listTasksByUser } from "../http/controllers/tasks/list-tasks";
import { deleteTask } from "../http/controllers/tasks/delete-task";
import { updatedTask } from "../http/controllers/tasks/update-tasks";

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

// Tasks routes

router.post("/create-task", isAuthenticated, createTask)
router.delete("/delete-task", isAuthenticated, deleteTask)	
router.get("/list-task-by-user/", isAuthenticated, listTasksByUser)
router.put("/update-task-by-user", isAuthenticated, updatedTask)




export { router };
