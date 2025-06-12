import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRegisterEmployeeComponent } from './show-register-employee.component';

describe('ShowRegisterEmployeeComponent', () => {
  let component: ShowRegisterEmployeeComponent;
  let fixture: ComponentFixture<ShowRegisterEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowRegisterEmployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowRegisterEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
