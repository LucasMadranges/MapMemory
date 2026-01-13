import { SubTypes } from './subTypes';

export interface MainTypes {
  id: number;
  label: string;
  color: string;
  edges: {
    sub_types: SubTypes[];
  };
}
