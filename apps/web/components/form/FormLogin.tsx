'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import z from 'zod';

import { clientApi } from '../../utils/api/clientApi';
import { LoginFormErrors, loginSchema } from '../../utils/form/login';
import Button from '../button/Button';
import Input from '../input/Input';
import Loading from '../loading/Loading';

export default function FormLogin() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<LoginFormErrors>({});
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    try {
      setLoading(true);
      setDisabled(true);
      event.preventDefault();

      const result = loginSchema.safeParse({ email, password });

      if (!result.success) {
        const flattened = z.flattenError(result.error);
        setErrorMsg(flattened.fieldErrors);
        setDisabled(false);
        return;
      }

      const response = await clientApi.post('/login', {
        email: email,
        password: password,
      });

      const data = await response.data;

      if (response.status !== 200) {
        toast.error(data.message, { duration: 5000 });
        setDisabled(false);
        return;
      }

      toast.success('Connexion réussie ! Redirection dans 5 secondes...', { duration: 5000 });

      setTimeout(() => {
        router.push('/');
      }, 5000);
    } catch (error: unknown) {
      setDisabled(false);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (searchParams.get('redirect') === 'unauthorized') {
      toast.error('Vous devez être connecté pour accéder à cette page', { duration: 5000 });
    }
  }, [searchParams]);

  return (
    <>
      <form onSubmit={handleSubmit} className={'flex flex-col gap-8 w-full'}>
        <Input
          value={email}
          setValue={setEmail}
          name={'email'}
          type={'text'}
          placeholder={'Email'}
          errorMessage={errorMsg?.email?.[0]}
          onClearError={() => setErrorMsg((prev) => ({ ...prev, email: undefined }))}
        />

        <Input
          value={password}
          setValue={setPassword}
          name={'password'}
          type={'password'}
          placeholder={'Password'}
          errorMessage={errorMsg?.password?.[0]}
          onClearError={() => setErrorMsg((prev) => ({ ...prev, password: undefined }))}
        />

        <Button
          disabled={disabled}
          variant={'primary'}
          type={'submit'}
          className={'w-full flex items-center justify-center h-10'}
        >
          {!loading && !disabled && 'Se connecter'}
          {loading && <Loading className={'text-white'} />}
          {!loading && disabled && 'Redirection...'}
        </Button>
      </form>
      <Toaster />
    </>
  );
}
