import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { QuestionableService } from '../../services/questionable';
import { controlTypes, Question, QuestionableSchema } from '../../questionable-schema';

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
  controlTypes = controlTypes;

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
      let value = this.questionable.getRawValue();
      let questions = this.questions.getRawValue() as Question[];
      const schema: QuestionableSchema = {
        userId: 0,
        title: value.title ?? 'You Forgot to Provide a Title Idiot',
        fields: questions.map((q: any, i): Question => {
          return {
            id: 0,
            ordinal: i,
            displayNumber: (q as Question).controlType == 'display' ? 0 : num++,
            controlType: q.controlType,
            label: q.label,
            formPage: 0,
            options: q?.options ?? [],
          };
        }),
      };

      this.questionableService.postQuestionableSchema(schema).then(() => {
        this.router.navigate(['profile']);
      });
    } else {
      this.questionable.markAllAsTouched();
    }
  }
  get questions(): FormArray {
    return this.questionable.get('questions') as FormArray;
  }
  getOptions(question: AbstractControl): FormArray {
    return question.get('options') as FormArray;
  }
  removeOption(options: FormArray, index: number) {
    return options.removeAt(index);
  }
  addOption(options: FormArray) {
    options.push(
      this.fb.group({
        label: [`Option ${options.length}`],
      }),
    );
  }

  onDiscard(): void {
    this.questionable.reset();
    this.router.navigate(['']);
  }
  addQuestion() {
    this.questions.push(
      this.fb.group({
        controlType: ['display', Validators.required],
        label: [`Question ${this.questions.length}`, Validators.required],
        options: this.fb.array([]),
      }),
    );
    this.questionable.markAsTouched();
  }
}
