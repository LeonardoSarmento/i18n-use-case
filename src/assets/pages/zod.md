Para integrar `react-hook-form` com `Zod` para validação e utilizar `i18n` para mensagens de erro traduzidas é uma maneira eficiente de gerenciar formulários em uma aplicação React. Aqui está um guia sobre como realizar essa integração.

### 1. **Instalação das Dependências**

Primeiro, instale as dependências necessárias:

```bash
npm install react-hook-form zod @hookform/resolvers
```

Aqui está o que cada biblioteca faz:

- `react-hook-form`: Gerenciamento de formulários em React.
- `zod`: Validação de esquemas com TypeScript.
- `@hookform/resolvers`: Adapta a validação do Zod para ser utilizada no `react-hook-form`.

### 2. **Criando o Esquema de Validação com Zod**

Vamos criar um esquema de validação com Zod para um formulário de login:

```typescript
import { z } from 'zod';

const loginSchema = z.object({
  email: z
    .string({ required_error: 'required_email' })
    .email({
      message: 'email_invalid',
    })
    .trim(),
  password: z
    .string({ required_error: 'required_password' })
    .min(6, {
      message: 'password_too_short',
    })
    .trim(),
});

type LoginFormInputs = z.infer<typeof loginSchema>;
```

Aqui, estamos definindo as mensagens de erro como chaves que serão traduzidas pelo i18n.

### 3. **Configurando as Traduções no i18n**

Adicione as mensagens de erro ao seu arquivo de tradução, por exemplo, `src/i18n/en-US/form.json`:

```json
{
  "required_email": "E-mail is required",
  "email_invalid": "Please enter a valid email address.",
  "required_password": "password is required",
  "password_too_short": "Password must be at least 6 characters long.",
  "email": "Email",
  "password": "Password",
  "login": "Login"
}
```

Para português, no arquivo `src/i18n/pt-BR/form.json`:

```json
{
  "required_email": "E-mail é obrigatório",
  "email_invalid": "Por favor, insira um endereço de e-mail válido.",
  "required_password": "Senha é obrigatória",
  "password_too_short": "A senha deve ter pelo menos 6 caracteres.",
  "email": "E-mail",
  "password": "Senha",
  "login": "Entrar"
}
```

### 4. **Integração do `react-hook-form` com `Zod` e `i18n`**

Agora, vamos integrar o `react-hook-form` com Zod e utilizar o i18n para exibir mensagens de erro traduzidas.

```typescript
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import formMessages from "../../i18n/en-US/form.json";

const loginSchema = z.object({
  email: z.string({ required_error: 'required_email' }).email({
    message: 'email_invalid',
  }).trim(),
  password: z.string({ required_error: 'required_password' }).min(6, {
    message: 'password_too_short',
  }).trim(),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const { t } = useTranslation('form');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>{t('email')}</label>
        <input
          type="email"
          {...register('email')}
        />
        {errors.email && <span>{t(errors.email.message as keyof typeof formMessages)}</span>}
      </div>

      <div>
        <label>{t('password')}</label>
        <input
          type="password"
          {...register('password')}
        />
        {errors.password && <span>{t(errors.password.message as keyof typeof formMessages)}</span>}
      </div>

      <button type="submit">{t('login')}</button>
    </form>
  );
};

export default LoginForm;
```

Caso utilize o `form` do Shadcn/ui, é possível realizar a mesma configuração apenas alterando o arquivo `form.tsx` na pasta `src/components/ui/form.tsx`:

```typescript
import errorMessages from '../../i18n/pt-BR/errorsMessageSchema.json';

const FormMessage = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => {
    const { t } = useTranslation('errorsMessageSchema');
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message) : children;

    if (!body) {
      return null;
    }
    return (
      <p
        key={String(error?.message)}
        ref={ref}
        id={formMessageId}
        className={cn('text-[0.8rem] font-medium text-destructive', className)}
        {...props}
      >
        {t(body as keyof typeof errorMessages)}
      </p>
    );
  },
);
FormMessage.displayName = 'FormMessage';
```

A partir disso, todos compontentes de messagem do formulário obterão a função de tradução, só necessecitando que a chave seja indenficada no arquivo traduzido para a linguagem desejada:

```json
{
  "post_title_required_error": "Como vc quer que o pessoal leia se nem titulo tu ta colocando??",
  "post_title_min": "Como vc quer que o pessoal leia se nem titulo tu ta colocando??",
  "post_description_required_error": "Como vc quer que o pessoal leia se nem titulo tu ta colocando??",
  "post_description_min": "Como vc quer que o pessoal leia se nem titulo tu ta colocando??",
  "post_body_required_error": "Como vc quer que o pessoal leia se nem titulo tu ta colocando??",
  "post_body_min": "Como vc quer que o pessoal leia se nem titulo tu ta colocando??",
  "login_username_required_error": "O campo é obrigatório amigão",
  "login_username_min": "O campo não pode ser vazio amigão",
  "login_password_required_error": "Preciso dele pra testar aqui na maquininha",
  "login_password_min": "Tá faltando número nisso ai amigo",
  "login_password_max": "Oloko amigo isso não é alemão não pra que tanta letra"
}
```

### 5. **Explicação do Código**

- **Schema de Validação (`loginSchema`)**: Define as regras de validação usando Zod, com as mensagens de erro configuradas como chaves de tradução.
- **Hook `useForm` com `zodResolver`**: O `react-hook-form` é configurado para usar o `zodResolver`, que adapta o esquema de validação do Zod ao `react-hook-form`.

- **Utilização de `useTranslation`**: O `useTranslation` do i18next é utilizado para traduzir as chaves de erro retornadas pelo Zod, exibindo as mensagens de erro localizadas.

- **Exibição de Erros**: As mensagens de erro são exibidas traduzidas, utilizando as chaves retornadas pelo Zod e traduzidas com `t()` do i18next. As mensagens de erro são identificadas pela chave ao importar o arquivo .json e informando o formato ao typescript com `keyof typeof formMessages`.

### 6. **Conclusão**

Com essa integração, você pode gerenciar formulários no React com validação tipada, robusta e mensagens de erro localizadas, melhorando a experiência do usuário em aplicações multilíngues. O uso do `react-hook-form` combinado com Zod e i18n fornece uma solução eficiente e escalável para a validação e internacionalização de formulários em React.

---
