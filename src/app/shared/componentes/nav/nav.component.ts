import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { StoreService } from 'src/app/store/store.service';

@Component({
  selector: 'MenuPrincipal',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  items: MenuItem[];
  isAuth: boolean;
  constructor(private AuthService: AuthService) {}

  ngOnInit(): void {
    this.AuthService.isAuth().subscribe((res) => {
      this.isAuth = res;
      this.creaMenu(res);
    });
  }
  creaMenu(estado) {
    const elementosMenu: MenuItem[] = [
      {
        label: 'Inicio',
        routerLink: '/',
      },
      {
        label: 'Contenidos',
        routerLink: '/contenido',
        visible: estado ? true : false,
      },
      {
        label: 'Ingreso',
        routerLink: '/login',
        visible: !estado ? true : false,
      },
      {
        label: 'Salir',
        visible: estado ? true : false,
        command: () => {
          this.sale();
        },
      },
    ];
    this.items = elementosMenu;
  }
  sale() {
    this.AuthService.logout();
  }
}
