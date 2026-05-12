import { Component, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';

import { SharedModule } from '../../shared/shared-module';

@Component({
  selector: 'app-home',
  imports: [SharedModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Home {

}
