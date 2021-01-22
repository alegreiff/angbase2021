import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./componentes/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'contenido',
    loadChildren: () =>
      import('./componentes/contenido/contenido.module').then(
        (m) => m.ContenidoModule
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
