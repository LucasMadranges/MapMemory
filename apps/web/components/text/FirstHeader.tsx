import React from 'react';

export default function FirstHeader({ content }: { content: string }) {
  return <h1 className={'text-3xl font-semibold font-montserrat'}>{content}</h1>;
}
