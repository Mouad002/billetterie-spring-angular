import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  isAuthenticated: boolean = false;
  roles: any;
  username: any;
  accessToken!: string;

  constructor(private http: HttpClient) {
    // Restaurer l'état d'authentification au démarrage
    this.loadAuthStateFromStorage();
  }

  private loadAuthStateFromStorage() {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      this.accessToken = token;
      this.isAuthenticated = true;
      try {
        const decodedJwt: any = jwtDecode(token);
        this.username = decodedJwt.sub;
        this.roles = decodedJwt.scope;
      } catch (error) {
        console.error('Erreur lors du décodage du token:', error);
        this.logout();
      }
    }
  }

  public login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');
    
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.post(environment.backendHost + "/auth/login", params.toString(), { headers }).pipe(
      tap((data: any) => {
        this.loadProfile(data);
      }),
      catchError(error => {
        console.error('Erreur de connexion:', error);
        if (error.status === 401) {
          return throwError(() => new Error('Nom d\'utilisateur ou mot de passe incorrect'));
        }
        return throwError(() => new Error(error.error?.message || 'Erreur de connexion'));
      })
    );
  }

  loadProfile(data: any) {
    this.isAuthenticated = true;
    this.accessToken = data['access-token'];
    localStorage.setItem(this.TOKEN_KEY, this.accessToken);

    try {
      const decodedJwt: any = jwtDecode(this.accessToken);
      this.username = decodedJwt.sub;
      this.roles = decodedJwt.scope;
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error);
      this.logout();
    }
  }

  logout() {
    this.isAuthenticated = false;
    this.accessToken = '';
    this.username = null;
    this.roles = null;
    localStorage.removeItem(this.TOKEN_KEY);
  }

  hasRole(role: string): boolean {
    return this.roles?.includes(role) || false;
  }
}
