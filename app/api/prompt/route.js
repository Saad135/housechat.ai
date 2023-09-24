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
await pinecone.listIndexes();
// IMPORTANT! Set the runtime to edge
// export const runtime = 'edge';

const INDEX_NAME = 'poc-v2';
const MODEL_NAME = 'text-embedding-ada-002';

const MAX_SECTION_LEN = 5000;
const SEPARATOR = '\n* ';
const SEPARATOR_LEN = 3;
const OPENAI_MODEL_ENGINE = 'gpt-3.5-turbo';

const convertMetadataToContext = (metadata) => {
  let context = [];

  for (let key in metadata) {
    context.push(key + ': ' + metadata[key] + '\n');
  }

  return context.join('') + '\n';
};

const constructPrompt = (question, properties) => {
  const chosen_sections = [];
  let chosen_sections_len = 0;
  const chosen_sections_indexes = [];

  properties.forEach((property) => {
    chosen_sections_len += property.length + SEPARATOR_LEN;

    if (chosen_sections_len > MAX_SECTION_LEN) {
      return;
    }

    chosen_sections.push(SEPARATOR + property);
  });

  const header =
    "Answer the question as truthfully as possible using the provided context, and if the answer is not contained within the text below, say 'Sorry, I can't seem to find anything.'\n\nContext:\n";

  return header + chosen_sections.join('') + '\n\n Q: ' + question + '\n A:';
};

export async function POST(req) {
  // Extract the `question` from the body of the request
  const { question } = await req.json();

  const index = pinecone.index(INDEX_NAME);
  const properties = [];
  const metadataList = [];

  const embeddingResponse = await openai.embeddings.create({
    model: MODEL_NAME,
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
    properties.push(convertMetadataToContext(entry.metadata));
  });

  // Extract the property list from the pinecone response as an object
  queryResponse.matches.forEach((entry) => {
    metadataList.push(entry.metadata);
  });

  const prompt = constructPrompt(question, properties);

  return NextResponse.json({
    prompt: prompt,
    properties: metadataList,
  });
}
