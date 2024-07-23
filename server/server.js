import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import { connectDB } from "./config/db.js";
import usersRoutes from "./routes/usersRoute.js";
import bodyParser from "body-parser";
// import cookieParser from "cookie-parser";

const app = express();

/**dot env file configuration */
dotenv.config();
const PORT = process.env.PORT;

/**db config */
connectDB();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

/**cors config */
app.use(cors());
// app.use(cookieParser());

/**home api for testing*/
app.get("/", (req, res) => {
    return res.status(200).json({
        status: true,
        message: "API IS RUNNING SUCCESSFULLY..."
    });
});

/**import the sub router  */
app.use("/auth", usersRoutes);


app.listen(PORT, () => {
    console.log(`SERVER STARTED`.bold.yellow);
})