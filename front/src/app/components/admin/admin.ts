import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import type { User } from '../../services/user';
import { environment } from '../../../environments/environment.production';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  http = inject(HttpClient);
  users = toSignal(this.http.get<User[]>(environment.apiUrl + '/user'));
}
