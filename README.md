## Project - i18n use case.

An use case of how to apply i18n in a typescript project.

### Techs

- I18n: `i18n` (^23.14.0)
- React i18n: `react-i18next` (^15.0.1)
- Language Detection: `i18next-browser-languagedetector` (^8.0.0)

- Language : `TypeScript` (^5.5.4)
- Web Application framework : `Vite` (^5.4.2)
- Router : `@tanstack/react-router` (^1.49.7)
- Form : `react-hook-form` (^7.52.2)
- Validation : `zod` (^3.23.8)
- Styling : `tailwindcss` (^3.4.10)

- Lint : `eslint` (^8.55.0)
- Formatting : `prettier` (^3.3.3)

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


Update dependencies:

``` bash

npx npm-check-updates -u

```