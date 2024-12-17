import express from "express";
import db from "@repo/db/client";
import cors from "cors";
import dotenv from 'dotenv';

const app = express();

app.use(express.json())
dotenv.config({
    path: '.env'
});

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
));

import bankWebhook from './routes/webhook.route';
app.use('/api/v1', bankWebhook);

app.listen(3003, () => {
    console.log('Server is running on port 3003');
});

export default app; 