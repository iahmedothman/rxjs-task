import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Example of the BehaviorSubject 
  private subject = new BehaviorSubject<number>(0);
  public dataSubject$ = this.subject.asObservable();

  constructor(private httpClient: HttpClient) { }

  updateData(value: number) {
    this.subject.next(value); // Emit new value
  }

  getData(): Observable<any> {
    return this.httpClient.get('https://jsonplaceholder.typicode.com/posts');
  }
}
