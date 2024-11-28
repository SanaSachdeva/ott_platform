import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import databaseConnection from "./utils/database.js";
import userRouter from './routes/userRoute.js'
import cors from 'cors'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOptions))

//api
app.use("/api/v1/user",userRouter)


databaseConnection();

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
