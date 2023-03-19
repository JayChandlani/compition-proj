import express from 'express';
import connect from './config/db.js'
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { register } from './controller/complainRegister.js';
import dotenv from 'dotenv'
import cors from 'cors'
/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/register", upload.single("picture"), register);


const port = process.env.PORT || 3001;
app.listen(port, async () => {
    await connect();
    console.log(`Listening to port ${port}`);
});