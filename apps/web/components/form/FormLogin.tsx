'use client';
import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import z from 'zod';

import { LoginFormErrors, loginSchema } from '../../utils/form/login';
import Button from '../button/Button';
import Input from '../Input/Input';
import Loading from '../loading/Loading';

export default function FormLogin() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<LoginFormErrors>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    try {
      setLoading(true);
      event.preventDefault();

      const result = loginSchema.safeParse({ email, password });

      if (!result.success) {
        const flattened = z.flattenError(result.error);
        setErrorMsg(flattened.fieldErrors);
        return;
      }

      const response = await fetch('/api/users', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        toast.error(response.statusText);
      }

      const data = await response.json();
      console.log(data);
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form className={'flex flex-col gap-8 w-full'} onSubmit={handleSubmit}>
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

        <Button variant={'primary'} className={'w-full flex items-center justify-center h-10'}>
          {!loading && 'Se connecter'}
          {loading && <Loading className={'text-white'} />}
        </Button>
      </form>
      <Toaster />
    </>
  );
}
