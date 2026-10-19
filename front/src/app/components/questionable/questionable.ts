import { Component, inject, input, signal } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRouteSnapshot, ResolveFn, Router, RouterStateSnapshot } from '@angular/router';
import { QuestionableSchema } from '../../questionable-schema';
import { environment } from '../../../environments/environment.production';
import { QuestionableService } from '../../services/questionable';

export const schemaResolver: ResolveFn<QuestionableSchema> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const questionableService = inject(QuestionableService);
  const formId = route.paramMap.get('id')!;
  return questionableService.getQuestionable(formId);
};

@Component({
  selector: 'app-questionable',
  imports: [ReactiveFormsModule],
  templateUrl: './questionable.html',
  styleUrl: './questionable.css',
})
export class Questionable {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly questionableService = inject(QuestionableService);
  id = input.required<string>();
  schema = input.required<QuestionableSchema>();
  editingElement = signal<string | number | null>(null);

  readonly questionable = this.fb.group({
    title: ['Form', Validators.required],
    questions: this.fb.array([]),
  });
  onFocusout(event: FocusEvent) {
    const current: any = event.currentTarget;
    if (!current.contains(event.relatedTarget)) {
      this.editingElement.set(null);
    }
  }

  onSubmit(): void {
    if (this.questionable.valid) {
      this.questionableService.postResponse(this.id(), [{}]);
      console.log('Questionable Submitted', this.questionable.value);
    } else {
      this.questionable.markAllAsTouched();
    }
  }
  get questions(): FormArray {
    return this.questionable.get('questions') as FormArray;
  }

  onDiscard(): void {
    this.questionable.reset();
    this.router.navigate(['']);
  }
  addQuestion() {
    this.questions.push(
      this.fb.group({
        controlType: ['none', Validators.required],
        label: [`Question ${this.questions.length}`, Validators.required],
      }),
    );
  }
}
