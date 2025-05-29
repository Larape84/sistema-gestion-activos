import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerEditProductComponent } from './drawer-edit-product.component';

describe('DrawerEditProductComponent', () => {
  let component: DrawerEditProductComponent;
  let fixture: ComponentFixture<DrawerEditProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerEditProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawerEditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
