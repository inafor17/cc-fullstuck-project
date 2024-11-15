import { Request, Response } from "express";
import { addPayment, getPaymentsByProjectId, Payment } from "../models/paymentModel";
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

export const getProjectsByProjectId = async (req: Request, res: Response) => {
  const projectId = req.params.projectId as string;

  try {
    const payments = await getPaymentsByProjectId(projectId);
    res.status(200).json({ payments });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch payments" });
  }
};
