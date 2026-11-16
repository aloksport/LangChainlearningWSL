import { ChatOllama } from "@langchain/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const model = new ChatOllama({
    model: "qwen3:4b",
    baseUrl: "http://localhost:11434",
    temperature: 0,
});

const prompt = ChatPromptTemplate.fromTemplate(
    "Explain {topic} in simple words with one practical example."
);

// Connect prompt and model
const chain = prompt.pipe(model);

async function main(): Promise<void> {
    const topics = [
        "Docker",
        "Kubernetes",
        "LangChain"
    ];

    for (const topic of topics) {
        console.log(`\n========== ${topic} ==========\n`);

        const response = await chain.invoke({ topic });

        console.log(response.content);
    }
}

main().catch(console.error);