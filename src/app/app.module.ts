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

const firebaseUiAuthConfig: any = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    PrimengModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
