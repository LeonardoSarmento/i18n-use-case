import * as React from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useForm } from 'react-hook-form';
import { LoginSchema, LoginType } from '@services/types/Login';
import { zodResolver } from '@hookform/resolvers/zod';
import { getRandomNumberWithDecimals } from '@services/utils/utils';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { t } = useTranslation('login');
  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    mode: 'onChange',
  });

  const onSubmit = form.handleSubmit((values) => {
    if (values.username === 'admin' && values.password === 'admin') {
      toast.success(t('toastMessage.success.title', { val: getRandomNumberWithDecimals() }), {
        description: t('toastMessage.success.description', { username: values.username }),
      });
      return;
    }
    toast.error(t('toastMessage.error.title'), {
      description: t('toastMessage.error.description'),
    });
  });

  return (
    <div className={'grid gap-6'} {...props}>
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('loginForm.username.label')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('loginForm.username.placeholder')} {...field} />
                    </FormControl>
                    <FormDescription>{t('loginForm.username.description')}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('loginForm.password.label')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('loginForm.password.placeholder')} type="password" {...field} />
                    </FormControl>
                    <FormDescription>{t('loginForm.password.description')}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">{t('loginForm.button.submit')}</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
