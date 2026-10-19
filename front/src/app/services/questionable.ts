import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.production';
import { firstValueFrom, tap } from 'rxjs';
import type {
  QuestionableResponse,
  QuestionableSchema,
  ResponseValue,
} from '../questionable-schema';
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
  async getQuestionable(formId: number): Promise<QuestionableSchema> {
    return firstValueFrom(
      this.http.get<QuestionableSchema>(environment.apiUrl + '/form/' + formId),
    );
  }
  async postQuestionableSchema(schema: QuestionableSchema): Promise<PostResponse> {
    schema.userId = this.userService.user()?.id ?? 0;
    console.log(schema);
    return firstValueFrom(this.http.post<PostResponse>(environment.apiUrl + '/form', schema));
  }
  async submitResponse(formId: number, values: ResponseValue[]): Promise<PostResponse> {
    console.log({ formId, userId: this.userService.user() ?? null, values });
    return firstValueFrom(
      this.http.post<PostResponse>(environment.apiUrl + '/response', { formId, values }),
    );
  }
  async getResponses(formId: number) {
    return firstValueFrom(
      this.http.get<QuestionableResponse[]>(environment.apiUrl + '/form/' + formId + '/responses'),
    );
  }
}
