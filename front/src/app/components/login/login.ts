import { Component, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';

@Component({
  selector: 'app-login',
  imports: [FormField],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  tab = signal<"login" | "register">("login")
  setTab(tab:"login" | "register") {
    this.tab.set(tab)
  }
  registerModel = signal({
    username: '',
    password: '',
    confirmPassword: '',
  })
  registerForm = form(this.registerModel, (schemaPath) => {
  // debounce(schemaPath.email, 500);
  required(schemaPath.username);
  required(schemaPath.password);
  required(schemaPath.confirmPassword);
})
}
