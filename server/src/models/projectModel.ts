import db from "../db";

export interface Project {
  id: string;
  name: string;
}

export const addProject = async (project: Project) => {
  const [projectId] = await db<Project>("PROJECT").insert(project).returning("id");
  return projectId;
};
