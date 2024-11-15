import express from "express";
import { createProject, getProjectById, getMembersByProjectId } from "../controllers/projectController";
import { createPayment, getProjectsByProjectId } from "../controllers/paymentController";

const router = express.Router();

router.post("/project", createProject);
router.get("/project/:projectId", getProjectById);
router.get("/project/:projectId/members", getMembersByProjectId);

router.post("/payment", createPayment);

router.get("/project/:projectId/payments", getProjectsByProjectId);

export default router;
