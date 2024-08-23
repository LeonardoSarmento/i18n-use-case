import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@components/ui/card';
import { Link } from '@tanstack/react-router';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/')({
  component: IndexComponent,
});

function ListComponent({ title, description, link }: { title: string; description: string; link?: string }) {
  return (
    <Link
      to={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center justify-center rounded-md py-1 transition-colors hover:bg-muted"
    >
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </Link>
  );
}

function IndexComponent() {
  const { t } = useTranslation('home');
  return (
    <div className="relative top-20 flex items-center justify-center">
      <Card className="space-y-3">
        <CardHeader className="border-b text-center">
          <CardTitle className="border-b text-lg">{t('title')}</CardTitle>
          <CardDescription>{t('description1')}</CardDescription>
          <CardDescription>{t('description2')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ListComponent title="Framework" description="Vite.js com Typescript" link="https://vitejs.dev/guide/" />
          <ListComponent
            title="Roteamento"
            description="Tanstack Router"
            link="https://tanstack.com/router/latest/docs/framework/react/quick-start"
          />
          <ListComponent
            title="Formulário"
            description="React Hook Form"
            link="https://www.react-hook-form.com/get-started/"
          />
          <ListComponent title="Validação" description="Zod" link="https://zod.dev/?id=basic-usage" />
          <ListComponent title="Componentes" description="Shadcn/ui" link="https://ui.shadcn.com/docs/installation" />
          <ListComponent title="Toast" description="Sonner" link="https://sonner.emilkowal.ski/" />
          <ListComponent
            title="DevTools"
            description="Tanstack Router e Query"
            link="https://tanstack.com/query/latest/docs/framework/react/devtools"
          />
        </CardContent>
        <CardFooter className="justify-center">
          <CardDescription>{t('footer')}</CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}
