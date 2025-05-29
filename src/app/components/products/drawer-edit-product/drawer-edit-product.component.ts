import { Component, Input } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { SharedModuleModule } from '../../../../shared/modules/shared-module.module';
@Component({
  selector: 'app-drawer-edit-product',
  standalone: true,
  imports: [DrawerModule, ButtonModule, SharedModuleModule],
  templateUrl: './drawer-edit-product.component.html',
  styleUrl: './drawer-edit-product.component.scss'
})
export class DrawerEditProductComponent {

  @Input() public visibleEdit = false

}
