import { useAuth } from '@services/hooks/auth';
import { Button } from './ui/button';
import { cn } from '@lib/utils';
import { useTranslation } from 'react-i18next';

export function Logout({ className }: { className?: string }) {
  const auth = useAuth();
  const { t } = useTranslation('login');
  return auth.isAuthenticated ? (
    <Button onClick={() => auth.logout()} className={cn('', className)}>
      {t('LogoutButton')}
    </Button>
  ) : null;
}
