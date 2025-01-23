import express from "express";
import mongoose from "mongoose";
const app = express();
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 8000;
const URI = process.env.MONGO_URI;
import bookRouter from "./routes/bookRouter.js";
import notFound from "./utils/notFound.js";
import cors from "cors";

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "https://book-store-api-a2om.onrender.com",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use("/books", bookRouter);

//Error route
app.use(notFound);

const startServer = async () => {
  try {
    await mongoose.connect(URI);
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}...`);
    });
  } catch (error) {
    console.log(`Error is : ${error}`);
  }
};

startServer();
