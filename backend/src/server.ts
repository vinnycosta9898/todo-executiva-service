import express from "express";
import { router } from "./routes/routes";

const app = express();

app.use(router);

app.listen(Number(), () => {
    console.log(`🚀 Server running`)
})
