import { FilterType } from '@services/types/Filters';
import { PostSchema, PostType } from '@services/types/Posts';
import { queryOptions } from '@tanstack/react-query';
import Config from '@assets/pages/config.md';

type ReturnPostType =
  | {
      type: 'success';
      data: PostType[];
    }
  | { type: 'error'; data: ErrorPostType };

type ErrorPostType = {
  title: string;
  body: string;
};

const placeholderPost: ErrorPostType = {
  title: 'Não encontrado',
  body: 'Houve algum erro com sua pesquisa',
};
const GetPost = async (): Promise<ReturnPostType> => {
  const data = Config;
  console.log('data getpost: ', data);
  const validatedPost = PostSchema.array().safeParse(data);
  if (!validatedPost.success) {
    return { type: 'error', data: placeholderPost };
  }
  return { type: 'success', data: validatedPost.data };
};

export function PostByUserId(filter: FilterType) {
  return queryOptions({
    queryKey: ['posts', filter],
    queryFn: () => GetPost(),
  });
}
