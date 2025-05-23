import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;
  
  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  handleLogin() {
    if (this.formLogin.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    
    const username = this.formLogin.value.username;
    const password = this.formLogin.value.password;
    
    this.authService.login(username, password).subscribe({
      next: () => {
        this.isLoading = false;
        if (this.authService.hasRole('ADMIN')) {
          this.router.navigateByUrl("/admin-panel");
        } else if (this.authService.hasRole('ORGANIZER')) {
          this.router.navigateByUrl("/organizer/my-events");
        } else {
          this.router.navigateByUrl("/home");
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.message || 'Erreur lors de la connexion';
        console.error('Erreur de connexion:', err);
      }
    });
  }
}






