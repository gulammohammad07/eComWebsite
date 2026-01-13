import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LadiesFashions } from './ladies-fashions';

describe('LadiesFashions', () => {
  let component: LadiesFashions;
  let fixture: ComponentFixture<LadiesFashions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LadiesFashions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LadiesFashions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
