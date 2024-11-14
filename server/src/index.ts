// src/index.ts
import express, { Request, Response } from "express";

const app = express();
const PORT = 5000;

// ミドルウェア
app.use(express.json());

// ルート
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

// サーバーの起動
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
