import db from "../db";

export interface PaymentPayee {
  id?: number;
  paymentId: number;
  payeeId: number;
}

export const addPaymentPayeeList = async (paymentPayeeList: PaymentPayee[]) => {
  await db("PAYMENT_PAYEE").insert(paymentPayeeList);
};
