import { Component, OnDestroy, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SidebarComponent, ButtonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {

  public visible = false

  constructor(){}


  ngOnDestroy(): void {

  }
  ngOnInit(): void {

  }

}
