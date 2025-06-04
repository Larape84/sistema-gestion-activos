import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModuleModule } from '../../../../shared/modules/shared-module.module';
import { DataTablePipe } from "../../../../shared/pipes/data.table.pipe";
import { MatTableDataSource } from '@angular/material/table';
import { exportAsExcelFile } from '../../../../shared/utils/excel.export';
import { SweetAlertServiceService } from '../../../core/services/sweet-alert-service.service';
import { ButtonModule } from 'primeng/button';
import { formatFirebaseTimestampToDDMMYYYY } from '../../../../shared/utils/luxon.dates';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-modal-historic-product',
  standalone: true,
  imports: [SharedModuleModule, DataTablePipe, ButtonModule],
  templateUrl: './modal-historic-product.component.html',
  styleUrl: './modal-historic-product.component.scss'
})
export class ModalHistoricProductComponent implements OnInit, AfterViewInit{

  @ViewChild(MatPaginator) public paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public displayedColumns: string[] = ['usuario','Nombre', '_categoria', '_area', 'Custodio', 'fecha', '_estado', 'Valor'  ];
  public dataSource = new MatTableDataSource([])

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any = null,
    private dialoRef: MatDialogRef<ModalHistoricProductComponent>,
    private _sweetAlertService : SweetAlertServiceService
  ){}


  ngAfterViewInit(): void {
    this.formatData()
  }


  ngOnInit(): void {
     console.log(this.data)


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

  ordenarPorFechaDesc(data: any[]): any[] {
  return data.sort((a, b) => {
    const fechaA = new Date(a.fechaModificacion.seconds * 1000);
    const fechaB = new Date(b.fechaModificacion.seconds * 1000);
    return fechaB.getTime() - fechaA.getTime();
  });
}




  public formatData(): void {

        this.data.moimientos.forEach((element: any) => {

          element['color'] = this.obtenerColor(element['estado'].id)
          element['fechaM'] = formatFirebaseTimestampToDDMMYYYY(element.fechaModificacion)

          element['_categoria'] = element['Categoria'].id
          element['_area'] = element['Area'].id
          element['_estado']= element['estado'].id




        });

        const ordenado : any = this.ordenarPorFechaDesc(this.data.moimientos)

        this.dataSource = new MatTableDataSource(ordenado)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;


  }


  public cerrarmodal(): void {
      this.dialoRef.close()
  }

  public filtrarText(text: string): void {
    this.dataSource.filter = text
  }

  public descargarData(): void {


              this._sweetAlertService.startLoading({})
              const data = this.dataSource.data
              const name = 'Historico_productos'
              exportAsExcelFile(data, name)
              setTimeout(() => {
                this._sweetAlertService.stopLoading()
              }, 500);





  }

}
