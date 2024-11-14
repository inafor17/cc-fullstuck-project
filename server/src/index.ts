// src/index.ts
import express, { Request, Response } from "express";
import router from "./routes/routes";
const morgan = require("morgan");

const app = express();
const PORT = 5000;

// ミドルウェア
app.use(express.json());
app.use(morgan("dev"));

app.use("/", router);

export default app;

// サーバーの起動
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
