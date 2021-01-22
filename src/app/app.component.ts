import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  //public user: User;
  public miuser: Observable<firebase.User | null>;
  private user: Observable<firebase.User | null>;
  title = 'authformas';

  form = new FormGroup({});
  model = { email: 'email@gmail.com' };
  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email address',
        placeholder: 'Enter email',
        required: true,
      },
    },
  ];

  constructor(
    private AuthService: AuthService,
    private afAuth: AngularFireAuth
  ) {
    this.AuthService.initAuthListener();
  }

  async login() {
    const result = await this.afAuth
      .signInWithEmailAndPassword('test@test.es', '123456')
      .then((res) => console.log(res));
  }
  ngOnInit() {
    //this.login();
    this.afAuth.signOut();
    this.miuser = this.afAuth.user;
    setTimeout(function () {
      var buttonGoogle = document.querySelector(
        '[data-provider-id="google.com"]'
      );
      var buttonEmail = document.querySelector('[data-provider-id="password"]');

      if (buttonGoogle) {
        var espan = document.getElementsByClassName(
          'firebaseui-idp-text-long'
        )[0];
        espan.innerHTML = 'Ingresar con Google hack baratelli';
      }
      if (buttonEmail) {
        var espan = document.getElementsByClassName(
          'firebaseui-idp-text-long'
        )[1];
        espan.innerHTML = 'Ingresar con correo electrónico';
      }
    }, 4000);
  }

  onSubmit(model) {
    console.log(this.model, model);
  }
}
