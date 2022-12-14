import { Department } from '../../departments/department';
import { Grade } from '../../grades/grade';
import { Skill } from '../../skills/skill';

export interface User {
  uid: string;
  username: string;

  skills: Skill[];
  department: Department;
  grade: Grade;
  role: Role;

  email?: string;
}

export interface Role {
  id: number;
  name: string;
  rights: Right[];
}

export interface Right {
  id: number;
  name: string;
}
