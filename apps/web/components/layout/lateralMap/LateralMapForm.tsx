import { ChevronLeftIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { clientApi } from '../../../utils/api/clientApi';
import { MultiSelectTypes } from '../../../utils/types/multiSelectTypes';
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
  const [mainTypes, setMainTypes] = useState<MultiSelectTypes[]>([]);
  const [selectedMainTypes, setSelectedMainTypes] = useState<MultiSelectTypes[]>([]);
  const [subTypes, setSubTypes] = useState<MultiSelectTypes[]>([]);
  const [selectedSubTypes, setSelectedSubTypes] = useState<MultiSelectTypes[]>([]);
  const [subTypesDisabled, setSubTypesDisabled] = useState(true);

  useEffect(() => {
    async function getMainTypes() {
      try {
        const response = await clientApi.get('/mainTypes');
        setMainTypes(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des catégories:', error);
      }
    }

    getMainTypes();
  }, []);

  console.log(mainTypes);
  console.log(selectedMainTypes);

  /*  useEffect(() => {
    async function getSubTypes() {
      try {
        const response = await clientApi.get(`/subTypes/${selectedMainTypes[0].value}`);
        setSubTypesDisabled(false);
        setSubTypes(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des sous-catégories:', error);
      }
    }

    getSubTypes();
  }, [selectedMainTypes]);*/

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
          errorMessage={''} // FIXME
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
          options={subTypes}
          placeholder={'Catégorie'}
          className={'w-full'}
          value={selectedSubTypes}
          setValue={setSelectedSubTypes}
          disabled={subTypesDisabled}
        />
      </div>
    </div>
  );
}
