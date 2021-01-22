import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { firebase, firebaseui, FirebaseUIModule } from 'firebaseui-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrimengModule } from './shared/primeng.module';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import {
  IpValidator,
  IpValidatorMessage,
  validateMaxLength,
  validateMinLength,
  validateRequired,
} from './shared/mensajes-validacion';
import { FormlyFieldCalendar } from './shared/ff-calendar';

const firebaseUiAuthConfig: any = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

@NgModule({
  declarations: [AppComponent, FormlyFieldCalendar],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    PrimengModule,
    FormlyModule.forRoot({
      extras: { lazyRender: true },
      types: [{ name: 'datepicker', component: FormlyFieldCalendar }],
      validationMessages: [
        { name: 'required', message: validateRequired },
        { name: 'ip', message: IpValidatorMessage },
        //{ name: 'nombreProyecto', message: validateRequired },
        { name: 'minlength', message: validateMinLength },
        { name: 'maxlength', message: validateMaxLength },
      ],
      validators: [{ name: 'ip', validation: IpValidator }],
    }),
    FormlyPrimeNGModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
