import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ParallaxTwoDirective } from '../../../../directives/parallax-two';

@Component({
  selector: 'app-parallax-two',
  imports: [CommonModule, ParallaxTwoDirective],
  templateUrl: './parallax-two.html',
  styleUrl: './parallax-two.css',
})
export class ParallaxTwo {

}
