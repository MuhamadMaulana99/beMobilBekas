import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { logger } from "./app/logging.js";
import { publicRouter } from "./router/public-router.js";
import { privateRouter } from "./router/private-router.js";
import { errorMiddleware } from "./middleware/err-middleware.js";

const app = express();
dotenv.config();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());

app.use("/", publicRouter);
app.use("/api", privateRouter);

app.use(errorMiddleware);

app.use("*", function (req, res) {
  res.status(404).send("URL tidak ditemukan");
});

app.listen(process.env.PORT, () => {
  logger.info("listen port " + process.env.PORT);
});
