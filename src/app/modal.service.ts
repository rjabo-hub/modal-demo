import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from './models/contact';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private apiUrl = 'https://ehzk6mgbt5.execute-api.us-east-1.amazonaws.com/dev/person';
  constructor(private http: HttpClient) { }

  public createContact(data: Contact): Promise<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(this.apiUrl, JSON.stringify(data), {headers})
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.error.message);
  }

}