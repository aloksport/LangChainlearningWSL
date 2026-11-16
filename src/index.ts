const OLLAMA_URL = "http://localhost:11434/api/generate";

async function askOllama(prompt: string): Promise<string> {
    const response = await fetch(OLLAMA_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "qwen3:4b",
            prompt,
            stream: false,
        }),
    });

    if (!response.ok) {
        throw new Error(`Ollama API error: ${response.status}`);
    }

    const data: { response: string } = await response.json();

    return data.response;
}

async function main(): Promise<void> {
    const answer = await askOllama(
        "Explain LangChain.js in three simple sentences."
    );

    console.log("\nAI Response:\n");
    console.log(answer);
}

main().catch(console.error);