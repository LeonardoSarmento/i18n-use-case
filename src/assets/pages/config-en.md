## Setting Up i18n for Your Project

Internationalization, also known as i18n, is an important step to increase the reach of your project’s audience. With it, you'll be ready to communicate and share knowledge with people all over the world.

Below, I’ll guide you through one way to configure your React project with TypeScript for i18n.

## Setting Up the Environment

### Installing the Necessary Dependencies

Let's install the libraries that will allow us to add i18n support to our application. In this tutorial, we'll use `react-i18next`, a popular and well-documented library for internationalization in React.

```bash
npm install i18next react-i18next
```

## Choosing an i18n Library

### Overview of the Main Options

There are several libraries for implementing i18n in a React application, such as `react-intl`, `react-i18next`, and `lingui`. Each has its advantages and disadvantages, depending on your project’s needs.

### Why Choose react-i18next?

We chose to use `react-i18next` because of its flexibility, strong TypeScript support, and active community that keeps the library up to date. Additionally, it integrates easily with the React ecosystem.

## Managing User Preferences

Now that we’ve decided to use `react-i18next`, let’s install an additional but necessary dependency to ensure a good user experience in our project.

With `i18next-browser-languagedetector`, you can detect and manage the language preferences used by the user and store which option was selected during their last visit to the project.

```bash
npm install i18next-browser-languagedetector
```

## Basic i18n Configuration

### Setting Up i18next to Support Multiple Languages

First, we need to configure `i18next` to support multiple languages. Let’s create a configuration file called `config.ts` in the `i18n` folder located within the `src` directory:

`src/i18n/config.ts`

```typescript
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import resources_pt_BR from './pt-BR';
import resources_en_US from './en-US';

export const defaultNS = 'home';

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

Here’s what we’re specifying:

- `SupportedLngs`: The languages supported in our project.
- `FallbackLng`: The languages to display if the user’s detected language by `LanguageDetector` is not available.
- `Load`: The language code styles that `i18next` should search for.
- `Resources`: The language translations that we’re making available.

Finally, we load the languages we want to use when initializing the application.

### Adding Translation Files

Let’s create the directory and file structure for translations. Create the following structure:

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

In the English `home.json` file (`en-US/home.json`), we can add some translations:

```json
{
  "welcome": "Welcome to our application!",
  "description": "This is a sample description."
}
```

And in the English `index.ts` file (`en-US/index.ts`), we can import the translations made in English:

```typescript
import contact from './contact.json';
import intro from './intro.json';
import home from './home.json';

const resources_en_US = {
  contact,
  intro,
  home,
};

export default resources_en_US;
```

Similarly, in the Portuguese `home.json` file (`pt-BR/home.json`):

```json
{
  "welcome": "Bem-vindo à nossa aplicação!",
  "description": "Esta é uma descrição de exemplo."
}
```

We repeat the process for the Portuguese `index.ts` file (`pt-BR/index.ts`):

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

## Setting Up Typing for TypeScript

### Configuring TypeScript to Work with i18n

One of the advantages of using TypeScript is the ability to add strong typing to our application, including translations. To configure TypeScript with `i18next`, we need to create a custom types file.

Create a file named `i18next.d.ts` inside the `src` folder:

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

### Creating Types for Translations

This file informs TypeScript about the available languages and translation keys for each of them. This allows TypeScript to provide autocomplete and type checking for translation keys when using the `useTranslation` hook.

### Typing for the `useTranslation` Hook

With the typing set up, we can safely use `useTranslation`:

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

Or the namespace can be defined inline:

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

## Advanced i18n Configurations

### Configuring Language Fallback

Language fallback is used when a translation for the current language is not available. We’ve already set `fallbackLng` to `['en-US', 'pt-BR']`, but you can customize this further:

```typescript
// fallback to a single language
i18next.init({
  fallbackLng: 'en',
});

// ordered fallback
i18next.init({
  fallbackLng: ['en-US', 'pt-BR'],
});

// fallback depending on the user's language
i18next.init({
  fallbackLng: {
    'de-CH': ['fr', 'it'], // French and Italian are also spoken in Switzerland
    'zh-Hant': ['zh-Hans', 'en'],
    es: ['fr'],
    default: ['en'],
  },
});
```

### Multiple Fallback Keys

Calling the `t` function with an array of keys allows you to translate dynamically without providing a specific value as a fallback.

For example, consider a case where you need to display an alert message based on the received error code:

```json
{
  "error": {
    "unspecific": "Something went wrong",
    "404": "The page was not found"
  }
}
```

```typescript
// const error = '404';
i18next.t([`error.${error}`, 'error.unspecific']); // -> "The page was not found"

// const error = '502';
i18next.t([`error.${error}`, 'error.unspecific']); // -> "Something went wrong"
```

---

## Support for Objects and Arrays

### Objects

You can return objects and arrays to be used in your component function:

```json
{
  "tree": {
    "res": "added {{something}}"
  },
  "array": ["a", "b", "c"]
}
```

```typescript
i18next.t('tree', { returnObjects: true, something: 'food' });
// -> { res: 'added food' }

i18next.t('array', { returnObjects: true });
// -> ['a', 'b', 'c']
```

`returnObjects` can be set to `true` during application initialization.

### Arrays

You can access array values or join them:

```json
{
  "arrayJoin": ["line1", "line2", "line3"],
  "arrayJoinWithInterpolation": ["you", "can", "{{myVar}}"],
  "arrayOfObjects": [{ "name": "Leo" }, { "name": "Sarmento" }]
}
```

```typescript
i18next.t('arrayJoin', { joinArrays: '+' });
// -> "line1+line2+line3"

i18next.t('arrayJoinWithInterpolation', { myVar: 'interpolate', joinArrays: ' ' });
// -> "you can interpolate"

i18next.t('arrayOfObjects.0.name');
// -> "Leo"
```

The returned value supports interpolation, pluralization, nesting, ...

`joinArrays` can be set to a value during application initialization.

---

## Support for Interpolation and Pluralization

`i18next` also supports interpolation and pluralization, allowing you to create

more dynamic translations:

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

Here’s how to apply this:

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

---

## Formatting Support

You can also take advantage of `i18next`’s native formatting features:

### Numbers

Formatting numbers with different decimal places:

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

### Currency

Using different currency formats:

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

### DateTime

Date formatting:

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

### RelativeTime

For relative times:

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

### List

How to format lists:

```json
{
  "intlList": "A list of {{val, list}}"
}
```

```typescript
t('intlList', { val: ['locize', 'i18next', 'awesomeness'] });
// --> A list of locize, i18next, and awesomeness
```

---

## Language Management in the Application

### Changing the Selected Language

To allow users to choose their preferred language, a select component is created. In the example below, a dropdown menu from the "library" Shadcn/ui is used along with Flags.

By accessing the i18n function from the `useTranslation` hook, you have access to the `options.preload` property, which returns the (`string[]`) of preloaded languages at the project’s initialization.

This allows you to iterate over the `preload` property and display only the languages already pre-configured in the project as selection options:

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

## Best Practices

### File Structure for Translations

Maintain an organized file structure to facilitate maintenance. Use namespaces when necessary and avoid duplicating translation keys.

### Avoiding Hard-Coded Strings

Never insert text strings directly into components. Always use the translation mechanism to ensure that all text can be translated.

### Best Practices for Translating Complex Components

Complex components with many messages should be organized into specific translation files, using namespaces and interpolation to facilitate maintenance and code readability.

## Deployment and Final Considerations

### Preparing the Application for Production

Make sure all translations are correct and that the application supports fallback languages properly. Minify the translation files to reduce bundle size and improve performance.

### Common Problems and How to Avoid Them

Check that all translation keys are present in the files of all supported languages to avoid runtime failures.

## Troubleshooting Common Issues

### Configuration Errors and How to Debug Them

If any configuration errors occur, use the `i18next` debug mode to check what might be causing the problem. Debug mode provides detailed logs about translation loading and language detection.

### Tips to Improve i18n Performance

Use lazy loading to load only the necessary translations and minimize the number of translation keys loaded at once.

## Conclusion

Implementing i18n in a React application with TypeScript allows you to reach a global audience, offering a personalized user experience in different languages. By

following the practices described in this article, you can ensure that your application is well-prepared to support multiple languages efficiently and scalably.

## FAQs

**What should I do if a language isn’t loading correctly?**

Check if the translation file path is correct and if the `i18next` configuration is loading the expected languages.

**How to deal with very long texts in different languages?**

Use specific translation keys for cases where the text needs to be adapted in different languages. Use CSS to handle text length variations.

**Is it possible to do i18n with frameworks other than React?**

Yes, libraries like `i18next` support various frameworks and even vanilla JavaScript applications.

---