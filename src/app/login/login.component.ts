import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isAdmin: boolean = false; // Variable para simular el estado de administrador

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { user, password } = this.loginForm.value;

      // Simular autenticación
      if (user === 'admin' && password === 'admin123') {
        this.authService.setIsAdmin(true);
        this.router.navigate(['/agendamiento']); // Redirigir a "Agendamiento"
      } else {
        this.authService.setIsAdmin(false);
        alert('Usuario o contraseña incorrectos');
      }
    }
  }
}