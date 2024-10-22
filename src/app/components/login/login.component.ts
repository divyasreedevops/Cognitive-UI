import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/Auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  LogInForm!: FormGroup;
  public showPassword: boolean = false;
  isLoading: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.LogInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onsubmit() {
    this.isLoading=true;
    try {
      this.authService.login({
        "email":this.LogInForm.value.email,
        "password":this.LogInForm.value.password
    }).subscribe((data:any)=>{
      localStorage.setItem('token',data.token);
      this.router.navigate(['opsmanager']);
      })
    } catch (error) {
      this.isLoading=false;
    }

  }
}
