import { Pinecone } from '@pinecone-database/pinecone';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
  environment: process.env.PINECONE_ENV,
});

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

const INDEX_NAME = 'poc-v1';
// index = pinecone.GRPCIndex(INDEX_NAME);
const MODEL_NAME = 'text-embedding-ada-002';

export async function GET(req) {
  //   const embedding = await openai.embeddings.create({
  //     model: MODEL_NAME,
  //     input: 'The quick brown fox jumped over the lazy dog',
  //   });
  const embedding = 'hi';
  //   embedding.data[0].embedding;

  return NextResponse.json(embedding);
}
