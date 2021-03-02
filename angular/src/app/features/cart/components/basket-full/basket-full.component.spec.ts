import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketFullComponent } from './basket-full.component';

describe('BasketFullComponent', () => {
  let component: BasketFullComponent;
  let fixture: ComponentFixture<BasketFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasketFullComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
