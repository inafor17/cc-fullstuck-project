// src/index.ts
import express, { Request, Response } from "express";
import router from "./routes/routes";

const app = express();
const PORT = 5000;

// ミドルウェア
app.use(express.json());

app.use("/", router);

// サーバーの起動
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
