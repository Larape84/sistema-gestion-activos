import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosServiceService {

  public $actualizarSubjet = new Subject<boolean>()

  constructor() { }


  public actualizarTabla(): void {
      this.$actualizarSubjet.next(true)
  }







}
