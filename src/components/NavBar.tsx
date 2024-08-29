import { Link } from '@tanstack/react-router';
import { PortfolioNav } from './PortfolioNav';
import { ModeToggle } from './Mode-toggle';
import { SelectLanguage } from './SelectLanguage';
import { useTranslation } from 'react-i18next';

export function NavigationBar() {
  const { t } = useTranslation('NavigationBar');
  return (
    <div className="flex w-full flex-wrap-reverse items-center justify-center gap-4 xl:space-x-7 p-2 sm:my-2 md:flex-nowrap xl:justify-end xl:gap-2">
      <div className="flex w-full flex-wrap justify-around gap-3">
        <Link to="/" className="[&.active]:font-bold">
          {t('home')}
        </Link>
        <Link to="/config" className="[&.active]:font-bold">
          {t('config')}
        </Link>
        <Link to="/zod" className="[&.active]:font-bold">
          {t('zod')}
        </Link>
      </div>
      <div className="flex w-full justify-around gap-3 md:justify-end">
        <SelectLanguage />
        <PortfolioNav className="md:order-first" />
        <ModeToggle className="justify-self-end" />
      </div>
    </div>
  );
}
