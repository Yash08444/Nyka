import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { messages, system } = await req.json();

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    {
                        role: "system",
                        content: system || "You are a luxury fashion AI assistant for Nykaa Fashion. You are knowledgeable, eloquent, and concise. Keep responses short (2-3 sentences max) but intelligent and helpful."
                    },
                    ...messages
                ],
                max_tokens: 300,
                temperature: 0.7,
            }),
        });

        if (!response.ok) {
            const err = await response.text();
            return NextResponse.json({ error: err }, { status: response.status });
        }

        const data = await response.json();
        const text = data.choices?.[0]?.message?.content || "I'm unable to respond right now.";
        return NextResponse.json({ text });
    } catch (error) {
        console.error("Groq API error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
