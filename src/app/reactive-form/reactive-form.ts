import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordStrengthValidator } from '../validators/password-strength.validator';
import { usernameAvailableValidator } from '../validators/username-available.validator';
import { User } from '../user';

const existingUsernames = ['john', 'admin', 'djamware'];

@Component({
  selector: 'app-reactive-form',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './reactive-form.html',
  styleUrl: './reactive-form.scss'
})
export class ReactiveForm {
  // loginForm: FormGroup;

  // constructor(private fb: FormBuilder) {
  //   this.loginForm = this.fb.group({
  //     username: ['', {
  //       validators: [Validators.required],
  //       asyncValidators: [usernameAvailableValidator(existingUsernames)],
  //       updateOn: 'blur',
  //     }],
  //     password: ['', [
  //       Validators.required,
  //       Validators.minLength(6),
  //       passwordStrengthValidator,
  //     ]],
  //   });
  // }

  // onSubmit() {
  //   console.log(this.loginForm.value);
  //   this.loginForm.get('email')?.value; // current value
  //   this.loginForm.get('email')?.valid; // validation status
  //   this.loginForm.valid;
  // }

  // get email() {
  //   return this.loginForm.get('email')!;
  // }

  // get password() {
  //   return this.loginForm.get('password')!;
  // }

  // 

  // profileForm: FormGroup;

  // constructor(private fb: FormBuilder) {
  //   this.profileForm = this.fb.group({
  //     name: ['', Validators.required],
  //     email: ['', [Validators.required, Validators.email]],
  //     address: this.fb.group({
  //       street: ['', Validators.required],
  //       city: ['', Validators.required],
  //       zip: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
  //     }),
  //   });
  // }

  // get address() {
  //   return this.profileForm.get('address') as FormGroup;
  // }

  // onSubmit(): void {
  //   console.log(this.profileForm.value);
  //   this.profileForm.get('address.city')?.value;
  //   this.address.get('zip')?.valid;
  // }

  // onSubmit(): void {
  //   if (this.profileForm.invalid) {
  //     this.profileForm.markAllAsTouched(); // Show validation messages
  //     return;
  //   }

  //   console.log('Form submitted:', this.profileForm.value);
  //   // Simulate API call or further processing here

  //   this.profileForm.markAllAsTouched();
  // }

  // formSubmitted = false;

  // onSubmit() {
  //   if (this.profileForm.invalid) {
  //     this.profileForm.markAllAsTouched();
  //     return;
  //   }

  //   console.log(this.profileForm.value);
  //   this.formSubmitted = true;
  //   this.profileForm.reset();
  // }

  profileForm: FormGroup;
  formSubmitted = false;
  loading = false;

  constructor(private fb: FormBuilder, private userService: User) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        zip: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      }),
    });
  }

  onSubmit() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.userService.saveUser(this.profileForm.value).subscribe({
      next: (response) => {
        console.log('User saved:', response);
        this.loading = false;
        this.formSubmitted = true;
        this.profileForm.reset();
      },
      error: (err) => {
        console.error('Submission failed:', err);
        this.loading = false;
      },
    });
  }
}
