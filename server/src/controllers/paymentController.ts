import { Request, Response } from "express";
import { addPayment, Payment } from "../models/paymentModel";
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
