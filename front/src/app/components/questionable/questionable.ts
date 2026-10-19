import { Component, inject, input, signal } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRouteSnapshot, ResolveFn, Router, RouterStateSnapshot } from '@angular/router';
import { QuestionableSchema } from '../../questionable-schema';
import { QuestionableService } from '../../services/questionable';

export const schemaResolver: ResolveFn<QuestionableSchema> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const questionableService = inject(QuestionableService);
  const formId = route.paramMap.get('id')!;
  return questionableService.getQuestionable(Number(formId));
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
  schema = input.required<QuestionableSchema>();
  form: FormArray = this.fb.array([]);
  ngOnInit() {
    console.log(this.schema());
    this.form = this.fb.array(this.schema().fields.map((f) => this.fb.control(f)));
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Questionable Submitted', this.form.value);
      this.questionableService.submitResponse(
        this.schema()?.id!,
        this.schema().fields.map((f, i) => ({
          fieldId: f.id,
          val: this.form.value[i],
        })),
      );
    } else {
      this.form.markAllAsTouched();
    }
  }
}
