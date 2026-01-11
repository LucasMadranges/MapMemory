import { SubTypes } from './subTypes';

export interface MainTypes {
  id: number;
  name: string;
  color: string;
  edges: {
    sub_types: SubTypes[];
  };
}
