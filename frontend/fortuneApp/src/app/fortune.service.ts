import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'

import { Observable } from 'rxjs';  

export interface Fortune {
  id: number;
  fortune: string;
}

@Injectable({
  providedIn: 'root'
})
export class FortuneService {

  private apiURL = 'http://localhost:8000/api/fortune';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getFortune(): Observable<Fortune[]> {
    return this.http.get<Fortune[]>(this.apiURL)
  }

  consumeFortune(newFortune: Fortune): Observable<any> {
    return this.http.put(this.apiURL, newFortune, this.httpOptions);
  }

}
