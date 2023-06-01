import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import path from 'path'
import route from './routes/routes.js'

const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function runCompletion() {
    const completion = await openai.createCompletion({
        model: "gpt-3.5-turbo-0301'",
        prompt: "How are you today?",
    });
    console.log(completion.data.choices[0].text);
}

runCompletion();


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
dotenv.config()

app.use((express.json({ limit: "30mb", extended: true })))
app.use((express.urlencoded({ limit: "30mb", extended: true })))
app.use((cors()))
app.use(express.static(path.join(__dirname, 'public')))
app.enable('trust proxy')

// User Routes
app.use('/', route)

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

const PORT = process.env.PORT
console.log("SERVER PORT : " + PORT);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
});

