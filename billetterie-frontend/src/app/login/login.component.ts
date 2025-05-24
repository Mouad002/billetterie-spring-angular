import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
formLogin! :FormGroup;


  constructor(private fb:FormBuilder, private reter:Router,private authService:AuthService ) {}

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username:this.fb.control(""),
      password: this.fb.control("")
    });
  }

  handleLogin() {

      let username = this.formLogin.value.username;
    let password = this.formLogin.value.password;
    this.authService.login(username,password).subscribe({
      next: (data) => {
        this.authService.loadProfile(data);
        this.reter.navigateByUrl("/organizer");
      },
      error: (err) => {
        console.log(err);
      }
    }
  )


}
    }
