import express from "express";
import cors from 'cors'
import { corsOptions, router } from "./routes/routes";

const app = express();

app.use(cors(corsOptions))
app.use(express.json())
// app.options('*', cors(corsOptions))

app.use(router);

app.listen(3333, () => console.log("Server running on port 3333"))
