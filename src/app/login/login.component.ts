import { Component } from '@angular/core';
import { SharedModuleModule } from '../../shared/modules/shared-module.module';
import { RouterOutlet } from '@angular/router';
import { AuthUserComponent } from './auth-user/auth-user.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModuleModule, RouterOutlet, AuthUserComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
