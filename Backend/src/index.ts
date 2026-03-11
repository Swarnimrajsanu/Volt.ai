import * as dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

// Create an OpenAI instance mapped to OpenRouter
const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY, // Make sure to add this to your .env file
    // OpenRouter requires standard headers for ranking and features
    defaultHeaders: {
        "HTTP-Referer": process.env.VITE_URL || "http://localhost:3000", // Optional, mapped to your site
        "X-Title": "Volt.ai", // Optional, your site name
    }
});

async function main() {
    try {
        const completion = await openai.chat.completions.create({
            model: "anthropic/claude-4.5-opus",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: "What is ai" }
            ],
        });

        console.log("Response:", completion.choices[0]?.message?.content);
    } catch (error) {
        console.error("Error communicating with OpenRouter:", error);
    }
}

main();
