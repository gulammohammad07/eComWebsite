import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderShow } from './order-show';

describe('OrderShow', () => {
  let component: OrderShow;
  let fixture: ComponentFixture<OrderShow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderShow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderShow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
