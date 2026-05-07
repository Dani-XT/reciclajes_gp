import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { UtilsService } from './utils';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly apiUrl = environment.urlBase;

  private readonly http = inject(HttpClient);
  private readonly utilsSvc = inject(UtilsService);

  constructor() {
    console.log('URL BASE API:', this.apiUrl);
  }

  createUser() {}

  loginUser() {}

  getUser() {}

  updateUser() {}

  deleteUser() {}

  signOut() {}
}