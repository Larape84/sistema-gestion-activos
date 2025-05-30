import { Component, OnInit } from '@angular/core';
import { SharedModuleModule } from '../../../shared/modules/shared-module.module';
import { AvatarModule } from 'primeng/avatar';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { Router, RouterOutlet } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { FireStoreServiceService } from '../../core/services/fire-store-service.service';
import { AuthServiceService } from '../../core/services/auth-service.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, SharedModuleModule, AvatarModule, SidebarComponent, MenuModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {

  public user = null
     public items = [
            { label: 'Cerrar sesion', icon: 'pi pi-sign-out', command: (e:any) => { this.cerrarSesion()}  },

        ]

  public visible = true

  constructor(
    private _authService : AuthServiceService,
    private _router : Router
  ){}


  ngOnInit(): void {
    this.obtenerUsuario()
  }

  public obtenerUsuario(): void {
    this.user = this._authService.getUserActive()
    console.log(this.user)


  }

  public cerrarSesion(): void {
    this._authService.cerrarSesion()

  }




}
