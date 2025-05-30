import { Component, OnInit } from '@angular/core';
import { SharedModuleModule } from '../../../../shared/modules/shared-module.module';
import { AuthServiceService } from '../../../core/services/auth-service.service';
import { SweetAlertServiceService } from '../../../core/services/sweet-alert-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FireStoreServiceService } from '../../../core/services/fire-store-service.service';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ErrorServiceService } from '../../../core/services/error-service.service';
import { ValidarSoloLetrasSinEspacio, ValidatorPasswordMatch } from '../../../../shared/validators/input.Validator';


@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [SharedModuleModule, InputTextModule,PasswordModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent implements OnInit {

  public formUser : FormGroup = new FormGroup({})

  constructor(
    private _authService : AuthServiceService,
    private _sweetAlert : SweetAlertServiceService,
    private _fb : FormBuilder,
    private _fireService : FireStoreServiceService,
    private _router : Router,
    public errorService : ErrorServiceService

  ){}


  ngOnInit(): void {
    this.initForm()

  }


  public initForm(): void {
    this.formUser = this._fb.group({
      user : ['', [Validators.required, ValidarSoloLetrasSinEspacio()]],
      password : ['', [Validators.required]],
      repeatPass : ['', [Validators.required]]
    }, { validator: ValidatorPasswordMatch('password', 'repeatPass') })
  }


  public crearUsuario(): void {


     if(this.formUser.invalid){
      this._sweetAlert.alertInfo({info:'Por favor verificar, existen campos no validos o por requerir.'})

      return
    }

    this._sweetAlert.startLoading({})
      const formUser = this.formUser.getRawValue()

      formUser['user']= String(formUser.user).toUpperCase()
      formUser['password']= String(formUser.password).toUpperCase()

      this._fireService.getDocumentId('usuarios', formUser['user']).subscribe({
        next:(resp)=>{

          if(!!resp){
            this._sweetAlert.alertInfo({info:'Su usuario ya se encuentra registrado, por favor inicie sesión'}).then(()=>{
              this._router.navigateByUrl('/login/auth')
            })
            return
          }

          this._fireService.createDocumentWithId('usuarios',formUser.user,formUser).subscribe({
        next:(resp)=>{

          this._sweetAlert.alertSuccess().then(()=>{
            this._router.navigateByUrl('/login/auth')
          })


        },
        error:(e)=>{

          this._sweetAlert.alertError(e)
        }
      })




        },
        error:(e)=>{


          this._sweetAlert.alertError(e)




        }
      })





  }

}
