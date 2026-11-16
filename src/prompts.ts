import { ChatOllama } from "@langchain/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const model = new ChatOllama({
    model: "qwen3:4b",
    baseUrl: "http://localhost:11434",
    temperature: 0,
});

const promptTemplate = ChatPromptTemplate.fromTemplate(
    "Explain {topic} in simple words with one practical example."
);

async function main(): Promise<void> {
    const formattedPrompt = await promptTemplate.format({
        topic: "Docker",
    });

    console.log("Formatted Prompt:");
    console.log(formattedPrompt);

    const response = await model.invoke(formattedPrompt);

    console.log("\nAI Response:");
    console.log(response.content);
}

main().catch(console.error);