import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreState } from 'src/app/store/store-interface';
import { StoreService } from 'src/app/store/store.service';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.scss'],
})
export class ContenidoComponent implements OnInit {
  constructor(private STORE: StoreService) {}

  estado$: Observable<StoreState>;

  ngOnInit(): void {
    this.estado$ = this.STORE.globalStateChanged;
  }
}
