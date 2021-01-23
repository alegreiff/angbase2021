import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { MenubarModule } from 'primeng/menubar';

@NgModule({
  declarations: [],
  exports: [ButtonModule, CalendarModule, MenubarModule],
})
export class PrimengModule {}
