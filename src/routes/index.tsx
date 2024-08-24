import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@components/ui/card';
import { cn } from '@lib/utils';
import { Link } from '@tanstack/react-router';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/')({
  component: IndexComponent,
});

function IndexComponent() {
  const { t } = useTranslation('home');
  return (
    <div className="my-10 flex items-center justify-center">
      <Card className="space-y-3">
        <CardHeader className="border-b text-center">
          <CardTitle className="border-b text-lg">{t('title')}</CardTitle>
          <CardDescription>{t('description1')}</CardDescription>
          <CardDescription>{t('description2')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Card className="bg-muted p-2">
            <CardTitle className="text-center">{t('stack.main.title')}</CardTitle>
            <p className="text-center text-sm text-muted-foreground">{t('stack.main.description')}</p>
          </Card>
          <MapListComponent content={t('stack.main.tech', { returnObjects: true })} />
          <div className="h-1 w-full bg-muted" />
          <Card className="bg-muted p-2">
            <CardTitle className="text-center">{t('stack.secondary.title')}</CardTitle>
            <p className="text-center text-sm text-muted-foreground">{t('stack.secondary.description')}</p>
          </Card>
          <MapListComponent content={t('stack.secondary.tech', { returnObjects: true })} />
          <div className="h-1 w-full bg-muted" />
        </CardContent>
        <CardFooter className="justify-center">
          <CardDescription>{t('footer')}</CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}

type TListComponent = {
  title: string;
  description: string;
  link?: string;
  className?: string;
};

function ListComponent({ title, description, link, className }: TListComponent) {
  return (
    <Link
      to={link}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'flex flex-col items-center justify-center rounded-md py-1 transition-colors hover:bg-muted',
        className,
      )}
    >
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </Link>
  );
}

function MapListComponent({ content }: { content: TListComponent[] }) {
  return content.map((tech) => (
    <ListComponent key={tech.title} title={tech.title} description={tech.description} link={tech.link} />
  ));
}
