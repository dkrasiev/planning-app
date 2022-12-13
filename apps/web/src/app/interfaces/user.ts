export interface User {
  username: string;
  id: string;
  email: string;
  role: NameWithId;
  skills: NameWithId[];
  grade?: NameWithId;
  department?: NameWithId;
}

interface NameWithId {
  id: number;
  name: string;
}
