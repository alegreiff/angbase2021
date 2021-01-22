import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { AuthService } from './../../services/auth.service';
import firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form = new FormGroup({});
  model = { email: 'test@test.es', password: '123456' };
  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Correo electrónico',
        placeholder: 'Correo electrónico',
        required: true,
      },
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        required: true,
        type: 'password',
      },
    },
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
  onSubmit() {
    console.log(this.model);
    const { email, password } = this.model;
    this.authService.login(email, password);
  }
  logout() {
    this.authService.logout();
  }
  googleAcceso() {
    this.authService.googleAcceso();
  }
}
