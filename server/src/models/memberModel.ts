import db from "../db";
import { Project } from "./projectModel";
import { Knex } from "knex";

export interface Member {
  id?: string;
  name: string;
  projectId: string;
}

export const addMembers = async (members: Member[]) => {
  await db("MEMBER").insert(members);
};

export const findMembersByProjectId = async (projectId: string) => {
  const members = await db<Member>("MEMBER").where({ projectId }).select();
  return members;
};
