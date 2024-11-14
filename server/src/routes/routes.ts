import express from "express";
import { createProject, getProjectById, getMembersByProjectId } from "../controllers/projectController";

const router = express.Router();

router.post("/project", createProject);
router.get("/project/:projectId", getProjectById);
router.get("/project/:projectId/members", getMembersByProjectId);

export default router;
