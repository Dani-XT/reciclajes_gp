import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParallaxOne } from './parallax-one';

describe('ParallaxOne', () => {
  let component: ParallaxOne;
  let fixture: ComponentFixture<ParallaxOne>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParallaxOne]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParallaxOne);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
