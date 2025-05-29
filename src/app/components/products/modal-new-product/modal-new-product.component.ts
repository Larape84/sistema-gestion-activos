import { Component, OnInit } from '@angular/core';
import { SharedModuleModule } from '../../../../shared/modules/shared-module.module';
import { InputTextModule } from 'primeng/inputtext';
import { SweetAlertServiceService } from '../../../core/services/sweet-alert-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FireStoreServiceService } from '../../../core/services/fire-store-service.service';



@Component({
  selector: 'app-modal-new-product',
  standalone: true,
  imports: [SharedModuleModule, InputTextModule ],
  templateUrl: './modal-new-product.component.html',
  styleUrl: './modal-new-product.component.scss'
})
export class ModalNewProductComponent implements OnInit{

  public file: any = []
  public selectedFileInfo : any = null
  public formProducto : FormGroup = new FormGroup({})


  constructor(
    private Sweetalert2Service : SweetAlertServiceService,
    private _fb : FormBuilder,
    private _firebase : FireStoreServiceService
  ){}


  ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.formProducto = this._fb.group({
          Nombre: ['', [Validators.required]],
          Categoria: ['', [Validators.required]],
          Area: ['', [Validators.required]],
          Custodio: ['', [Validators.required]],
          Fecha: ['', [Validators.required]],
          Valor: ['', [Validators.required]],


    })

  }

  public guardarProducto(): void {

    const callback=()=>{

       const form = this.formProducto.getRawValue()

    const payload = {
      userCreacion : '',
      fechaCreacion : new Date(),
      estado: 'Activo',
      ...form
    }
    this.Sweetalert2Service.startLoading({})

    this._firebase.createDocumentWithImage('productos', payload, this.file).subscribe({
      next:(resp)=>{
        console.log(resp)
        this.Sweetalert2Service.alertSuccess()

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
