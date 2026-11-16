import { ChatOllama } from "@langchain/ollama";

const model = new ChatOllama({
    model: "qwen3:4b",
    baseUrl: "http://localhost:11434",
    temperature: 0,
});

async function main(): Promise<void> {
    const response = await model.invoke(
        "Hello"
    );

    console.log("\nLangChain AI Response:\n");
    console.dir(response, { depth: null }); 
}

main().catch(console.error);