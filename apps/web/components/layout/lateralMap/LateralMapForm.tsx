import { ChevronLeftIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { clientApi } from '../../../utils/api/clientApi';
import Button from '../../button/Button';
import Input from '../../input/Input';
import MultiSelect from '../../input/MultiSelect';
import FirstHeader from '../../text/FirstHeader';

export default function LateralMapForm({
  setIsFormActive,
}: {
  setIsFormActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [mainTypes, setMainTypes] = useState<{ value: string; label: string; color: string }[]>([]);
  const [selectedMainTypes, setSelectedMainTypes] = useState<
    { value: string; label: string; color: string }[]
  >([]);

  useEffect(() => {
    const getMainTypes = async () => {
      try {
        const response = await clientApi.get('/mainTypes');
        console.log(response.data);
        const items = response.data.map((type: { id: number; name: string; color: string }) => ({
          value: type.id,
          label: type.name,
          color: type.color,
        }));

        setMainTypes(items);
      } catch (error) {
        console.error('Erreur lors du chargement des catégories:', error);
      }
    };

    getMainTypes();
  }, []);

  return (
    <div className={'flex-1'}>
      <Button
        onClick={() => setIsFormActive(false)}
        variant={'tertiary'}
        className={'flex items-center gap-2 mb-4'}
      >
        <ChevronLeftIcon size={16} />
        Retour
      </Button>
      <div className={'flex flex-col items-center gap-4 w-full'}>
        <FirstHeader content={'Ajouter un lieu'} />
        <Input
          name={'label'}
          type={'text'}
          placeholder={'Nom du lieu'}
          value={name}
          setValue={setName}
          errorMessage={''} // FIXME
          className={'w-full'}
        />
        <Input
          name={'description'}
          type={'text'}
          placeholder={'Description du lieu'}
          value={description}
          setValue={setDescription}
          errorMessage={''}
          className={'w-full'}
        />
        <MultiSelect
          label={'Catégorie'}
          name={'mainTypes'}
          type={'single'}
          options={mainTypes}
          placeholder={'Catégorie'}
          className={'w-full'}
          value={selectedMainTypes}
          setValue={setSelectedMainTypes}
        />
        <MultiSelect
          label={'Sous-catégorie'}
          name={'subTypes'}
          type={'single'}
          options={mainTypes}
          placeholder={'Catégorie'}
          className={'w-full'}
          value={selectedMainTypes}
          setValue={setSelectedMainTypes}
          disabled={true}
        />
      </div>
    </div>
  );
}
