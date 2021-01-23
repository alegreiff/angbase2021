import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import firebase from 'firebase/app';
import { first, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { ClientesCuentas, User } from '../shared/interfaces/user';
import { StoreService } from '../store/store.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  subs: Subscription;
  //private user$: Observable<firebase.User | null>;
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private STORE: StoreService,
    private router: Router
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe((fuser: firebase.User) => {
      if (fuser) {
        this.cargaClientes();
        const usuario: User = {
          displayName: fuser.displayName,
          email: fuser.email,
          photoURL: fuser.photoURL,
          uid: fuser.uid,
          emailVerified: fuser.emailVerified,
        };
        this.STORE.addUser(usuario);
      } else {
        this.STORE.addUser(null);
      }
    });
  }
  cargaClientes() {
    this.subs = this.db
      .collection('clientescuentas')
      .valueChanges()
      .subscribe((clientes) => this.STORE.setClientes(clientes));
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
        console.log('Hay un error con los datos del Usuario');
      });
  }
  logout() {
    this.afAuth.signOut();
    this.subs.unsubscribe();
    this.STORE.limpiaClientes();
    this.router.navigateByUrl('/login');
    //this.router.navigateByUrl('/contenido');
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
          }
        },
        (error) => {
          console.log(
            'Hay un error con el registro de este Usuario en la BASE de DATOS'
          );
        }
      );
  }
}
