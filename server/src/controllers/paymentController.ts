import { Request, Response } from "express";
import { addPayment, getPaymentById, getPaymentsByProjectId, Payment } from "../models/paymentModel";
import { addPaymentPayeeList, PaymentPayee } from "../models/paymentPayeeModel";

export const createPayment = async (req: Request, res: Response) => {
  type Body = {
    payerId: number;
    payeeIds: number[];
    amount: number;
    description: string;
  };
  const body: Body = req.body;

  const payment: Payment = {
    payerId: body.payerId,
    amount: body.amount,
    description: body.description,
  };

  const paymentId = await addPayment(payment);

  const paymentPayeeList: PaymentPayee[] = body.payeeIds.map((payeeId) => ({
    paymentId,
    payeeId,
  })) as PaymentPayee[];

  await addPaymentPayeeList(paymentPayeeList);
  res.json({ paymentId });
  res.status(200).end();
};

export const getPaymentsByProjectIdController = async (req: Request, res: Response) => {
  const projectId = req.params.projectId as string;

  try {
    const payments = await getPaymentsByProjectId(projectId);
    res.status(200).json({ payments });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch payments" });
  }
};

export const getPayment = async (req: Request, res: Response): Promise<void> => {
  const paymentId = parseInt(req.params.paymentId, 10);

  if (isNaN(paymentId)) {
    res.status(400).json({ error: "Invalid paymentId" });
    return;
  }

  try {
    const payment = await getPaymentById(paymentId);

    if (!payment) {
      res.status(404).json({ error: "Payment not found" });
      return;
    }

    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch payment" });
  }
};
