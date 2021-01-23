import { User } from '../shared/interfaces/user';
export interface StoreState {
  loggedUser: User | null;
  nombre: string;
  clientes: clienteCuentas[];
}

export interface clienteCuentas {
  email: string;
  nombre: string;
  uid: string;
}
