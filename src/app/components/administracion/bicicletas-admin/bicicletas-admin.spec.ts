import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BicicletasAdmin } from './bicicletas-admin';

describe('BicicletasAdmin', () => {
  let component: BicicletasAdmin;
  let fixture: ComponentFixture<BicicletasAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BicicletasAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BicicletasAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
