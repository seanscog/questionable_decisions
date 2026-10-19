import { Component, inject, signal } from '@angular/core';
import { Responses } from '../responses/responses';
import { Questionable } from '../questionable/questionable';
import { QuestionableService } from '../../services/questionable';
import { exampleSchema, QuestionableResponse, QuestionableSchema } from '../../questionable-schema';

@Component({
  selector: 'app-home',
  imports: [Questionable, Responses],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private questionableService = inject(QuestionableService);
  responses: QuestionableResponse[] = [];
  schema: QuestionableSchema = exampleSchema;
  ready = signal(false);
  constructor() {
    Promise.all([
      this.questionableService.getQuestionable(1),
      this.questionableService.getResponses(1),
    ]).then(([schema, responses]) => {
      console.log('Schema and responses loaded');
      this.ready.set(true);
      this.responses = responses;
      this.schema = schema;
    });
  }
}
