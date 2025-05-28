import { Component } from '@angular/core';
import { SharedModuleModule } from '../../../shared/modules/shared-module.module';

@Component({
  selector: 'app-auth-user',
  standalone: true,
  imports: [SharedModuleModule],
  templateUrl: './auth-user.component.html',
  styleUrl: './auth-user.component.scss'
})
export class AuthUserComponent {

}
