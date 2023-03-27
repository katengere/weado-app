import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeadoHomeComponent } from './weado-home.component';

describe('WeadoHomeComponent', () => {
  let component: WeadoHomeComponent;
  let fixture: ComponentFixture<WeadoHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeadoHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeadoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
