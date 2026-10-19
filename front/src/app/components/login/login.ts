import { Component, inject, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { form, FormRoot, FormField, required, validate } from '@angular/forms/signals';
import { UserService } from '../../services/user';
import { ActivatedRoute, Router } from '@angular/router';

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
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly returnUrl =
    this.activatedRoute.snapshot.queryParamMap.get('returnUrl') ?? '/profile';

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
              id: 0,
              username: formData.username,
              password: formData.password,
            });
          } catch (err: any) {
            return { kind: 'serverError', message: err.message ?? '' };
          }
          if (result.ok) {
            this.router.navigateByUrl(this.returnUrl);
            return;
          }
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
    firstName: '',
    lastName: '',
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
              id: 0,
              username: formData.username,
              password: formData.password,
              firstName: formData.firstName,
              lastName: formData.lastName,
            });
          } catch (err: any) {
            console.log(err);
            return { kind: 'serverError', message: err?.message ?? '' };
          }
          if (result.ok) {
            this.router.navigateByUrl(this.returnUrl);
            await this.router.navigate(['profile']);
            return;
          }
          return {
            kind: 'serverError',
            message: result.message ?? 'Registration failed, try again later',
          };
        },
      },
    },
  );
}
