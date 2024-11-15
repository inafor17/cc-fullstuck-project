// types/knex.d.ts
import "knex";

declare module "knex" {
  interface Project {
    id: string;
    name: string;
  }

  interface Member {
    id?: number;
    projectId: string;
    name: string;
  }

  interface Payment {
    id?: number;
    payerId: number;
    payeeId: number;
    amount: number;
    timestamp: Date;
    description: string;
  }

  interface Tables {
    PROJECT: Project;
    MEMBER: Member;
    PAYMENT: Payment;
  }
}
