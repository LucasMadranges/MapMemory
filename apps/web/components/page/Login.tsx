import React from 'react';

import FormLogin from '../form/FormLogin';

export default function Login() {
  return (
    <>
      <div className={'bg-white p-4 rounded-xl'}>
        <h1>Se connecter</h1>

        <FormLogin />
      </div>
    </>
  );
}
