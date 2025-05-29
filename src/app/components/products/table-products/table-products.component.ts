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
import {formatFirebaseTimestampToDDMMYYYY} from '../../../../shared/utils/luxon.dates'
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
  private $suscriptionCard = new Subscription();

  private $unsuscribe = new Subject<void>();



  displayedColumns: string[] = ['editar', 'Nombre', 'Categoria', 'Area', 'Custodio', 'fecha', 'estado', 'Valor'  ];

  public items = [
            { label: 'Editar', icon: 'pi pi-pencil',  command: (e:any) => {this.editproduct() } },
            { label: 'Dar de baja', icon: 'pi pi-trash' },
            { label: 'Trasladar', icon: 'pi pi-truck' },
        ];


   dataSource : any = new MatTableDataSource<any>([]);
   dataSourceCopy : any = new MatTableDataSource<any>([]);


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

     this.$suscriptionCard = this._productoService.$actualizarCardTabla.pipe(takeUntil(this.$unsuscribe)).subscribe({
      next:(resp)=>{

        if(resp?.text){
          this.dataSource.filter = resp.text;

        }

        if(resp?.card === 0 ){

          this.obtenerProductos()

        }


         else if(resp?.card === 1 ){

          this._sweetAlertService.startLoading({})


          const filtro = this.dataSourceCopy.data.filter((item: any)=> item.estado.id === 'Activo')

          setTimeout(() => {
            this.dataSource = new MatTableDataSource(filtro)
            this._sweetAlertService.stopLoading()
          }, 300);


         }

         else if(resp?.card === 2 ){

          this._sweetAlertService.startLoading({})

          const filtro = this.dataSourceCopy.data.filter((item: any)=>item.estado.id === 'Inactivo')

           setTimeout(() => {
            this.dataSource = new MatTableDataSource(filtro)
            this._sweetAlertService.stopLoading()
          }, 300);


         }

          else if(resp?.card === 3 ){

          this._sweetAlertService.startLoading({})

          const filtro = this.dataSourceCopy.data.filter((item: any)=>item.estado.id === 'Traslado')

           setTimeout(() => {
            this.dataSource = new MatTableDataSource(filtro)
            this._sweetAlertService.stopLoading()
          }, 300);


         }



      }
    })



  }




   public editproduct(): void {
      console.log(this.selectProducto)

      this._modalDial.open(ModalNewProductComponent,{
        data: this.selectProducto,
        width:'500px',

      }).afterClosed().subscribe((resp)=>{

          if(!resp){
            return
          }

          this.obtenerProductos()

        })
   }

   public obtenerColor(estado: string): string {

    if(estado==='Activo'){
      return 'bgActivo'
    }

    else if(estado==='Inactivo'){
      return 'bginactivo'
    }

    else{
      return 'bgTraslado'
    }




   }

   public obtenerProductos(): void {

    this._sweetAlertService.startLoading({})
    this.dataSource = new MatTableDataSource([])

    this._fireService.getCollection('productos').subscribe({
      next:(productos)=>{
        console.log(productos)
        productos.forEach((item: any)=>{
          item['color'] = this.obtenerColor(item.estado.id || '')
          item['fecha'] = formatFirebaseTimestampToDDMMYYYY(item.fechaCreacion)
        })

        this.dataSource = new MatTableDataSource(productos)
        this.dataSourceCopy = new MatTableDataSource(productos)
        this._sweetAlertService.stopLoading();
      },
      error:(e)=>{
        this._sweetAlertService.alertError(e)
      }
    })

   }

}
