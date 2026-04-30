import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UtilsService } from '../../services/utils';

import { SharedModule } from '../../shared/shared';

@Component({
  selector: 'app-auth',
  imports: [
    SharedModule
  ],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth {

  utilsSvc = inject(UtilsService)

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(6)])
  })

  async submit() {
    if (this.form.valid) {
      this.utilsSvc.routerLink("home");
    } else {
      this.form.markAllAsTouched();
    }
  }

}
