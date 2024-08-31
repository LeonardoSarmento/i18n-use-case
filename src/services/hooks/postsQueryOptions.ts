import { queryOptions } from '@tanstack/react-query';

export const postsQueryOptions = (language: string, content: { en: string; ptBR: string }) => {
  return queryOptions({
    queryKey: ['posts', { language }, content],
    queryFn: () => fetchPosts(language, content),
  });
};

export const fetchPosts = async (language: string, content: { en: string; ptBR: string }) => {
  console.log('Fetching posts...');
  // await new Promise((r) => setTimeout(r, 500));
  const posts = language === 'pt-BR' ? content.ptBR : content.en;
  return posts;
};
