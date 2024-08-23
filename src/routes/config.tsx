import MarkdownComponent from '@components/MarkdownPreview';
import { createFileRoute } from '@tanstack/react-router';
import ConfigContent from '@assets/pages/config.md';

export const Route = createFileRoute('/config')({
  component: ConfigComponent,
});

function ConfigComponent() {
  return <MarkdownComponent source={ConfigContent} />;
}
