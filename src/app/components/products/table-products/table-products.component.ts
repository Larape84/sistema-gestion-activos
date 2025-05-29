import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { SharedModuleModule } from '../../../../shared/modules/shared-module.module';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MatDialog } from '@angular/material/dialog';
import { ModalNewProductComponent } from '../modal-new-product/modal-new-product.component';
import { SweetAlertServiceService } from '../../../core/services/sweet-alert-service.service';
import { FireStoreServiceService } from '../../../core/services/fire-store-service.service';
import { ProductosServiceService } from '../../../core/services/productos-service.service';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-table-products',
  standalone: true,
  imports: [SharedModuleModule, ButtonModule, MenuModule],
  templateUrl: './table-products.component.html',
  styleUrl: './table-products.component.scss'
})
export class TableProductsComponent implements OnInit , OnDestroy {
  @ViewChild(MatPaginator) public paginator!: MatPaginator;
  public selectProducto = null
  private $suscription = new Subscription();
  private $unsuscribe = new Subject<void>();



  displayedColumns: string[] = ['editar', 'Nombre', 'Categoria', 'Area', 'Custodio', 'fecha', 'estado', 'Valor'  ];

  public items = [
            { label: 'Editar', icon: 'pi pi-pencil',  command: (e:any) => {this.editproduct() } },
            { label: 'Dar de baja', icon: 'pi pi-trash' },
            { label: 'Trasladar', icon: 'pi pi-truck' },
        ];


   dataSource : any = new MatTableDataSource<any>([]);


   constructor(
    private _modalDial : MatDialog,
    private _sweetAlertService : SweetAlertServiceService,
    private _fireService : FireStoreServiceService,
    private _productoService : ProductosServiceService
   ){}


  ngOnDestroy(): void {
    this.$unsuscribe.next()
    this.$unsuscribe.complete()
    this.$suscription.unsubscribe()

  }

  ngOnInit(): void {
    this.obtenerProductos()

    this.$suscription = this._productoService.$actualizarSubjet.pipe(takeUntil(this.$unsuscribe)).subscribe({
      next:(resp)=>{
        this.obtenerProductos()
      }
    })



  }




   public editproduct(): void {
      console.log(this.selectProducto)

      this._modalDial.open(ModalNewProductComponent,{
        data: this.selectProducto,
        width:'500px',

      })
   }


   public obtenerProductos(): void {

    this._sweetAlertService.startLoading({})
    this.dataSource = new MatTableDataSource([])

    this._fireService.getCollection('productos').subscribe({
      next:(resp)=>{
        console.log(resp)
        this.dataSource = new MatTableDataSource(resp)
        this._sweetAlertService.stopLoading();
      },
      error:(e)=>{
        this._sweetAlertService.alertError(e)
      }
    })

   }

}
