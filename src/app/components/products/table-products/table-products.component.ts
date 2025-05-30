import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
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
import {MatSort} from '@angular/material/sort';
import {exportAsExcelFile} from '../../../../shared/utils/excel.export'
import { DataTablePipe } from "../../../../shared/pipes/data.table.pipe";
import { ModalViewPictureProductComponent } from '../modal-view-picture-product/modal-view-picture-product.component';
import { ModalHistoricProductComponent } from '../modal-historic-product/modal-historic-product.component';


@Component({
  selector: 'app-table-products',
  standalone: true,
  imports: [SharedModuleModule, ButtonModule, MenuModule, DataTablePipe],
  templateUrl: './table-products.component.html',
  styleUrl: './table-products.component.scss'
})
export class TableProductsComponent implements OnInit , OnDestroy {
  @ViewChild(MatPaginator) public paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Output() public tarjetaEmiter = new EventEmitter<any>();

  public selectProducto = null
  private $suscription = new Subscription();
  private $suscriptionCard = new Subscription();

  private $unsuscribe = new Subject<void>();



  displayedColumns: string[] = ['editar', 'Nombre', '_categoria', '_area', 'Custodio', 'fecha', '_estado', 'Valor'  ];

  public items = [
            { label: 'Editar', icon: 'pi pi-pencil',  command: (e:any) => {this.editproduct() } },
            { label: 'Dar de baja', icon: 'pi pi-trash', command: (e:any) => {this.udpateEstado('Inactivo') } },
            { label: 'Trasladar', icon: 'pi pi-truck', command: (e:any) => {this.udpateEstado('Traslado') }},
            { label: 'Visualizar producto', icon: 'pi pi-eye', command: (e:any) => { this.visualizarProucto()}},
            { label: 'Ver historico', icon: 'pi pi-history', command: (e:any) => {this.visualizarHistorico()}}

            ,
        ];


   dataSource : any = new MatTableDataSource<any>([]);
   dataSourceCopy : any = new MatTableDataSource<any>([]);


   constructor(
    private _modalDial : MatDialog,
    private _sweetAlertService : SweetAlertServiceService,
    private _fireService : FireStoreServiceService,
    private _productoService : ProductosServiceService,
    private paginatorIntl: MatPaginatorIntl,
   ){
    this.paginatorIntl.itemsPerPageLabel = 'Items por página : ';
   }


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

        if(resp?.descargar){
          this._sweetAlertService.startLoading({})
          const data = this.dataSource.data
          const name = 'Productos_registrados'
          exportAsExcelFile(data, name)
          setTimeout(() => {
            this._sweetAlertService.stopLoading()
          }, 500);

        }

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
            this.dataSource.paginator = this.paginator;
            this._sweetAlertService.stopLoading()
          }, 300);


         }

         else if(resp?.card === 2 ){

          this._sweetAlertService.startLoading({})

          const filtro = this.dataSourceCopy.data.filter((item: any)=>item.estado.id === 'Inactivo')

           setTimeout(() => {
            this.dataSource = new MatTableDataSource(filtro)
            this.dataSource.paginator = this.paginator;
            this._sweetAlertService.stopLoading()
          }, 300);


         }

          else if(resp?.card === 3 ){

          this._sweetAlertService.startLoading({})

          const filtro = this.dataSourceCopy.data.filter((item: any)=>item.estado.id === 'Traslado')

           setTimeout(() => {
            this.dataSource = new MatTableDataSource(filtro)
            this.dataSource.paginator = this.paginator;
            this._sweetAlertService.stopLoading()
          }, 300);


         }



      }
    })



  }

  public visualizarProucto(): void {
    this._modalDial.open(ModalViewPictureProductComponent, {
      data:this.selectProducto,
      width:'700px',
      maxWidth:'90vw',
      maxHeight :'80vh'
    })



  }

  public visualizarHistorico(): void {

    this._sweetAlertService.startLoading({})

    this._fireService.getDocumentsByKey('historico', 'product', this.selectProducto!['id']).subscribe({
      next:(resp)=>{

        this._sweetAlertService.stopLoading()

        this._modalDial.open(ModalHistoricProductComponent, {
          data:{producto: this.selectProducto, moimientos : resp},
          width:'1200px',

          maxWidth:'90vw',
          maxHeight :'80vh'
        })
      },
      error:(e)=>{
        this._sweetAlertService.alertError(e)
      }
    })



  }


  public udpateEstado(estado: string): void {

    const callback = ()=>{
      this._sweetAlertService.startLoading({})

      const payload = {
        estado : {id: estado }
      }

      const id = this.selectProducto!['id']

      const select : any = this.selectProducto
      const historico = {
        ...select,
        ...payload,
        _estado :  estado,
        color : this.obtenerColor(estado),
        product:this.selectProducto!['id']
      }
      console.log(historico)

      this._fireService.updateDocument('productos', id ,payload).subscribe({
        next:(resp)=>{

          this._fireService.crearDocumentoAutoID$('historico', historico).subscribe((resp)=>{
            console.log(resp, 'historico')
          })

          this.obtenerProductos().then(()=>{
            this._sweetAlertService.alertSuccess()
          })



        },
        error:(e)=>{
          this._sweetAlertService.alertError(e)
        }
      })




    }
    this._sweetAlertService.alertConfirmation(callback)



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

   public obtenerProductos(): Promise<void> {

    return new Promise ((resolve, reject)=>{

      this._sweetAlertService.startLoading({})
    this.dataSource = new MatTableDataSource([])

    this._fireService.getCollection('productos').subscribe({
      next:(productos)=>{
        console.log(productos)

        let dataTotal = 0
        let dataActiva = 0
        let dataInactiva = 0
        let dataTraslado = 0


        productos.forEach((item: any)=>{

          item['_estado'] = item.estado.id
          item['_area'] = item.Area.id
          item['_categoria'] = item.Categoria.id


          if(item['_estado']==='Activo'){
                dataActiva = dataActiva + 1
          }

          if(item['_estado']==='Inactivo'){
                dataInactiva = dataInactiva + 1
          }

          if(item['_estado']==='Traslado'){
                dataTraslado = dataTraslado + 1
          }

          dataTotal = dataTotal + 1




          item['color'] = this.obtenerColor(item.estado.id || '')
          item['fecha'] = formatFirebaseTimestampToDDMMYYYY(item.Fecha)
        })

        this.dataSource = new MatTableDataSource(productos)
        this.dataSourceCopy = new MatTableDataSource(productos)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;



        this.tarjetaEmiter.emit({dataTotal, dataActiva, dataInactiva, dataTraslado})


        this._sweetAlertService.stopLoading();
        resolve()
      },
      error:(e)=>{
        reject()
        this._sweetAlertService.alertError(e)
      }
    })


    })


   }

}
