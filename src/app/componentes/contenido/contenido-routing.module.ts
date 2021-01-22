import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContenidoComponent } from './contenido.component';

const routes: Routes = [{ path: '', component: ContenidoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContenidoRoutingModule { }
