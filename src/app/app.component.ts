import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { AuthService } from './services/auth.service';
import { StoreService } from './store/store.service';
import { map } from 'rxjs/operators';
import { User } from './shared/interfaces/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  usuarioActivo$: Observable<User | null> = null;
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
  estado: Observable<any>;
  constructor(private AuthService: AuthService, private STORE: StoreService) {
    this.AuthService.initAuthListener();
  }

  ngOnInit() {
    this.usuarioActivo$ = this.STORE.stateChanged.pipe(
      map((state) => state.loggedUser)
    );
    /* setTimeout(function () {
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
    }, 4000); */
  }

  logout() {
    this.AuthService.logout();
  }
}
