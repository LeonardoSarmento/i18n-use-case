import { Button } from './ui/button';
import { cn } from '@lib/utils';
import { useTranslation } from 'react-i18next';
import { ThumbsUp } from 'lucide-react';

export function PortfolioNav({ className }: { className?: string }) {
  const { t } = useTranslation('NavigationBar');
  return (
    <Button className={cn('', className)} asChild variant="ghost">
      <a href="https://leosarmento.com" target="_blank" rel="noopener noreferrer" className="gap-2">
        <p>{t('portfolio')}</p>
        <ThumbsUp color="#2de139" />
      </a>
    </Button>
  );
}
