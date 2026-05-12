import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselOne } from './carousel-one';

describe('CarouselOne', () => {
  let component: CarouselOne;
  let fixture: ComponentFixture<CarouselOne>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselOne]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselOne);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
