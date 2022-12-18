import { Project } from '../projects/project';
import { User } from '../users/interfaces/user';

export interface Application {
  id: number;
  hours: number;
  weekId: number;
  employee: User;
  creator: User;
  project: Project;
  description: string;
  confirmed: boolean;
}
