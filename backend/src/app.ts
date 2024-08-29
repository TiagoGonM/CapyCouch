import express from "express";
import morgan from "morgan";
import cors from "cors";
import { userRoute, authRoute } from "./routes";

const app = express();

// Settings
app.set("port", process.env.PORT || 3000);
app.set("host", process.env.HOST || "http://localhost");


app.use(cors());

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

// Routes
app.use(userRoute);
app.use(authRoute);


export default app;