import { Request, Response } from "express";
import { updateMember } from "../models/memberModel";

export const updateMemberTiltWeight = async (req: Request, res: Response) => {
  const { memberId } = req.params; // エンドポイントのID
  type Body = {
    tiltWeight: number;
  };

  const body: Body = req.body;

  // 更新処理
  await updateMember(memberId, body.tiltWeight);
  res.status(200).json({ message: "User updated successfully" });
};
