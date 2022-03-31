import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponse, RegisterInfo } from 'src/app/interfaces/interfaces';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
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

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {}
  logIn() {
    if (this.loginForm.valid) {
      const formValues: RegisterInfo = this.loginForm.value;
      formValues.email = formValues.email.toLocaleLowerCase();
      this.authService.login(formValues).subscribe((data: LoginResponse) => {
        console.log(data);
        console.log('Name:', data.user.name);
        localStorage.setItem('token', data.token);
        this.router.navigate(['']);
      });
    }
  }
}
