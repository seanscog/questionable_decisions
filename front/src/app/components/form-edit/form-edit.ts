import { Component, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuestionableService } from '../../services/questionable';
import { Question, QuestionableSchema } from '../../questionable-schema';

@Component({
  selector: 'app-form-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './form-edit.html',
  styleUrl: './form-edit.css',
})
export class FormEdit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly questionableService = inject(QuestionableService);
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
      let num = 0;
      const schema: QuestionableSchema = {
        id: 0,
        title: this.questionable.value.title ?? 'You Forgot to Provide a Title Idiot',
        fields: this.questionable.value.questions!.map((_q: any, i): Question => {
          const q = _q as Question;
          console.log(q);
          return {
            id: 0,
            ordinal: i,
            displayNumber: (q as Question).controlType == 'none' ? 0 : num++,
            controlType: q.controlType,
            label: q.label,
            formPage: 0,
            options: _q.options?.value ?? [],
          };
        }),
      };
      this.questionableService.postQuestionableSchema(schema);
      console.log('Questionable Created', this.questionable.value);
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
        control_type: ['none', Validators.required],
        label: [`Question ${this.questions.length}`, Validators.required],
        options: [this.fb.array([])],
      }),
    );
    this.questionable.markAsTouched();
  }
}
