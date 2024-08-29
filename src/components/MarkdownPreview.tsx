import MarkdownPreview from '@uiw/react-markdown-preview';
import { cn } from '@lib/utils';
import { useTheme } from '@services/providers/Theme-provider';

type TMarkdownComponent = { source: string; className?: string };

export default function MarkdownComponent({ source, className }: TMarkdownComponent) {
  const { theme } = useTheme();
  return (
    <MarkdownPreview
      source={source}
      className={cn('rounded-md p-4 xl:px-6', className)}
      wrapperElement={{
        'data-color-mode':
          theme === 'system' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : theme,
      }}
    />
  );
}
