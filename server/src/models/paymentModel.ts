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

export const getPaymentsByProjectId = async (projectId: String) => {
  try {
    const payments = await db("PAYMENT")
      .join("MEMBER", "PAYMENT.payerId", "MEMBER.id")
      .join("PROJECT", "MEMBER.projectId", "PROJECT.id")
      .where("PROJECT.id", projectId)
      .select(
        "PAYMENT.id as paymentId",
        "PAYMENT.payerId",
        "PAYMENT.amount",
        "PAYMENT.description",
        "PAYMENT.timestamp"
      );

    // 支払われた人のIDを取得
    const paymentDetails = await Promise.all(
      payments.map(async (payment) => {
        const payees = await db("PAYMENT_PAYEE").where("paymentId", payment.paymentId).select("payeeId");

        return {
          ...payment,
          payeeIds: payees.map((p) => p.payeeId),
        };
      })
    );

    return paymentDetails;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch payments");
  }
};

export const getPaymentById = async (paymentId: number): Promise<Payment | null> => {
  try {
    const payment = await db("PAYMENT")
      .where({ id: paymentId })
      .select("id as paymentId", "payerId", "amount", "description", "timestamp")
      .first();

    if (!payment) {
      return null;
    }

    const payees = await db("PAYMENT_PAYEE").where("paymentId", paymentId).select("payeeId");

    return {
      ...payment,
      payeeIds: payees.map((p) => p.payeeId),
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch payment");
  }
};
