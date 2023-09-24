const MAX_SECTION_LEN = 5000;
const SEPARATOR = '\n* ';
const SEPARATOR_LEN = 3;

export const convertPropertyToContext = (property) => {
  let context = [];

  for (let key in property) {
    context.push(key + ': ' + property[key] + '\n');
  }

  return context.join('') + '\n';
};

export const constructPrompt = (question, contextList) => {
  const chosen_sections = [];
  let chosen_sections_len = 0;
  const chosen_sections_indexes = [];

  contextList.forEach((context) => {
    chosen_sections_len += context.length + SEPARATOR_LEN;

    if (chosen_sections_len > MAX_SECTION_LEN) {
      return;
    }

    chosen_sections.push(SEPARATOR + context);
  });

  const header =
    "Answer the question as truthfully as possible using the provided context, and if the answer is not contained within the text below, say 'Sorry, I can't seem to find anything.'\n\nContext:\n";

  return header + chosen_sections.join('') + '\n\n Q: ' + question + '\n A:';
};
