'use client';
import React, { useState } from 'react';
import z from 'zod';

import { LoginFormErrors, loginSchema } from '../../utils/form/login';
import Button from '../button/Button';
import Input from '../Input/Input';

export default function FormLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<LoginFormErrors>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();

      const result = loginSchema.safeParse({ email, password });

      if (!result.success) {
        const flattened = z.flattenError(result.error);
        setErrorMsg(flattened.fieldErrors);
        return;
      }

      console.log(result.data);
    } catch (error: unknown) {
      console.error(error);
    }
  }

  return (
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

      <Button variant={'primary'} className={'w-full'}>
        Se connecter
      </Button>
    </form>
  );
}
