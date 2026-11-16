import { ChatOllama } from "@langchain/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableParallel } from "@langchain/core/runnables";

const model = new ChatOllama({
    model: "qwen3:4b",
    baseUrl: "http://localhost:11434",
    temperature: 0,
});

// Task A: Product description
const descriptionPrompt = ChatPromptTemplate.fromTemplate(
    "Write a short product description for {product}."
);

// Task B: Product advantages
const advantagesPrompt = ChatPromptTemplate.fromTemplate(
    "List exactly 3 advantages of {product}."
);

// Task C: Product disadvantages
const disadvantagesPrompt = ChatPromptTemplate.fromTemplate(
    "List exactly 3 disadvantages of {product}."
);

// Connect all three tasks in parallel
const parallelChain = RunnableParallel.from({
    description: descriptionPrompt.pipe(model),
    advantages: advantagesPrompt.pipe(model),
    disadvantages: disadvantagesPrompt.pipe(model),
});

async function main(): Promise<void> {
    const result = await parallelChain.invoke({
        product: "Laptop",
    });

    console.log("\nPRODUCT DESCRIPTION:\n");
    console.log(result.description.content);

    console.log("\nPRODUCT ADVANTAGES:\n");
    console.log(result.advantages.content);

    console.log("\nPRODUCT DISADVANTAGES:\n");
    console.log(result.disadvantages.content);
}

main().catch(console.error);