'use server';

/**
 * @fileOverview A Genkit flow for intelligent component search using natural language.
 *
 * - intelligentComponentSearch - A function that handles the component search process.
 * - IntelligentComponentSearchInput - The input type for the intelligentComponentSearch function.
 * - IntelligentComponentSearchOutput - The return type for the intelligentComponentSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntelligentComponentSearchInputSchema = z.object({
  framework: z.enum(['Bootstrap', 'Webpack', 'JQuery']).describe('The name of the framework to search within.'),
  query: z.string().describe('The natural language search query for components.'),
});
export type IntelligentComponentSearchInput = z.infer<typeof IntelligentComponentSearchInputSchema>;

const ComponentInfoSchema = z.object({
  name: z.string().describe('The name of the component.'),
  description: z.string().describe('A brief description of the component.'),
  documentationLink: z.string().url().describe('A link to the component documentation.'),
});

const IntelligentComponentSearchOutputSchema = z.array(ComponentInfoSchema);
export type IntelligentComponentSearchOutput = z.infer<typeof IntelligentComponentSearchOutputSchema>;

export async function intelligentComponentSearch(input: IntelligentComponentSearchInput): Promise<IntelligentComponentSearchOutput> {
  return intelligentComponentSearchFlow(input);
}

const getComponentInfo = ai.defineTool({
  name: 'getComponentInfo',
  description: 'Retrieves information about components in a specific framework based on a user query.',
  inputSchema: z.object({
    framework: z.enum(['Bootstrap', 'Webpack', 'JQuery']).describe('The framework to search within.'),
    query: z.string().describe('The user search query.'),
  }),
  outputSchema: z.array(ComponentInfoSchema),
}, async (input) => {
  // TODO: Implement the actual component information retrieval logic here.
  // This is a placeholder; replace with actual data fetching or component lookup.
  console.log(`Searching for component in ${input.framework} with query: ${input.query}`);
  return [
    {
      name: 'Sample Component 1',
      description: 'A sample component for testing purposes.',
      documentationLink: 'https://example.com/component1',
    },
    {
      name: 'Sample Component 2',
      description: 'Another sample component for testing purposes.',
      documentationLink: 'https://example.com/component2',
    },
  ];
});

const prompt = ai.definePrompt({
  name: 'intelligentComponentSearchPrompt',
  tools: [getComponentInfo],
  input: {schema: IntelligentComponentSearchInputSchema},
  output: {schema: IntelligentComponentSearchOutputSchema},
  prompt: `You are a component search assistant. Use the getComponentInfo tool to find components that match the user's query for the specified framework. Return the component information directly.\n\nFramework: {{{framework}}}\nQuery: {{{query}}}`, // Removed unnecessary backticks and added explicit type annotations
});

const intelligentComponentSearchFlow = ai.defineFlow(
  {
    name: 'intelligentComponentSearchFlow',
    inputSchema: IntelligentComponentSearchInputSchema,
    outputSchema: IntelligentComponentSearchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
