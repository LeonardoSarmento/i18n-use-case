## Configurando i18n para o seu projeto

A internacionalização, também chamada de i18n, é um passo importante para aumentar o alcançe do público de seu projeto. Com ela, você estará pronto para se comunicar e compartilhar conhecimentos com todas pessoas do mundo.

Abaixo estarei te acompanhando em uma das formas de se configurar o seu projeto em React com Typescript.

## Configurando o Ambiente

### Instalação das dependências necessárias

Vamos instalar as bibliotecas que nos permitirão adicionar suporte a i18n na nossa aplicação. Neste tutorial, usaremos o `react-i18next`, que é uma biblioteca popular e bem documentada para internacionalização em React.

```bash
npm install i18next react-i18next
```

## Escolhendo uma Biblioteca de i18n

### Apresentação das Principais Opções

Existem várias bibliotecas para implementar i18n em uma aplicação React, como `react-intl`, `react-i18next`, e `lingui`. Cada uma possui suas vantagens e desvantagens, dependendo das necessidades do projeto.

### Por que escolher o react-i18next?

Optamos por usar o `react-i18next` devido à sua flexibilidade, suporte robusto a TypeScript, e uma comunidade ativa que mantém a biblioteca constantemente atualizada. Além disso, ela se integra facilmente com o ecossistema React.

## Gerenciamento de preferências do usuário

Agora que decidimos usar o `react-i18next`, vamos instalar uma dependência adicional mas necessária para uma boa experiência do usário em nosso projeto.

Com o `i18next-browser-languagedetector` é possível detectar e gerenciar as preferências de linguagens utilizadas pelo usuário e guardar qual opção foi selecionada durante sua última visita ao projeto.

```bash
npm install i18next-browser-languagedetector
```

## Configuração Básica do i18n

### Configurando o i18next para suportar múltiplos idiomas

Primeiro, precisamos configurar o `i18next` para suportar múltiplos idiomas. Vamos criar um arquivo de configuração chamado `config.ts` na pasta `i18n` localizada na pasta `src`:

`src/i18n/config.ts`

```typescript
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import resources_pt_BR from './pt-BR';
import resources_en_US from './en-US';

export const defaultNS = 'contact';

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['pt-BR', 'en-US'],
    fallbackLng: ['en-US', 'pt-BR'],
    debug: true,
    load: 'currentOnly',
    defaultNS,
    returnObjects: true,
    resources: {
      'pt-BR': resources_pt_BR,
      'en-US': resources_en_US,
    },
  });

i18next.loadLanguages(['pt-BR', 'en-US']);

export default i18next;
```

### Adicionando arquivos de tradução

Vamos criar a estrutura de diretórios e arquivos para as traduções. Crie a seguinte estrutura:

```
i18n/
  en-US/
    contact.json
    intro.json
    home.json
    index.ts
  pt-BR/
    contact.json
    intro.json
    home.json
    index.ts
  config.ts
```

No arquivo `home.json` em inglês (`en-US/home.json`), podemos adicionar algumas traduções:

```json
{
  "welcome": "Welcome to our application!",
  "description": "This is a sample description."
}
```

E no arquivo `index.ts` em inglês (`en-US/index.ts`), podemos importar as traduções feitas na língua inglesa:

```typescript
import contact from './contact.json';
import intro from './intro.json';
import home from './home.json';

const resources_pt_BR = {
  contact,
  intro,
  home,
};

export default resources_pt_BR;
```

E no arquivo `home.json` em português (`pt-BR/home.json`):

```json
{
  "welcome": "Bem-vindo à nossa aplicação!",
  "description": "Esta é uma descrição de exemplo."
}
```

Fazemos o mesmo processo para o arquivo `index.ts` em português (`pt-BR/index.ts`):

```typescript
import contact from './contact.json';
import intro from './intro.json';
import home from './home.json';

const resources_pt_BR = {
  contact,
  intro,
  home,
};

export default resources_pt_BR;
```

## Configurando a Tipagem para TypeScript

### Configurando o TypeScript para trabalhar com i18n

Uma das vantagens de usar TypeScript é a possibilidade de adicionar tipagem forte à nossa aplicação, inclusive nas traduções. Para configurar o TypeScript com o `i18next`, precisamos criar um arquivo de tipos personalizados.

Crie um arquivo chamado `i18next.d.ts` dentro da pasta `src`:

```typescript
import { defaultNS } from './i18n/config';
import resources_pt_BR from './i18n/pt-BR';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: typeof resources_pt_BR;
  }
}
```

### Criando tipos para as traduções

Este arquivo informa ao TypeScript quais são os idiomas disponíveis e quais são as chaves de tradução para cada um deles. Com isso, ao utilizar o hook `useTranslation`, o TypeScript será capaz de oferecer autocompletar e verificação de tipos para as chaves de tradução.

### Tipagem para o Hook `useTranslation`

Com a tipagem configurada, podemos utilizar o `useTranslation` com segurança:

```typescript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation('home');

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

Ou o namespace pode ser definido inline:

```typescript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('welcome', { ns: 'home' })}</h1>
      <p>{t('description', { ns: 'home' })}</p>
    </div>
  );
}
```

<!-- ## Carregamento Assíncrono de Traduções

### Como Carregar Traduções de Forma Dinâmica

Em projetos maiores, pode ser necessário carregar as traduções de forma assíncrona, apenas quando necessário. O `i18next` suporta isso de forma nativa:

```typescript
i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'pt'],
    fallbackLng: 'en',
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    react: {
      useSuspense: true,
    },
  });
``` -->

<!-- ### Gerenciando Múltiplos Namespaces de Tradução

Namespaces permitem que você organize suas traduções em diferentes arquivos para facilitar a manutenção. Você pode configurar namespaces adicionais no arquivo de configuração: -->

<!-- ```typescript
i18n.init({
  ns: ['common', 'home', 'about'],
  defaultNS: 'common',
});
``` -->

## Configurações Avançadas do i18n

### Configurando fallback de idiomas

O fallback de idioma é utilizado quando a tradução para o idioma atual não está disponível. Já configuramos o `fallbackLng` para `['en-US', 'pt-BR']`, mas você pode personalizar isso ainda mais:

```typescript
// fallback to one language
i18next.init({
  fallbackLng: 'en',
});

// fallback ordered
i18next.init({
  fallbackLng: ['fr', 'en'],
});

// fallback depending on user language
i18next.init({
  fallbackLng: {
    'de-CH': ['fr', 'it'], //French and Italian are also spoken in Switzerland
    'zh-Hant': ['zh-Hans', 'en'],
    es: ['fr'],
    default: ['en'],
  },
});

// function that returns an array of fallbacks
// your function may also return a string or object as above
i18next.init({
  fallbackLng: (code) => {
    if (!code || code === 'en') return ['en-US'];
    const fallbacks = [code];

    // We maintain en-US and en-AU. Some regions will prefer en-AU.
    if (code.startsWith('en-') && !['en-US', 'en-AU'].includes(code)) {
      if (['en-GB', 'en-NZ', 'en-IR'].includes(code)) fallbacks.push('en-AU');
      else fallbacks.push('en-US');
      return fallbacks;
    }

    // add pure lang
    const langPart = code.split('-')[0];
    if (langPart !== code) fallbacks.push(langPart);

    // finally, developer language
    fallbacks.push('dev');
    return fallbacks;
  },
});
```

### Suporte a Interpolação e Pluralização

O `i18next` também oferece suporte a interpolação e pluralização, permitindo que você crie traduções mais dinâmicas:

```json
{
  "key_with_interpolation": "Hello, {{name}}!",
  "key_with_plural": "You have {{count}} item",
  "key_with_plural_plural": "You have {{count}} items",
  "key": "I am {{author.name}}",
  "object": {
    "title": "Welcome to my blog. I am {{author.name}}",
    "description": "Your description will be displayed"
  }
}
```

E para aplicar este caso:

```typescript
import { useTranslation } from 'react-i18next';

function Description(){
  const { t } = useTranslation('interpolation');

  const author = {
    name: 'Leonardo',
    github: 'LeonardoSarmento'
  };

  return (
    <>
      <p>{t('key_with_interpolation', { name: 'Leonardo' })}</p> // -> "Hello, Leonardo!"
      <p>{t('key', { author })}</p> // -> "I am Leonardo"
      <p>{t('object.title', { author, returnObjects: true })}</p> // -> "Welcome to my blog. I am Leonardo"
    </>
  );
}
```

### Suporte para Formatação

Também é possível se beneficiar das funcionalidade nativas de formatação do `i18next`:

## Numbers

```json
{
  "intlNumber": "Some {{val, number}}",
  "intlNumberWithOptions": "Some {{val, number(minimumFractionDigits: 2)}}"
}
```

```typescript
t('intlNumber', { val: 1000 });
// --> Some 1,000
t('intlNumber', { val: 1000.1, minimumFractionDigits: 3 });
// --> Some 1,000.100
t('intlNumber', { val: 1000.1, formatParams: { val: { minimumFractionDigits: 3 } } });
// --> Some 1,000.100
t('intlNumberWithOptions', { val: 2000 });
// --> Some 2,000.00
t('intlNumberWithOptions', { val: 2000, minimumFractionDigits: 3 });
// --> Some 2,000.000
```

---

## Currency

`src/i18n/en-US/currency.json`

```json
{
  "intlCurrencyWithOptionsSimplified": "The value is {{val, currency(USD)}}",
  "intlCurrencyWithOptions": "The value is {{val, currency(currency: USD)}}",
  "twoIntlCurrencyWithUniqueFormatOptions": "The value is {{localValue, currency}} or {{altValue, currency}}"
}
```

`src/i18n/pt-BR/currency.json`

```json
{
  "intlCurrencyWithOptionsSimplified": "O valor é {{val, currency(BRL)}}",
  "intlCurrencyWithOptions": "O valor é {{val, currency(currency: BRL)}}",
  "twoIntlCurrencyWithUniqueFormatOptions": "O valor é {{localValue, currency}} or {{altValue, currency}}"
}
```

```typescript
t('intlCurrencyWithOptionsSimplified', { val: 2000 });
// --> The value is $2,000.00
t('intlCurrencyWithOptions', { val: 2300 });
// --> The value is $2,300.00
t('twoIntlCurrencyWithUniqueFormatOptions', {
  localValue: 12345.67,
  altValue: 16543.21,
  formatParams: {
    localValue: { currency: 'USD', locale: 'en-US' },
    altValue: { currency: 'CAD', locale: 'fr-CA' },
  },
});
// --> The value is $12,345.67 or 16 543,21 $ CA
```

---

## DateTime

```json
{
  "intlDateTime": "On the {{val, datetime}}"
}
```

```typescript
t('intlDateTime', { val: new Date(Date.UTC(2012, 11, 20, 3, 0, 0)) });
// --> On the 12/20/2012
t('intlDateTime', {
  val: new Date(Date.UTC(2012, 11, 20, 3, 0, 0)),
  formatParams: {
    val: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
  },
});
// --> On the Thursday, December 20, 2012
```

---

## RelativeTime

```json
{
  "intlRelativeTime": "Lorem {{val, relativetime}}",
  "intlRelativeTimeWithOptions": "Lorem {{val, relativetime(quarter)}}",
  "intlRelativeTimeWithOptionsExplicit": "Lorem {{val, relativetime(range: quarter; style: narrow;)}}"
}
```

```typescript
t('intlRelativeTime', { val: 3 });
// --> Lorem in 3 days
t('intlRelativeTimeWithOptions', { val: -3 });
// --> Lorem 3 quarters ago
t('intlRelativeTimeWithOptionsExplicit', { val: -3 });
// --> Lorem 3 qtrs. ago
t('intlRelativeTimeWithOptionsExplicit', { val: -3, style: 'long' });
// --> Lorem 3 quarters ago
```

---

## List

```json
{
  "intlList": "A list of {{val, list}}"
}
```

```typescript
t('intlList', { val: ['locize', 'i18next', 'awesomeness'] });
// --> A list of locize, i18next, and awesomeness
```

## Gerenciamento de Idiomas na Aplicação

### Alteração do idioma selecionado

Para que os usuários possuam liberdade de escolher qual linguagem eles desejam ler o conteúdo, é criado um componente do tipo select. No caso demonstrado abaixo, um dropdown menu da "biblioteca" Shadcn/ui junto ao Flags.

Acessando a função i18n do hook `useTranslation`, você possui a propriedade `options.preload` onde é retornado as opções (`string[]`) de linguagens pré-carregadas no momento de inicialização do projeto.

Assim é possível iterar pela propriedade `preload` e mostrar como opções de selecão apenas as liguagens já pré-configuradas no projeto:

`src/components/SelectLanguages.tsx`

```typescript
import Flags from 'country-flag-icons/react/3x2';
import { Button, ButtonProps } from '@components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@components/ui/dropdown-menu';
import { useTranslation } from 'react-i18next';

type SelectLanguageBtn = ButtonProps & React.RefAttributes<HTMLButtonElement>;

export function SelectLanguage({ ...props }: SelectLanguageBtn) {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button {...props} variant="outline" size="icon" id="select-language" aria-label="select-language">
          <Flag countryCode={getCountrCode(i18n.language)} className="w-6 rounded-sm" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="relative left-2 w-6 min-w-[3rem]">
        {i18n.options.preload
          ? i18n.options.preload.map((option) => (
              <DropdownMenuItem key={option} onClick={() => changeLanguage(option)} className="gap-3">
                <Flag countryCode={getCountrCode(option)} className="w-8 rounded-sm" />
              </DropdownMenuItem>
            ))
          : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function getCountrCode(countryName: string) {
  return countryName.slice(-2);
}

type FlagProps = {
  countryCode: string;
  className?: string;
};

const Flag = ({ countryCode, className }: FlagProps) => {
  const FlagComponent = Flags[countryCode.toUpperCase() as keyof typeof Flags];
  return <FlagComponent key={countryCode} className={className} />;
};

```

## Testando a Implementação do i18n

### Testando componentes traduzidos

Para testar componentes que utilizam traduções, você pode criar mocks dos dados de tradução durante os testes:

```typescript

import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import MyComponent from './MyComponent';

test('renders translated text', () => {
  const { getByText } = render(
    <I18nextProvider i18n={i18n}>
      <MyComponent />
    </I18nextProvider>
  );

  expect(getByText('Bem-vindo à nossa aplicação!')).toBeInTheDocument();
});

```

### Usando mocks para simular diferentes idiomas

Você também pode configurar testes para simular diferentes idiomas, verificando se os textos estão sendo renderizados corretamente em cada um deles.

## Melhores Práticas

### Estrutura de arquivos para traduções

Mantenha uma estrutura de arquivos organizada para facilitar a manutenção. Utilize namespaces quando necessário e evite duplicar chaves de tradução.

### Evitando strings hard-coded

Nunca insira strings de texto diretamente nos componentes. Sempre use o mecanismo de tradução para garantir que todos os textos possam ser traduzidos.

### Boas práticas para tradução de componentes complexos

Componentes complexos que possuem muitas mensagens devem ser organizados em arquivos de tradução específicos, utilizando namespaces e interpolação para facilitar a manutenção e a leitura do código.

## Deploy e Considerações Finais

### Como preparar a aplicação para produção

Certifique-se de que todas as traduções estejam corretas e que a aplicação suporte fallback adequadamente. Minifique os arquivos de tradução para reduzir o tamanho do bundle e melhorar o desempenho.

### Problemas comuns e como evitá-los

Verifique se todas as chaves de tradução estão presentes nos arquivos de todos os idiomas suportados para evitar falhas durante a execução da aplicação.

## Resolvendo problemas comuns

### Erros de Configuração e Como Depurá-los

Caso ocorra algum erro de configuração, utilize o modo debug do `i18next` para verificar o que pode estar causando o problema. O modo debug fornece logs detalhados sobre o carregamento de traduções e a detecção de idiomas.

### Dicas para melhorar o desempenho do i18n

Utilize a funcionalidade de lazy loading para carregar apenas as traduções necessárias e minimize a quantidade de chaves de tradução carregadas de uma só vez.

## Conclusão

Implementar i18n em uma aplicação React com TypeScript permite que você alcance um público global, oferecendo uma experiência de usuário personalizada em diferentes idiomas. Ao seguir as práticas descritas neste artigo, você pode garantir que sua aplicação esteja bem preparada para suportar múltiplos idiomas de forma eficiente e escalável.

## FAQs

**O que fazer se um idioma não estiver sendo carregado corretamente?**

Verifique se o caminho do arquivo de tradução está correto e se a configuração do `i18next` está carregando os idiomas esperados.

**Como lidar com textos muito longos em diferentes idiomas?**

Use chaves de tradução específicas para casos onde o texto precisa ser adaptado em diferentes idiomas. Utilize CSS para lidar com variações de comprimento de texto.

**É possível fazer i18n com outros frameworks além do React?**

Sim, bibliotecas como `i18next` possuem suporte para diversos frameworks e até mesmo aplicações JavaScript vanilla.
