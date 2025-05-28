import { Component } from '@angular/core';
import { SharedModuleModule } from '../../../shared/modules/shared-module.module';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [SharedModuleModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {

}
