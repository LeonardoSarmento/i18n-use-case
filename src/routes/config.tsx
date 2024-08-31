import MarkdownComponent from '@components/MarkdownPreview';
import { createFileRoute } from '@tanstack/react-router';
import ConfigContentPtBR from '@assets/pages/config.md';
import ConfigContentUS from '@assets/pages/config-en.md';
import i18n from '../i18n/config';
import { postsQueryOptions } from '@services/hooks/postsQueryOptions';
import { PendingComponent } from '@components/PendingComponent';

export const Route = createFileRoute('/config')({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(postsQueryOptions(i18n.language, { en: ConfigContentUS, ptBR: ConfigContentPtBR })),
  component: ConfigComponent,
  pendingComponent: PendingComponent,

});

function ConfigComponent() {
  const content = Route.useLoaderData();
  return <MarkdownComponent source={content} />;
}
