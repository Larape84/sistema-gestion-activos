import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHistoricProductComponent } from './modal-historic-product.component';

describe('ModalHistoricProductComponent', () => {
  let component: ModalHistoricProductComponent;
  let fixture: ComponentFixture<ModalHistoricProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalHistoricProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalHistoricProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
