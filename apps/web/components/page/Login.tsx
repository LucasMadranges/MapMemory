import React from 'react';

import FormLogin from '../form/FormLogin';
import FirstHeader from '../text/FirstHeader';

export default function Login() {
  return (
    <>
      <div className={'bg-white p-6 rounded-xl flex flex-col gap-4 items-center w-full m-4'}>
        <FirstHeader content={'Se connecter'} />

        <FormLogin />
      </div>
    </>
  );
}
