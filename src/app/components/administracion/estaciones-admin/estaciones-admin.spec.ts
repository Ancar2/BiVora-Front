import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstacionesAdmin } from './estaciones-admin';

describe('EstacionesAdmin', () => {
  let component: EstacionesAdmin;
  let fixture: ComponentFixture<EstacionesAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstacionesAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstacionesAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
