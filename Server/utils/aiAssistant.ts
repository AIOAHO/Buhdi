// aiAssistant.ts
import OpenAI from "openai";
import User from "../models/user";
import assistantPrompt from "../prompts/assistantPrompt";



const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });



export async function createOpenAIAssistant(userId: string) {
 try {
    const assistant = await openai.beta.assistants.create({
      instructions: assistantPrompt,
      name: userId,
      model: "gpt-3.5-turbo",
    });

    // Save the assistant ID to the user's record in the database
    const user = await User.findById(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found.`);
    }
    user.assistantId = assistant.id;
    await user.save();

    return assistant.id;
 } catch (error) {
    console.error("Error creating OpenAI Assistant:", error);
    throw error;
 }
}

