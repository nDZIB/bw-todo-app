import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit, OnDestroy {
subscriptions: Subscription[] = []
  loginForm?: FormGroup;
  errors: string[] = []

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      password: new FormControl('', [Validators.required])
    })
  }

  signUp() {
    this.loginForm?.markAllAsTouched()
    if (this.loginForm?.valid) {
      const subs = this.authService.signUp(this.loginForm.value).subscribe({
        next: (response: any) => {
          this.authService.persistSession(response)
          this.router.navigate(['..', 'login'], { relativeTo: this.activatedRoute })
        },
        error: (error: HttpErrorResponse) => {
          if(error.error.error) {
            this.errors = [error.error.error]
          } else if(error.error.errors) {
            this.errors = error.error.errors
          }
        }
      })

      this.subscriptions.push(subs)
    }
  }

  hasError(controlName: string, validation: string) {
    const control = this.loginForm?.get(controlName)
    return ((control?.dirty || control?.touched)) && (control.errors && control.errors[validation])
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe())
  }
}
