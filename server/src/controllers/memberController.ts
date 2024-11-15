import { Request, Response } from "express";
import { updateMember } from "../models/memberModel";

export const updateMemberTiltWeight = async (req: Request, res: Response) => {
  const { id } = req.params; // エンドポイントのID
  type Body = {
    tiltWeight: number;
  };

  const body: Body = req.body;

  let intId;

  try {
    intId = parseInt(id);
  } catch (e) {
    console.error("Failed to parse slug");
  }

  // 更新処理
  await updateMember(intId!, body.tiltWeight);
  res.status(200).json({ message: "User updated successfully" });
};
