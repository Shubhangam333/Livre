import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import authRoutes from "./routes/auth";
import usersRoutes from "./routes/users";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import { errorMiddleware } from "./middleware/error";

dotenv.config();

const app = express();
const port = process.env.PORT;

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:4173",
    process.env.FRONTEND_URL || "",
  ],
};
app.use(cors(corsOptions));
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(morgan("dev"));
app.use(express.static("src/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
