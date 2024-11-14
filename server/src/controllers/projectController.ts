import { Request, Response } from "express";
import { addMembers, Member } from "../models/memberModel";
import { addProject, Project } from "../models/projectModel";

const { ulid } = require("ulid");

export const createProject = async (req: Request, res: Response) => {
  type Body = {
    projectName: string;
    members: string[];
  };
  const body: Body = req.body;

  const project: Project = {
    id: ulid(),
    name: body.projectName,
  };
  const projectId = await addProject(project);

  const members: Member[] = body.members.map((member) => ({
    name: member,
    projectId: projectId,
  }));
  await addMembers(members);

  res.json({ projectId });
  res.status(200).end();
};
