// test/project.test.ts
import { expect } from "chai";
import request from "supertest";
import db from "../src/db";
const app = require("../src/index");

describe("POST /project", () => {
  afterEach(async () => {
    // テスト終了後、データベースをリセット
    await db("MEMBER").del();
    await db("PROJECT").del();
  });

  it("should create a project and add members", async () => {
    // テストデータ
    const projectData = {
      projectName: "Test Project",
      members: ["Alice", "Bob", "Charlie"],
    };

    // POSTリクエストを送信
    const res = await request(app).post("/project").send(projectData).expect(200);

    // レスポンスの検証
    expect(res.body).to.have.property("projectId");
    const projectId = res.body.projectId;

    // PROJECTテーブルに1行追加されたかを検証
    const project = await db("PROJECT").where({ id: projectId }).first();
    expect(project).to.not.be.undefined;
    expect(project.name).to.equal(projectData.projectName);

    // MEMBERテーブルにメンバーが追加されたかを検証
    const members = await db("MEMBER").where({ projectId });
    expect(members).to.have.lengthOf(projectData.members.length);
    projectData.members.forEach((memberName) => {
      expect(members.map((member) => member.name)).to.include(memberName);
    });
  });
});
