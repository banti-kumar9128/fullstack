import express from "express";
import dotenv from "dotenv";
import router from "../routes/Route.js";
import { connecDB } from "../db/db.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

// connect DB
connecDB();

// ❌ REMOVE app.listen()
// ✅ EXPORT app
export default app;
