import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user';
import { QuestionableService } from '../../services/questionable';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  user = inject(UserService).user;
  createdForms = toSignal(inject(QuestionableService).getUserQuestionables());
}
