import db from "../db";
import { Project } from "./projectModel";

export interface Member {
  name: string;
  projectId: Pick<Project, "id">;
}

export const addMembers = async (members: Member[]) => {
  await db("MEMBER").insert(members);
};
