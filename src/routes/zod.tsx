import MarkdownComponent from '@components/MarkdownPreview';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { UserAuthForm } from '@components/UserAuthForm';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import ZodContent from '@assets/pages/zod.md';

export const Route = createFileRoute('/zod')({
  component: ZodExampleComponent,
});

function ZodExampleComponent() {
  const { t } = useTranslation('zod');
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <h1 className="scroll-m-20 border-b text-3xl font-semibold tracking-tight first:mt-0">{t('title')}</h1>
          <CardDescription>{t('description')}</CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{t('exampleTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          <UserAuthForm />
        </CardContent>
      </Card>
      <MarkdownComponent source={ZodContent} />
    </div>
  );
}
