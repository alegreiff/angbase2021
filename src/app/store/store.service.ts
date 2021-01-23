import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { StoreState } from './store-interface';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class StoreService extends ObservableStore<StoreState> {
  initialState: StoreState = {
    loggedUser: null,
    nombre: 'Jaime',
    clientes: [],
  };
  constructor() {
    super({ trackStateHistory: true, logStateChanges: true });
    this.setState(this.initialState, 'ESTADO_INICIAL');
  }

  addUser(user: any) {
    //console.log('recibe USER', user);
    this.setState({ loggedUser: user }, 'add_user');
  }
  getUser() {
    this.getState().loggedUser;
  }
  setClientes(clientes) {
    this.setState({ clientes: clientes }, 'CARGA_CLIENTES');
  }
  limpiaClientes() {
    this.setState({ clientes: [] }, 'LIMPIA_CLIENTES');
  }
}
