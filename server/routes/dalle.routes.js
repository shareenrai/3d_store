// dalle.routes.js
import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI, { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY 
});

const openai = new OpenAIApi(config);

router.route('/').get((req, res) => {
    res.status(200).json({ message: "Hello from DALL.E ROUTES" });
});

// Passing prompts
router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;
        
        const response = await openai.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json'
        });

        const image = response.data.data[0].b64_json;

        res.status(200).json({ photo: image });
     } catch(error) {
        console.error('OpenAI API Error:', error.response ? error.response.data : error.message);
        res.status(500).json({message:'Something went wrong'})
    }
}) 

export default router;
