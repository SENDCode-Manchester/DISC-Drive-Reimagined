import { GoogleGenerativeAI } from "@google/generative-ai";
import express from "express";
import { config } from "dotenv";
import path from "node:path";

// the painful way of loading .env from another folder
config({ path: path.join(process.cwd(), "../../.env") });

if (!process.env.GEMINI_API_KEY) {
    console.error("Missing GEMINI_API_KEY environment variable");
    process.exit(1);
}

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const port = 3000;

const model = genAi.getGenerativeModel({
    model: "gemini-2.0-flash"
});

const app = express();
app.use(express.json());

// preflight requests
app.options("/generateContent", function(_req, res) {
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).end();
});

app.post("/generateContent", async function(req, res) {
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Origin", "*");

    if (!req.body.prompt) {
        res.status(400).send("Missing prompt");
        return;
    }

    const result = await model.generateContent(req.body.prompt);

    res.json({
        text: result.response.text()
    });
});

app.listen(port, function() {
    console.log("Listening on port", port);
});
