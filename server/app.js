import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import todoRoutes from "./routes/todoRoutes.js"

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(todoRoutes);

const port = 3005;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
