import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class SweetAlertServiceService {

  constructor() { }


    public startLoading({ title = 'Cargando', html = 'Por favor espere' }): void {

    Swal.fire({ title, html, allowOutsideClick: false, allowEscapeKey:false, backdrop:true, timer: 500000, didOpen: () => { Swal.showLoading() }, })

  }

  public stopLoading(): void {
    Swal.close();
  }


  public async alertConfirmation(callBack: Function): Promise<void> {
    Swal.fire({
      allowOutsideClick: false,
      backdrop: true,
      title: '¿Estas seguro?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      customClass: {
        actions: 'flex-row-reverse gap-2',
        cancelButton: 'rounded-full w-26 bg-gray-500 ring-0',
        confirmButton: 'rounded-full w-26 ring-0'
      }
    }).then((result: any) => {
      if (result.isConfirmed) {
        callBack();
      }
    })
  }



  public alertSuccess(text?: string, accion?:any): Promise<void> {

    return new Promise ((resolve)=>{
      text = text || 'Solicitud realizada correctamente'
      const alert = Swal.fire({
        allowOutsideClick: true,
        backdrop: true,
        title: 'Correcto!',
        html: text,
        icon: 'success',
        confirmButtonColor: '#3085d6',
        customClass: {
          confirmButton: 'rounded-full w-20 bg-blue-400 ring-0'
        }
      }).then(()=>{

          resolve()
      })

    })
  }

  public alertError(param?:any): void {



    Swal.fire({
      allowOutsideClick: false,
      allowEscapeKey:false,
      backdrop: true,
      title: 'Error!',
      text: param?.text  || param?.error?.message || param?.message || "Su solicitud no pudo ser procesada, por favor intente nuevamente",
      icon: 'error',
      customClass: {
        confirmButton: 'rounded-full w-20 bg-gray-400 ring-0'
      }
    })
  }

  public alertInfo({ info = 'Lo sentimos, no se encontraron registros en la consulta' }): Promise<void> {

    return new Promise ((resolve)=>{


      Swal.fire({
        allowOutsideClick: false,
        allowEscapeKey:false,
        backdrop: true,
        text: info,
        icon: 'info',
        customClass: {
          confirmButton: 'rounded-full w-20 bg-gray-400 ring-0'
        }
      }).then(()=>{
        resolve()
      })


    })
  }







}
