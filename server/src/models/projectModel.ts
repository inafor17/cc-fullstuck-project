import db from "../db";

export interface Project {
  id: string;
  name: string;
}

export const addProject = async (project: Project) => {
  const result = await db<Project>("PROJECT").insert(project).returning("id");
  return result[0].id;
};
