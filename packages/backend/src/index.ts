import express from "express";
import { config } from "dotenv";
import path from "node:path";

// the painful way of loading .env from another folder
config({ path: path.join(process.cwd(), "../../.env") });
const port = 3000;

const app = express();
app.use(express.json());

app.listen(port, function() {
    console.log("Listening on port", port);
});
