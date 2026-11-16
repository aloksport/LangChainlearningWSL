import { ChatOllama } from "@langchain/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableParallel } from "@langchain/core/runnables";
import { RunnableLambda } from "@langchain/core/runnables";

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

const reportChain = parallelChain.pipe(
    RunnableLambda.from((result) => {
        return `
PRODUCT REPORT

DESCRIPTION:
${result.description.content}

ADVANTAGES:
${result.advantages.content}

DISADVANTAGES:
${result.disadvantages.content}
`;
    })
);

async function main(): Promise<void> {
    const report = await reportChain.invoke({
        product: "Laptop",
    });

    console.log(report);
}

main().catch(console.error);