import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "./Api";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)

export const askAi = async (prompt: string) => {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })
        const result = await model.generateContent(prompt)
        const response = result.response.text()
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}