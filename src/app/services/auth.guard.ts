import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private AuthService: AuthService, private router: Router) {}
  canActivate(): Observable<boolean> {
    return this.AuthService.isAuth().pipe(
      tap((estado) => console.log('Zcecheando el estatus', estado)),
      tap((estado) => {
        if (!estado) {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
