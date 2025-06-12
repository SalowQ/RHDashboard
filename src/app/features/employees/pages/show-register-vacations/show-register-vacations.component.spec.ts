import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRegisterVacationsComponent } from './show-register-vacations.component';

describe('ShowRegisterVacationsComponent', () => {
  let component: ShowRegisterVacationsComponent;
  let fixture: ComponentFixture<ShowRegisterVacationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowRegisterVacationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowRegisterVacationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
