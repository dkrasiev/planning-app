import { Right } from './right';

export interface Role {
  id: number;
  name: string;
  rights: Right[];
}
