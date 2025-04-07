import Button from '../buttons/Button';
import { Close } from '../icons/Close';
import EventForm from './EventForm';
import React, { MouseEventHandler } from 'react';

export default function AddEvent({
  hidden,
  handleClose,
  panelRef,
}: {
  hidden: boolean;
  handleClose: MouseEventHandler;
  panelRef: React.Ref<HTMLDivElement>;
}) {
  return (
    <div
      hidden={hidden}
      ref={panelRef}
      className={`bg-blue-500 absolute bottom-0 left-0 h-svh w-2/5 z-20 border-r-8 border-gray-300`}
    >
      <Button
        type={'tertiary'}
        className={
          'w-6 absolute top-2 right-2 rounded-lg text-white hover:text-black'
        }
        onClick={handleClose}
      >
        <Close className={'w-6 h-6'} />
      </Button>
      <div className={'flex items-start justify-end py-8 pr-8 h-full'}>
        <EventForm />
      </div>
    </div>
  );
}
