import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean = false;
  roles: any;
  username: any;
  accessToken!: any;

  constructor(private http: HttpClient, private router: Router) { }

  public login(username: string, password: string): Observable<any> {
    console.log('Tentative de connexion pour:', username);
    
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    
    const params = new HttpParams()
      .set("username", username)
      .set("password", password);

    return this.http.post(environment.backendHost + "/auth/login", params, options)
      .pipe(
        tap(response => {
          console.log('Réponse du serveur:', response);
          this.loadProfile(response);
        }),
        catchError(error => {
          console.error('Erreur de connexion:', error);
          if (error.status === 401) {
            return throwError(() => new Error('Nom d\'utilisateur ou mot de passe incorrect'));
          }
          return throwError(() => new Error('Erreur de connexion au serveur'));
        })
      );
  }

  loadProfile(data: any) {
    console.log('Chargement du profil avec les données:', data);
    this.isAuthenticated = true;
    this.accessToken = data['access-token'];
    let decodedJwt: any = jwtDecode(this.accessToken);
    this.username = decodedJwt.sub;
    this.roles = decodedJwt.scope;
    localStorage.setItem('jwt-token', this.accessToken);
  }

  logout() {
    this.isAuthenticated = false;
    this.accessToken = undefined;
    this.roles = undefined;
    this.username = undefined;
    localStorage.removeItem('jwt-token');
    this.router.navigateByUrl('/login');
  }

  hasRole(role: string): boolean {
    if (!this.roles) return false;
    return this.roles.includes(role);
  }
}