import { Component, OnInit } from '@angular/core';
import { SharedModuleModule } from '../../../shared/modules/shared-module.module';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FireStoreServiceService } from '../../core/services/fire-store-service.service';
import { SweetAlertServiceService } from '../../core/services/sweet-alert-service.service';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ErrorServiceService } from '../../core/services/error-service.service';
import { ValidarSoloLetrasSinEspacio } from '../../../shared/validators/input.Validator';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModuleModule, InputTextModule,PasswordModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  public formLogin : FormGroup = new FormGroup({})

  constructor(
    private _fb :FormBuilder,
    private _route : Router,
    private _fireService : FireStoreServiceService,
    private _sweetAletService : SweetAlertServiceService,
    public errorService : ErrorServiceService
  ){}


  ngOnInit(): void {
    this.initForm()
  }

  public initForm(): void {
    this.formLogin = this._fb.group({
      user: ['', [Validators.required, ValidarSoloLetrasSinEspacio()]],
      password: ['', [Validators.required]]
    })
  }


  public iniciarSesion(): void {

    const formUser = this.formLogin.value
    formUser['user'] = String(formUser['user']).toUpperCase()

    if(this.formLogin.invalid){
    this._sweetAletService.alertInfo({info:'Por favor ingrese su usuario y contraseña para iniciar sesión'})

      return
    }


    this._sweetAletService.startLoading({})


    this._fireService.getDocumentLogin('usuarios',formUser['user'], formUser.password).subscribe({
      next:(resp)=>{

        if(!resp){
        this._sweetAletService.alertInfo({info:'Usuario o contraseña incorrecto, por favor intente nuevamente'})
        return
        }

        const user = btoa(JSON.stringify(resp))
        sessionStorage.setItem(btoa('user'), user )
        this._route.navigateByUrl('/app/products')
      },
      error:(e)=>{

        this._sweetAletService.alertError(e)
      }
    })





  }

}
