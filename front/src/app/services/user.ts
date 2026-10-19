import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment.production';
import { firstValueFrom, tap } from 'rxjs';

export interface User {
  id: number;
  username: string;
  password?: string;
  firstName?: string;
  lastName?: string;
}
interface RegisterResponse {
  ok: boolean;
  id?: number;
  message?: string;
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  public user = signal<User | null>(null);
  async login(user: User): Promise<RegisterResponse> {
    return firstValueFrom(
      this.http.post<RegisterResponse>(environment.apiUrl + '/login', user).pipe(
        tap((r) => {
          if (r.ok) this.user.set({ id: r.id!, username: user.username });
        }),
      ),
    );
  }
  async register(user: User): Promise<RegisterResponse> {
    return firstValueFrom(
      this.http.post<RegisterResponse>(environment.apiUrl + '/register', user).pipe(
        tap((r) => {
          if (r.ok) this.user.set({ id: r.id!, username: user.username });
        }),
      ),
    );
  }
  async getUser(id: number): Promise<User> {
    return firstValueFrom(this.http.get<User>(environment.apiUrl + '/user/' + id));
  }
}
