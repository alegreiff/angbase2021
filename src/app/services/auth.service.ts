import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: Observable<firebase.User | null>;
  constructor(private afAuth: AngularFireAuth) {}
}
