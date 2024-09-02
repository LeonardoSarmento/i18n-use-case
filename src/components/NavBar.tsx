import { Link } from '@tanstack/react-router';
import { PortfolioNav } from './PortfolioNav';
import { ModeToggle } from './Mode-toggle';
import { SelectLanguage } from './SelectLanguage';
import { useTranslation } from 'react-i18next';
import { Github } from 'lucide-react';
import { Button } from './ui/button';

export function NavigationBar() {
  const { t } = useTranslation('NavigationBar');
  return (
    <div className="flex w-full flex-wrap-reverse items-center gap-4 py-2 sm:my-2 md:flex-nowrap xl:gap-2 xl:space-x-7">
      <div className="hidden w-full justify-center md:order-first md:flex xl:w-1/3 xl:justify-start">
        <GitHubLink />
      </div>
      <div className="flex w-full flex-wrap justify-around justify-items-center gap-3 xl:w-1/3">
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
      <div className="flex w-full justify-around gap-3 md:justify-end xl:w-1/3">
        <div className="md:hidden">
          <GitHubLink />
        </div>
        <PortfolioNav />
        <SelectLanguage />
        <ModeToggle className="justify-self-end" />
      </div>
    </div>
  );
}

function GitHubLink() {
  return (
    <a href="https://github.com/LeonardoSarmento/i18n-use-case" target="_blank" rel="noopener noreferrer">
      <Button variant="ghost" className="gap-3">
        <Github />
        <p className="text-base underline underline-offset-4 max-md:hidden">i18n-use-case</p>
      </Button>
    </a>
  );
}
