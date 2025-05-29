import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { SharedModuleModule } from '../../../shared/modules/shared-module.module';
import { TableProductsComponent } from './table-products/table-products.component';
import { ProductosServiceService } from '../../core/services/productos-service.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ButtonModule, AvatarModule, SharedModuleModule, TableProductsComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ProductsComponent implements OnInit, OnDestroy {


  constructor(
    private _productoService : ProductosServiceService

  ){}


  ngOnDestroy(): void {

  }
  ngOnInit(): void {

  }

  public actualizarRegistros(): void {
    this._productoService.actualizarTabla()
  }

}
