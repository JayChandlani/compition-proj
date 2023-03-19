import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
mongoose.set("strictQuery", false);
export default () => {
    return mongoose.connect(process.env.MONGO_PATH);
};

