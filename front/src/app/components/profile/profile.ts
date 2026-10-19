import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user';
import { QuestionableService } from '../../services/questionable';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  user = inject(UserService).user;
  forms = inject(QuestionableService).getUserQuestionables();
}
