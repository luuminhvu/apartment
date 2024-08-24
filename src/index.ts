import express, { Request, Response } from "express";

import swaggerUi from "swagger-ui-express";
import auth from "./routers/auth";
import user from "./routers/user";
import apartment from "./routers/apartment";
import cors from "cors";
import bodyParser from "body-parser";
import("./database/connect");
declare module "swagger-jsdoc";
declare module "swagger-ui-express";
import swaggerDocs from "./swaggerConfig";
const app = express();
const port = 3000;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use("/auth", auth);
app.use("/user", user);
app.use("/apartment", apartment);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
export default app;
