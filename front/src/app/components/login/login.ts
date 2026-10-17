import { Component, inject, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { form, FormRoot, FormField, required, validate } from '@angular/forms/signals';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-login',
  imports: [FormRoot, FormField, NgTemplateOutlet],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  tab = signal<'login' | 'register'>('login');
  setTab(tab: 'login' | 'register') {
    this.tab.set(tab);
  }
  userService = inject(UserService);

  loginModel = signal({
    username: '',
    password: '',
  });
  loginForm = form(
    this.loginModel,
    (schemaPath) => {
      // debounce(schemaPath.email, 500);
      required(schemaPath.username);
      required(schemaPath.password);
    },
    {
      submission: {
        action: async (field, detail) => {
          const formData = field().value();
          let result;
          try {
            result = await this.userService.login({
              username: formData.username,
              password: formData.password,
            });
          } catch {
            return { kind: 'serverError', message: 'Registration failed, could not connect' };
          }
          if (result.ok) return;
          return {
            kind: 'serverError',
            message: result.message ?? 'Registration failed, try again later',
          };
        },
      },
    },
  );

  registerModel = signal({
    username: '',
    password: '',
    confirmPassword: '',
  });
  registerForm = form(
    this.registerModel,
    (schemaPath) => {
      // debounce(schemaPath.email, 500);
      required(schemaPath.username);
      required(schemaPath.password);
      required(schemaPath.confirmPassword);
      validate(schemaPath.confirmPassword, ({ value, valueOf, stateOf }) => {
        if (!stateOf(schemaPath.password).touched()) {
          return null;
        }
        if (value() !== valueOf(schemaPath.password)) {
          return {
            kind: 'passwordMismatch',
            message: 'Passwords do not match',
          };
        }
        return null;
      });
    },
    {
      submission: {
        action: async (field, detail) => {
          const formData = field().value();
          let result;
          try {
            result = await this.userService.register({
              username: formData.username,
              password: formData.password,
            });
          } catch {
            return { kind: 'serverError', message: 'Registration failed, could not connect' };
          }
          if (result.ok) return;
          return {
            kind: 'serverError',
            message: result.message ?? 'Registration failed, try again later',
          };
        },
      },
    },
  );
}
