import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './form-edit.html',
  styleUrl: './form-edit.css',
})
export class FormEdit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  readonly questionable = this.fb.group({
    title: ['Form', Validators.required],
    questions: this.fb.array([]),
  });

  onSubmit(): void {
    if (this.questionable.valid) {
      console.log('Questionable Created', this.questionable.value);
    } else {
      this.questionable.markAllAsTouched();
    }
  }

  onDiscard(): void {
    this.questionable.reset();
    this.router.navigate(['']);
  }
  addQuestion() {}
  editQuestion(index: number) {}
}
