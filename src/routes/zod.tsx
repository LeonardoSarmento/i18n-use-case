import MarkdownComponent from '@components/MarkdownPreview';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { UserAuthForm } from '@components/UserAuthForm';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import ZodContentPtBR from '@assets/pages/zod.md';
import ZodContentUS from '@assets/pages/zod-en.md';
import { postsQueryOptions } from '@services/hooks/postsQueryOptions';
import i18n from '../i18n/config';
import { PendingComponent } from '@components/PendingComponent';

export const Route = createFileRoute('/zod')({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(postsQueryOptions(i18n.language, { en: ZodContentUS, ptBR: ZodContentPtBR })),
  component: ZodExampleComponent,
  pendingComponent: PendingComponent,
});

function ZodExampleComponent() {
  const { t } = useTranslation('zod');
  const content = Route.useLoaderData();

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
      <MarkdownComponent source={content} />
    </div>
  );
}
