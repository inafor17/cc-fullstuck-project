import express from "express";
import { createProject, getProjectById, getMembersByProjectId } from "../controllers/projectController";
import { createPayment, getPayment, getPaymentsByProjectIdController } from "../controllers/paymentController";
import { updateMemberTiltWeight } from "../controllers/memberController";

const router = express.Router();

router.post("/project", createProject);
router.get("/project/:projectId", getProjectById);
router.get("/project/:projectId/members", getMembersByProjectId);

router.post("/payment", createPayment);

router.get("/project/:projectId/payments", getPaymentsByProjectIdController);

router.get("/payment/:paymentId", getPayment);

router.patch("/members/:memberId", updateMemberTiltWeight);

export default router;
