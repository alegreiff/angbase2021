import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import { first, map, take, tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { ClientesCuentas } from '../shared/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //private user$: Observable<firebase.User | null>;
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  initAuthListener() {
    this.afAuth.authState.pipe(take(0)).subscribe((fuser: firebase.User) => {
      console.log('Usuario:', fuser?.email);
    });
  }
  isAuth() {
    //TODO: Si existe devuelve TRUE si no existe FALSE
    return this.afAuth.authState.pipe(map((fbUser) => fbUser != null));
  }

  login(email, password) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        this.clienteFirebase(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  logout() {
    this.afAuth.signOut();
  }
  googleAcceso() {
    const proveedor = new firebase.auth.GoogleAuthProvider();
    this.afAuth
      .signInWithPopup(proveedor)
      .then(({ user }) => {
        this.clienteFirebase(user);
      })
      .catch((error) => {});
  }

  clienteFirebase(user: firebase.User) {
    const usuarios = this.db
      .collection('clientescuentas')
      .snapshotChanges()
      .pipe(
        map((res) => {
          return res.map((clientes) => {
            const data = clientes.payload.doc.data();
            return data;
          });
        }),
        map((res: ClientesCuentas[]) => {
          return res.find((usuario) => usuario.uid === user.uid);
        }),
        first()
      )
      .subscribe(
        (res) => {
          if (!res) {
            const nuevoCliente: ClientesCuentas = {
              nombre: 'J',
              uid: user.uid,
              email: user.email,
            };
            this.db.doc(`clientescuentas/${user.uid}`).set({
              ...nuevoCliente,
            });
          } else {
            console.log(' el cabrón ya existe');
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
