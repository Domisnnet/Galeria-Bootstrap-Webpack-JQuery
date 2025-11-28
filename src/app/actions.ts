'use server';

import { intelligentComponentSearch } from '@/ai/flows/intelligent-component-search';
import { z } from 'zod';

const SearchSchema = z.object({
  query: z.string().min(3, 'Search query must be at least 3 characters.'),
  framework: z.enum(['Bootstrap', 'Webpack', 'JQuery']),
});

export async function searchComponents(prevState: any, formData: FormData) {
  const rawFormData = {
    query: formData.get('query'),
    framework: formData.get('framework'),
  };
  
  const validatedFields = SearchSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      success: false,
      error: 'Invalid search query.',
      data: [],
    };
  }

  try {
    const results = await intelligentComponentSearch(validatedFields.data);

    const mappedResults = results.map((result, index) => ({
      ...result,
      id: `search-${index}-${result.name.replace(/\s+/g, '-')}`,
      imageId: 'search-result',
    }));

    return { success: true, data: mappedResults, error: null };
  } catch (error) {
    console.error('AI Search Error:', error);
    return {
      success: false,
      error: 'An error occurred during the search. Please try again.',
      data: [],
    };
  }
}
