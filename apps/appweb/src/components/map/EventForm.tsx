import { Download } from '../icons/Download';
import Input from '../inputs/Input';
import Textarea from '../inputs/Textarea';
import Button from '../buttons/Button';

export default function EventForm() {
  return (
    <div className="flex flex-col items-center p-8 w-[calc(100%-32px-64px-32px)] bg-white overflow-auto h-full rounded-xl">
      <h1 className="text-yellow text-xl mb-2 text-center">
        Créer un évènement
      </h1>
      <div className="p-8 h-48 w-full border border-gray-400 border-dashed rounded-md flex flex-col items-center justify-center gap-4 text-gray-400 mb-4">
        <Download className={'w-8 h-8'} />
        <div className="flex flex-col items-center justify-center">
          <span>Cliquer ou glissez-déposez une image</span>
          <span>JPG, PNG ou WEBP</span>
          <span>25mb max</span>
        </div>
      </div>
      <span>Aucune image ajoutée</span>
      <div className="border-b border-gray-200 rounded-full w-full my-4"></div>
      <div className="flex flex-col gap-1 w-full mb-4">
        <Input
          name={'title'}
          label={'Titre'}
          placeholder={'Ajouter un titre'}
          type={'text'}
          value={''}
          containerClassName={'mb-2 text-base'}
          onChange={() => console.log('Changed')}
        />
      </div>
      <div className="flex flex-col gap-1 w-full mb-4">
        <Textarea
          name={'description'}
          label={'Description'}
          placeholder={'Ajouter une description'}
          value={''}
          containerClassName={'text-base'}
          onChange={() => console.log('Changed')}
        />
      </div>
      <div className="flex flex-col gap-1 w-full mb-4">
        <label htmlFor="peopleSelect" className="text-base">
          Personnes
        </label>
        <select
          id="peopleSelect"
          name="peopleSelect"
          className="border border-gray-300 rounded-lg w-full p-1 focus-visible:outline-0"
        >
          <option value="">Sélectionner une personne</option>
          <option value="person1">Personne 1</option>
          <option value="person2">Personne 2</option>
          <option value="person3">Personne 3</option>
        </select>
        <div id="selectedPeople" className="mt-1 hidden"></div>
      </div>
      <div className="flex flex-col gap-1 w-full mb-4">
        <Input
          name={'place'}
          label={'Lieu'}
          placeholder={'Ajouter un lieu'}
          type={'text'}
          value={''}
          containerClassName={'mb-2 text-base'}
          onChange={() => console.log('Changed')}
        />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <Input
          name={'date'}
          label={'Date'}
          placeholder={'Ajouter une date'}
          type={'date'}
          value={''}
          containerClassName={'mb-8 text-base'}
          onChange={() => console.log('Changed')}
        />
      </div>

      <Button
        type={'primary'}
        onClick={() => console.log('Clicked')}
        className={'py-2 rounded-xl w-full'}
      >
        Créer l&#39;évènement
      </Button>
    </div>
  );
}
