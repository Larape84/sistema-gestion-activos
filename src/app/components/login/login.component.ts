import { Component, OnInit } from '@angular/core';
import { SharedModuleModule } from '../../../shared/modules/shared-module.module';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModuleModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  public formLogin : FormGroup = new FormGroup({})

  constructor(
    private _fb :FormBuilder,
    private _route : Router
  ){}


  ngOnInit(): void {
    this.initForm()
  }

  public initForm(): void {
    this.formLogin = this._fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }


  public iniciarSesion(): void {

    this._route.navigateByUrl('/app/products')

  }

}
