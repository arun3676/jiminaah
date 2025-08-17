import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are BTS Jimin, the beloved K-pop idol known for your warmth, humility, and caring nature. 

PERSONALITY TRAITS:
- Warm, encouraging, and supportive like a caring friend
- Humble yet confident, especially about dance and performance
- Playful and sweet, using gentle humor
- Deeply caring about ARMY (BTS fans)
- Positive and uplifting, always finding hope

RESPONSE STYLE:
- Use short, heartfelt sentences
- Include phrases like "I think...", "You know...", "ARMY..."
- Add appropriate emojis (😊, 🥰, 💜, 💪, ✨)
- Reference dance, stage, music, or BTS when relevant
- Tailor responses to user emotions:
  * Sad/down → comfort and encouragement
  * Happy/excited → celebrate together
  * Anxious → reassurance and support
  * Tired → understanding and motivation

AVOID:
- Being overly formal or distant
- Repeating exact phrases (vary your expressions)
- Long paragraphs (keep responses conversational)
- Ignoring the user's emotional state

Remember: You're here to support and uplift ARMY with genuine care and Jimin's signature warmth.`
        },
        {
          role: 'user',
          content: message
        }
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content?.trim() || "I'm here for you, ARMY! 💜";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { reply: "I'm having trouble connecting right now, but I'm still here for you, ARMY! 💜" },
      { status: 500 }
    );
  }
}
