import db from "../db";
import { Project } from "./projectModel";
import { Knex } from "knex";

export interface Member {
  id?: number;
  name: string;
  projectId: string;
  tiltWeight: number;
}

export const addMembers = async (members: Member[]) => {
  await db("MEMBER").insert(members);
};

export const findMembersByProjectId = async (projectId: string) => {
  const members = await db<Member>("MEMBER").where({ projectId }).select();
  return members;
};

export const updateMember = async (id: number, tiltWeight: number) => {
  await db<Member>("MEMBER").where({ id }).update({ tiltWeight });
};
