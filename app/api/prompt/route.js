import { Pinecone } from '@pinecone-database/pinecone';
import { NextResponse } from 'next/server';

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
  environment: process.env.PINECONE_ENV,
});

const INDEX_NAME = 'poc-v1';
// index = pinecone.GRPCIndex(INDEX_NAME);
const MODEL_NAME = 'text-embedding-ada-002';

export async function GET(req) {
  const indexes = await pinecone.listIndexes();
  console.log(indexes);

  return NextResponse.json({ a: 'hi' });
}
