import db from "../db";

export interface Payment {
  id?: number;
  payerId: number;
  amount: number;
  description: string;
  timestamp?: Date;
}

export const addPayment = async (payment: Payment) => {
  const result = await db<Payment>("PAYMENT").insert(payment).returning("id");
  return result[0].id;
};
