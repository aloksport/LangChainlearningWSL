import { ChatOllama } from "@langchain/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableLambda } from "@langchain/core/runnables";

const model = new ChatOllama({
    model: "qwen3:4b",
    baseUrl: "http://localhost:11434",
    temperature: 0,
});

const explanationPrompt = ChatPromptTemplate.fromTemplate(
    "Explain {topic} in simple words with a practical example."
);

const summaryPrompt = ChatPromptTemplate.fromTemplate(
    "Summarize this explanation in exactly 3 bullet points:\n\n{explanation}"
);

const explanationChain = explanationPrompt.pipe(model);
const summaryChain = summaryPrompt.pipe(model);

// Connect both chains
const transform = RunnableLambda.from((message) => ({
    explanation: message.content,
}));

const fullChain = explanationChain
    .pipe(transform)
    .pipe(summaryChain);

async function main(): Promise<void> {
    const result = await fullChain.invoke({
        topic: "Docker",
    });

    console.log("\nFinal Summary:\n");
    console.log(result.content);
}

main().catch(console.error);