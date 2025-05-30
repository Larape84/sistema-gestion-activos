import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosServiceService {

  public $actualizarSubjet = new Subject<boolean>()
  public $actualizarCardTabla = new Subject<{card?: number, text ?: string, descargar? : boolean}>()


  constructor() { }


  public actualizarTabla(): void {
      this.$actualizarSubjet.next(true)
  }

  public actualizarFiltroCard(index: number): void {
      this.$actualizarCardTabla.next({card:index})
  }

   public actualizarFiltroText(text: string): void {
      this.$actualizarCardTabla.next({text})
  }

   public descargarData(): void {
      this.$actualizarCardTabla.next({descargar: true})
  }









}
