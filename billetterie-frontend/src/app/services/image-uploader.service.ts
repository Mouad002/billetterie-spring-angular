import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploaderService {
  constructor(private http: HttpClient) {
  }

  handleUploadImage(formData: FormData): void {
    this.http.post('http://localhost:8085/images/uploads/Event', formData).subscribe({
      next: (res: any) => {
        console.log('Nom du fichier sauvegardé :', res);
      },
      error: (err) => {
        console.error('Erreur lors de l’upload :', err);
      }
    });
  }
  // uploadImage(file: File): Observable<string> {
  //   const formData = new FormData();
  //   formData.append('file', file);
  //
  //   return this.http.post(this.uploadUrl, formData, { responseType: 'text' });
  // }



}
