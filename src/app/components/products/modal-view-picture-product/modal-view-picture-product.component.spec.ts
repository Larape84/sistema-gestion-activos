import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewPictureProductComponent } from './modal-view-picture-product.component';

describe('ModalViewPictureProductComponent', () => {
  let component: ModalViewPictureProductComponent;
  let fixture: ComponentFixture<ModalViewPictureProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalViewPictureProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalViewPictureProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
