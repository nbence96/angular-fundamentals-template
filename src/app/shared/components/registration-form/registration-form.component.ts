import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationFormComponent {
  registrationForm!: FormGroup;
  formFields= {
    name: 'name',
    email: 'email',
    password: 'password'
  }

  constructor(private router: Router,private authService: AuthService) {
    this.buildForm();
  }

  buildForm(): void{
    this.registrationForm = new FormGroup({
      [this.formFields.name]: new FormControl('',[Validators.required,Validators.minLength(6)]),
      [this.formFields.email]: new FormControl('',[Validators.required]),
      [this.formFields.password]: new FormControl('',[Validators.required,Validators.minLength(6)]),
    });
  }

  get nameControl(): FormControl {
    return this.registrationForm.get(this.formFields.name)! as FormControl;
  }

  get emailControl(): FormControl {
    return this.registrationForm.get(this.formFields.email)! as FormControl;
  }

  get passwordControl(): FormControl {
    return this.registrationForm.get(this.formFields.password)! as FormControl;
  }

  onSubmit(): void {
    console.log(this.registrationForm.valid);
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      this.authService.register(this.registrationForm.value).subscribe({
        next: (response) => {
          if(response.successful){
            this.router.navigate(["/login"]);
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
      // Handle form submission logic
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
