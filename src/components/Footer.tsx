import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardTitle } from './ui/card';
import { Github, Instagram, Linkedin, LucideIcon, Mail, ThumbsUp } from 'lucide-react';

function SocialButton({ Icon, link, name }: { link: string; name: string; Icon: LucideIcon }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="w-[250px] rounded-lg transition-all duration-300 hover:scale-110 hover:bg-muted"
    >
      <CardContent className="flex flex-col items-center gap-1 p-0 py-2">
        <Icon />
        <CardDescription>{name}</CardDescription>
      </CardContent>
    </a>
  );
}

export function Footer() {
  const { t } = useTranslation('footer');
  return (
    <div className="min-w-screen my-4 flex flex-col gap-4 px-8 xl:px-16">
      <Card className="flex items-center justify-around py-2">
        {SocialMediaItems.map((item) => (
          <SocialButton key={item.name} name={item.name} link={item.link} Icon={item.icon} />
        ))}
      </Card>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <CardTitle className="text-center">{t('title')}</CardTitle>
        <ThumbsUp color="#2de139" />
      </div>
    </div>
  );
}

export type TSocialMediaCard = {
  name: string;
  link: string;
  icon: LucideIcon;
};

export const SocialMediaItems: TSocialMediaCard[] = [
  { name: 'Instagram', icon: Instagram, link: 'https://instagram.com/leonardo.a.sarmento' },
  { name: 'Linkedin', icon: Linkedin, link: 'https://linkedin.com/in/leonardo-araujo-sarmento' },
  { name: 'Github', icon: Github, link: 'https://github.com/LeonardoSarmento' },
  { name: 'Gmail', icon: Mail, link: 'mailto: leonardo.a.sarmento@gmail.com?subject=ThisIsMyFeedback&body=Hello!' },
];
