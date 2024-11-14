import express from "express";
import { createProject, getProjectById } from "../controllers/projectController";

const router = express.Router();

// return { projectId: プロジェクトのID }
router.post("/project", createProject);

// return { projectId: プロジェクトのID, projectName: プロジェクトの名前 }
router.get("/project/:projectId", getProjectById);

export default router;
