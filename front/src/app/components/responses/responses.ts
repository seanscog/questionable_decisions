import { Component, inject, input } from '@angular/core';
import { RouterLink, type ResolveFn } from '@angular/router';
import type { QuestionableResponse, QuestionableSchema } from '../../questionable-schema';
import { QuestionableService } from '../../services/questionable';
import type { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DatePipe } from '@angular/common';
import { UserService } from '../../services/user';

export const responsesResolver: ResolveFn<QuestionableResponse[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const questionableService = inject(QuestionableService);
  const formId = Number(route.paramMap.get('id'));
  return questionableService.getResponses(formId);
};

@Component({
  selector: 'app-responses',
  imports: [DatePipe, RouterLink],
  templateUrl: './responses.html',
  styleUrl: './responses.css',
})
export class Responses {
  userService = inject(UserService);
  schema = input.required<QuestionableSchema>();
  responses = input.required<QuestionableResponse[]>();
  getUser(id: number) {
    if (id == 0) return null;
    return this.userService.getUser(id);
  }
  copyLink() {
    window.navigator.clipboard.writeText(window.location.origin + '/form/' + this.schema().id);
  }
}
