import { Request, Response } from "express";
import { addMembers, findMembersByProjectId, Member } from "../models/memberModel";
import { addProject, findProjectById, Project } from "../models/projectModel";

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
    tiltWeight: 1,
  })) as Member[];
  await addMembers(members);

  res.json({ projectId });
  res.status(200).end();
};

export const getProjectById = async (req: Request, res: Response) => {
  const projectId = req.params.projectId as string;
  try {
    const project = await findProjectById(projectId);
    if (project) {
      res.json({
        projectId: project.id,
        projectName: project.name,
      });
    } else {
      res.status(404).end();
    }
  } catch (error) {
    //TODO
  }
};

export const getMembersByProjectId = async (req: Request, res: Response) => {
  const projectId = req.params.projectId as string;
  try {
    const members = await findMembersByProjectId(projectId);
    if (members.length !== 0) {
      const resMembers = members.map((member) => ({
        memberId: member.id,
        memberName: member.name,
        tiltWeight: member.tiltWeight,
      }));
      res.json({
        members: resMembers,
      });
    }
  } catch (error) {
    //TODO
  }
};
