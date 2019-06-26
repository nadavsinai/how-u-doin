import {Role} from '@shared/interfaces';

export interface User  {
  displayName: string;
  email: string;
  uid: any;
  roles: Role[]
}

