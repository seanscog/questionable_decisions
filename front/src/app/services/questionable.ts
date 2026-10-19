import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.production';
import { firstValueFrom, tap } from 'rxjs';
import { QuestionableSchema } from '../questionable-schema';
import { UserService } from './user';

interface PostResponse {
  ok: boolean;
  id?: string;
  message?: string;
}
@Injectable({
  providedIn: 'root',
})
export class QuestionableService {
  private readonly http = inject(HttpClient);
  private readonly userService = inject(UserService);
  getUserQuestionables() {
    return this.http.get<QuestionableSchema[]>(
      environment.apiUrl + '/user/' + this.userService.user()?.id + '/forms',
    );
  }
  async getQuestionable(formId: string): Promise<QuestionableSchema> {
    return firstValueFrom(
      this.http.get<QuestionableSchema>(environment.apiUrl + '/form/' + formId),
    );
  }
  async postQuestionableSchema(schema: QuestionableSchema): Promise<PostResponse> {
    return firstValueFrom(this.http.put<PostResponse>(environment.apiUrl + '/form', schema));
  }
  async postResponse(formId: string, res: any): Promise<PostResponse> {
    return firstValueFrom(
      this.http.post<PostResponse>(environment.apiUrl + '/response/' + formId, res),
    );
  }
}
