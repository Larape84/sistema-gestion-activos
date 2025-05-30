import { Component, Inject, OnInit } from '@angular/core';
import { SharedModuleModule } from '../../../../shared/modules/shared-module.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-modal-view-picture-product',
  standalone: true,
  imports: [SharedModuleModule],
  templateUrl: './modal-view-picture-product.component.html',
  styleUrl: './modal-view-picture-product.component.scss'
})
export class ModalViewPictureProductComponent implements OnInit {

  public url = null

  constructor(
    @Inject(MAT_DIALOG_DATA) public data : any = null,
    private _modalRef : MatDialogRef<ModalViewPictureProductComponent>
  ){

  }


  ngOnInit(): void {
    console.log(this.data)
    this.url = this.data.imageUrl
  }


  public cerrarmodal(): void {
      this._modalRef.close()
  }
}
