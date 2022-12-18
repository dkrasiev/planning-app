import { Department } from '../../departments/department';
import { Grade } from '../../grades/grade';
import { Skill } from '../../skills/skill';
import { Right } from './right';

export interface User {
  username: string;

  firstName: string;
  lastName: string;

  skills: Skill[];
  role: Role;

  department?: Department;
  grade?: Grade;
  email?: string;
}

export interface Role {
  id: number;
  name: string;
  rights: Right[];
}
