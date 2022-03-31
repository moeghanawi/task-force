import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RegisterInfo } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(15),
      Validators.required,
    ]),
    email: new FormControl('', [
      Validators.email,
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    password: new FormControl('', [
      Validators.maxLength(30),
      Validators.minLength(3),
      Validators.required,
    ]),
  });

  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit(): void {}

  capitalize(letter: string): string {
    const capitalizeName = letter.charAt(0).toUpperCase() + letter.slice(1);
    return capitalizeName;
  }

  register() {
    if (this.registerForm.valid) {
      const formValues: RegisterInfo = this.registerForm.value;

      formValues.name = this.capitalize(formValues.name);
      formValues.email = formValues.email.toLocaleLowerCase();

      this.authService.register(formValues).subscribe((data) => {
        this.router.navigate(['/']);
      });
    }
  }
}
