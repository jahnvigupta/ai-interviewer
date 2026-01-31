import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { problem, code, explanation } = body

    if (!problem || !code) {
      return NextResponse.json(
        { error: "Problem and code are required" },
        { status: 400 }
      )
    }

    const prompt = `getEvaluatorPrompt(problem, code, explanation)
You are a senior software engineer interviewing a candidate.

Problem:
${problem}

Candidate's Code:
${code}

Candidate's Explanation:
${explanation || "No explanation provided"}

Evaluate the candidate strictly.

Return your response in the following JSON format ONLY:
{
  "verdict": "Hire" | "No Hire",
  "score": number (0-10),
  "strengths": string[],
  "weaknesses": string[],
  "improvements": string[],
  "final_feedback": string
}
`

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a strict FAANG interviewer." },
        { role: "user", content: prompt },
      ],
      temperature: 0.2,
    })

    const responseText = completion.choices[0].message.content

    let parsedResult
    try {
      parsedResult = JSON.parse(responseText || "")
    } catch (e) {
      return NextResponse.json(
        { error: "Failed to parse AI response", raw: responseText },
        { status: 500 }
      )
    }

    return NextResponse.json(parsedResult)
  } catch (error: any) {
    console.error("Evaluation error:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

