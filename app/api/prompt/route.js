import { Pinecone } from '@pinecone-database/pinecone';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { constructPrompt, convertPropertyToContext } from '@/utils/utils';

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
  environment: process.env.PINECONE_ENV,
});
await pinecone.listIndexes();
// IMPORTANT! Set the runtime to edge
// export const runtime = 'edge';

const INDEX_NAME = 'poc-v2';
const EMBEDDING_MODEL_NAME = 'text-embedding-ada-002';

export async function POST(req) {
  // Extract the `question` from the body of the request
  const { question } = await req.json();

  const index = pinecone.index(INDEX_NAME);
  const properties = [];
  const metadataList = [];

  const embeddingResponse = await openai.embeddings.create({
    model: EMBEDDING_MODEL_NAME,
    input: question,
  });
  // convert the query to embedding
  const embedding = embeddingResponse.data[0].embedding;

  // Get the response from pinecone based on the query embedding
  const queryResponse = await index.query({
    topK: 3,
    vector: embedding,
    includeMetadata: true,
  });

  // Extract the property list from the pinecone response as text
  queryResponse.matches.forEach((entry) => {
    properties.push(convertPropertyToContext(entry.metadata));
  });

  // Extract the property list from the pinecone response as an object
  queryResponse.matches.forEach((entry) => {
    metadataList.push(entry.metadata);
  });

  const prompt = constructPrompt(question, properties);

  return NextResponse.json({
    prompt: prompt,
    propertylist: metadataList,
  });
}
