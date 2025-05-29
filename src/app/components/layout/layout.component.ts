import { Component } from '@angular/core';
import { SharedModuleModule } from '../../../shared/modules/shared-module.module';
import { AvatarModule } from 'primeng/avatar';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, SharedModuleModule, AvatarModule, SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  public visible = true

}
