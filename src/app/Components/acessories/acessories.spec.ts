import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Acessories } from './acessories';

describe('Acessories', () => {
  let component: Acessories;
  let fixture: ComponentFixture<Acessories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Acessories]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Acessories);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
