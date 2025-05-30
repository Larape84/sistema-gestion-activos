import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { SharedModuleModule } from '../../../shared/modules/shared-module.module';
import { TableProductsComponent } from './table-products/table-products.component';
import { ProductosServiceService } from '../../core/services/productos-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalNewProductComponent } from './modal-new-product/modal-new-product.component';
import { SweetAlertServiceService } from '../../core/services/sweet-alert-service.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ButtonModule, AvatarModule, SharedModuleModule, TableProductsComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ProductsComponent implements OnInit, OnDestroy {


  public cardActive = 0
  public dataTarjetas = {dataTotal :0, dataActiva:0, dataInactiva:0, dataTraslado:0}

  constructor(
    private _productoService : ProductosServiceService,
    private _modalDial: MatDialog,
    private _sweetAlerService : SweetAlertServiceService

  ){}


  ngOnDestroy(): void {

  }
  ngOnInit(): void {

  }

  public actualizarRegistros(): void {
    this._productoService.actualizarTabla()
  }

  public filtrarCard(index: number): void {
    this.cardActive = index
    this._productoService.actualizarFiltroCard(index)

  }

   public filtrarText(text: string): void {

    this._productoService.actualizarFiltroText(text)

  }

  public descargarData(): void {
    this._productoService.descargarData()
  }




  public crearproduct(): void {


        this._modalDial.open(ModalNewProductComponent,{
          data: null,
          width:'500px',

        }).afterClosed().subscribe((resp)=>{

          if(!resp){
            return
          }

          this.actualizarRegistros()

        })
     }

}
