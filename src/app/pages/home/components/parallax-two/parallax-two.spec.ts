import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParallaxTwo } from './parallax-two';

describe('ParallaxTwo', () => {
  let component: ParallaxTwo;
  let fixture: ComponentFixture<ParallaxTwo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParallaxTwo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParallaxTwo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
