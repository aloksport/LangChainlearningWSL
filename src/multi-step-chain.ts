import { ChatOllama } from "@langchain/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const model = new ChatOllama({
    model: "qwen3:4b",
    baseUrl: "http://localhost:11434",
    temperature: 0,
});

// Step 1: Generate explanation
const explanationPrompt = ChatPromptTemplate.fromTemplate(
    "Explain {topic} in simple words with a practical example."
);

const explanationChain = explanationPrompt.pipe(model);

// Step 2: Summarize explanation
const summaryPrompt = ChatPromptTemplate.fromTemplate(
    "Summarize the following explanation in exactly 3 bullet points:\n\n{explanation}"
);

const summaryChain = summaryPrompt.pipe(model);

async function main(): Promise<void> {
    const explanation = await explanationChain.invoke({
        topic: "Docker",
    });

    console.log("\nOriginal Explanation:\n");
    console.log(explanation.content);

    const summary = await summaryChain.invoke({
        explanation: explanation.content,
    });

    console.log("\nFinal Summary:\n");
    console.log(summary.content);
}

main().catch(console.error);