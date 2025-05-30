import { Component, Inject, OnInit } from '@angular/core';
import { SharedModuleModule } from '../../../../shared/modules/shared-module.module';
import { InputTextModule } from 'primeng/inputtext';
import { SweetAlertServiceService } from '../../../core/services/sweet-alert-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FireStoreServiceService } from '../../../core/services/fire-store-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { ErrorServiceService } from '../../../core/services/error-service.service';
import {exportToDatePicker, formatFirebaseTimestampToDDMMYYYY} from '../../../../shared/utils/luxon.dates'
import { AuthServiceService } from '../../../core/services/auth-service.service';



@Component({
  selector: 'app-modal-new-product',
  standalone: true,
  imports: [SharedModuleModule, InputTextModule, SelectModule, DatePickerModule ],
  templateUrl: './modal-new-product.component.html',
  styleUrl: './modal-new-product.component.scss'
})
export class ModalNewProductComponent implements OnInit{

  public file: any = []
  public selectedFileInfo : any = null
  public formProducto : FormGroup = new FormGroup({})

  public categorias = [
    {id:'Lacteos y huevos'},
    {id:'Panaderia y reposteria'},
    {id:'Para la casa'},
    {id:'Para la despensa'},
    {id:'Para la nevera'},
    {id:'Para los antojos dulces'},
    {id:'Bebidas'},
  ]

  public areas = [
  { id: 'Ventas' },
  { id: 'Logística y Distribución' },
  { id: 'Atención al Cliente' },
  { id: 'Almacén' },
  { id: 'Regulación Sanitaria' }
];

public estados = [
  { id: 'Activo' },
  { id: 'Inactivo' },
  { id: 'Traslado' },

];

  constructor(
    private Sweetalert2Service : SweetAlertServiceService,
    private _fb : FormBuilder,
    private _firebase : FireStoreServiceService,
    private _modalref : MatDialogRef<ModalNewProductComponent>,
    public errorService : ErrorServiceService,
    private authService : AuthServiceService,
    @Inject(MAT_DIALOG_DATA) public data : any = null
  ){}


  ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {

    const validNum = /^\d+$/



    this.formProducto = this._fb.group({
          Nombre: [this.data?.Nombre || '', [Validators.required]],
          Categoria: [this.data?.Categoria || '', [Validators.required]],
          Area: [this.data?.Area || '', [Validators.required]],
          Custodio: [this.data?.Custodio || '', [Validators.required]],
          Fecha: [exportToDatePicker(this.data?.Fecha || ''), [Validators.required]],
          Valor: [this.data?.Valor || '', [Validators.required, Validators.pattern(validNum) ]],


    })

    if(!!this.data){
      const estado = new FormControl(this.data.estado)
      this.formProducto.addControl('estado', estado)
      this.selectedFileInfo = {
        name: this.data.filename,
        size :this.data.filezize
      }
    }

  }

  public cerrarModal(): void {
    this._modalref.close()
  }

  public actualizarProducto(): void {

     if (this.formProducto.invalid){
      this.Sweetalert2Service.alertInfo({info:'Por favor verificar, existen campos inválidos o por requerir.'})
      return
    }

    if (!this.selectedFileInfo){
      this.Sweetalert2Service.alertInfo({info:'Por favor validar, debe anexar foto del producto'})
      return
    }


    const callback=()=>{

      const form = this.formProducto.getRawValue()
      this.Sweetalert2Service.startLoading({})

      const user = this.authService.getUserActive()

    const payload = {

      userModificacion : user.id,
      fechaModificacion : new Date(),
      ...form,
      fecha : formatFirebaseTimestampToDDMMYYYY(form.Fecha),
      _area : form.Area.id,
      _categoria : form.Categoria.id,
      _estado : form.estado.id,
    }



    this._firebase.updateDocument('productos', this.data.id, payload).subscribe({
      next:(resp)=>{

        this._firebase.crearDocumentoAutoID$('historico', {...this.data, ...payload, product:this.data.id }).subscribe()

        this.Sweetalert2Service.alertSuccess().then(()=>{
          this._modalref.close(true)
        })

      },
      error:(e)=>{
        this.Sweetalert2Service.alertError(e)
      }
    })


    }

     this.Sweetalert2Service.alertConfirmation(callback)







  }

  public guardarProducto(): void {


    if (this.formProducto.invalid){
      this.Sweetalert2Service.alertInfo({info:'Por favor verificar, existen campos inválidos o por requerir.'})
      return
    }

    if (!this.selectedFileInfo){
      this.Sweetalert2Service.alertInfo({info:'Por favor validar, debe anexar foto del producto'})
      return
    }


      const callback=()=>{

        const form = this.formProducto.getRawValue()

        const user = this.authService.getUserActive()

    const payload = {
      userCreacion : user.id,
      userModificacion : user.id,
      fechaModificacion: new Date(),
      fechaCreacion : new Date(),
      estado: { id: 'Activo' },
      filename: this.selectedFileInfo.name,
      filezize :this.selectedFileInfo.size,
      ...form
    }

    this.Sweetalert2Service.startLoading({})



    this._firebase.createDocumentWithImage('productos', payload, this.file).subscribe({
      next:(resp)=>{

        const product = {
          ...payload, product:resp,
          _area : form.Area.id,
          _categoria : form.Categoria.id,
          _estado : 'Activo',
          fecha: formatFirebaseTimestampToDDMMYYYY(form.Fecha)

        }

        this._firebase.crearDocumentoAutoID$('historico', product).subscribe()

        this.Sweetalert2Service.alertSuccess().then(()=>{
          this._modalref.close(true)
        })

      },
      error:(e)=>{
        this.Sweetalert2Service.alertError(e)
      }
    })




    }



    this.Sweetalert2Service.alertConfirmation(callback)








  }


  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const [filesArray] = Array.from(input.files);
      this.file = filesArray
      this.selectedFileInfo = {
        name : filesArray.name,
        size : this.formatBytes(filesArray.size)
      }

       const allAreImages = [filesArray].every(file => file.type.startsWith('image/'));

      if (!allAreImages) {
        this.Sweetalert2Service.alertInfo({ info: `Lo sentimos, solo se permiten archivos de IMAGEN` });
        this.file = [];
        this.selectedFileInfo = null
        input.value = '';
        return;
      }









    } else {
      this.selectedFileInfo = null;
      this.file = []
    }
  }

  private formatBytes(bytes: number, decimals = 2): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }




      public borrarArchivo(input: any): void {


         this.file = null
         this.selectedFileInfo = null
         input.value = ''



     }




       onDragOver(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
      }

      onDrop(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();

      }



}
