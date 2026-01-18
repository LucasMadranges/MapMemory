export interface MultiSelectTypes {
  id?: number | null;
  value: string | number;
  label: string;
  color: string;
  edges?: { sub_types: MultiSelectTypes[] };
  isSub?: boolean;
  parentId?: number | string;
}
