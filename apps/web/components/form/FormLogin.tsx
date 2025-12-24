'use client';
import React from 'react';

import Button from '../button/Button';
import Input from '../Input/Input';

export default function FormLogin() {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('submit');
  }

  return (
    <form className={'flex flex-col gap-8 w-full'} onSubmit={handleSubmit}>
      <Input name={'email'} type={'text'} placeholder={'Email'} />

      <Input name={'password'} type={'password'} placeholder={'Password'} />

      <Button variant={'primary'} className={'w-full'}>
        Se connecter
      </Button>
    </form>
  );
}
