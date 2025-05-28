import { Component, OnInit } from '@angular/core';
import { SharedModuleModule } from '../../../../shared/modules/shared-module.module';
import { AuthServiceService } from '../../../core/services/auth-service.service';
import { SweetAlertServiceService } from '../../../core/services/sweet-alert-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FireStoreServiceService } from '../../../core/services/fire-store-service.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [SharedModuleModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent implements OnInit {

  public formUser : FormGroup = new FormGroup({})

  constructor(
    private _authService : AuthServiceService,
    private _sweetAlert : SweetAlertServiceService,
    private _fb : FormBuilder,
    private _fireService : FireStoreServiceService

  ){}


  ngOnInit(): void {
    this.initForm()
    this._authService.logout()
  }


  public initForm(): void {
    this.formUser = this._fb.group({
      user : ['', [Validators.required]],
      password : ['', [Validators.required]],
      repeatPass : ['', [Validators.required]]
    })
  }


  public crearUsuario(): void {

    this._sweetAlert.startLoading({})

    const iniciarSesion = new Promise <any> ((resolve, reject)=>{
      this._authService.login().subscribe({
        next:(resp)=>{
          resolve(resp)
        },
        error:(e)=>{
          reject(e)
        },
      })
    })



    iniciarSesion.then((user)=>{

      const formUser = this.formUser.getRawValue()
      const userValue = {...user, ...formUser}

      console.log(userValue, 'uservalue')

      this._fireService.createDocumentWithId('usuarios',userValue.user,userValue).subscribe({
        next:(resp)=>{
          console.log(resp, 'usuariosCreado')
          this._sweetAlert.alertSuccess()
           this._authService.logout()

        },
        error:(e)=>{
          console.log(e, 'error')
          this._sweetAlert.alertError(e)
        }
      })

    }).catch((e)=>{
      this._sweetAlert.alertError(e)
    })

  }

}
