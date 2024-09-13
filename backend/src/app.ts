import express from "express";
require("dotenv").config();
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import { userRoute, authRoute, suggestionRoute, groupRoute } from "./routes";

const app = express();

// Settings
app.set("host", process.env.HOST || "http://localhost");
app.set("port", process.env.PORT || 3000);

app.use(cors());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

// Routes
app.use(userRoute.default);
app.use(authRoute.default);
app.use(suggestionRoute.default);
app.use(groupRoute.default);

export default app;
