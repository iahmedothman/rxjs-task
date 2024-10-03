import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from './shared/data.service';
import { HttpClientModule } from '@angular/common/http';
import {
  catchError,
  concat,
  count,
  distinct,
  filter,
  find,
  findIndex,
  first,
  forkJoin,
  interval,
  last,
  map,
  max,
  min,
  Observable,
  of,
  reduce,
  startWith,
  takeWhile,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  providers: [DataService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  obs1$: Observable<number> = of(1, 2, 3, 4, 6, 10, 15, 15, 15, 25, 25, 40, 60);
  obs2$: Observable<string> = of('A', 'B', 'C', 'D', 'E', 'F', 'G');
  obsInterval$: Observable<number> = interval(1000);

  value$!: number
  obsMin$!: Observable<number>;
  obsMax$!: Observable<number>;
  obsCount$!: Observable<number>;
  obsConcatenated$!: Observable<number>;
  obsMerged$!: Observable<number | string>;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.dataSubject$.subscribe(res => {
      this.value$ = res; // Update local value
    });

    this.getData();

    // FILTER, REDUCE & MAP
    this.obs1$
      .pipe(
        filter((res) => res < 6), // Take the numbers less than 6
        reduce((acc, cur) => acc + cur, 0), // Accumulate the numbers in one single value
        map((res) => res * 2) // Make the value times 2
      )
      .subscribe((res) => console.log('Map:', res)); // output 20

    // TAKEWHILE
    this.obs1$
      .pipe(takeWhile((res) => res < 6))
      .subscribe((res) => console.log('TakeWhile:', res)); // Output 1, 2, 3, 4

    // FIND & FINDINDEX
    this.obs1$
      .pipe(find((value) => value === 2))
      .subscribe((res) => console.log('Find:', res)); //Output 2
    this.obs1$
      .pipe(findIndex((value) => value === 60))
      .subscribe((res) => console.log('FindIndex:', res)); //Output 12

    // FISRT & LAST
    this.obs1$.pipe(first()).subscribe((res) => console.log('First:', res)); // Output 1,
    this.obs1$.pipe(last()).subscribe((res) => console.log('Last:', res)); // Output 60,

    // DISTINCT
    this.obs1$.pipe(distinct()).subscribe((res) => console.log('Distinct:', res)); // Output 1, 2, 2, 3, 4, 4, 4, 6, 10, 15, 25, 40, 60

    // MIN, MAX, COUNT & FORKJOIN
    this.obsMin$ = this.obs1$.pipe(min());
    this.obsMax$ = this.obs1$.pipe(max());
    this.obsCount$ = this.obs1$.pipe(count());
    forkJoin([this.obsMin$, this.obsMax$, this.obsCount$]).subscribe(
      (res) => console.log('ForkJoin:', res) // Output [1, 60, 10]
    );

    // CONCAT
    this.obsConcatenated$ = concat(this.obsInterval$, this.obs1$);
    this.obsConcatenated$.subscribe((res) => console.log('Concat:', res)); // Output 1,2,3,4,5 etc... Obs1 won't work here

    // STARTSWITH
    this.obs1$
      .pipe(startWith('FISRT'))
      .subscribe((res) => console.log('StartsWith:', res)); // Output "FIRST", 1, 2, 2, 3, 4, 4, 4, 6, 10, 15, 25, 40, 60
  }

  getData() {
    this.dataService
      .getData()
      .pipe(
        // Tap to log data
        tap((posts) => console.log('Original Posts:', posts)),
        // Use filter to only allow posts with id 3
        filter((posts: any[]) => posts.some((post) => post.id === 3)), // Ensure there's at least one post with id 3
        // Transform the data
        map((posts) =>
          posts
            .filter((post) => post.id === 3) // Filter to only get posts with id that equal 3
            .map((post) => ({ title: post.title, id: post.id }))
        ), // Transform to include only title and id
        // Handle Error
        catchError((error) => {
          console.error('Error getting data:', error);
          return of([]);
        })
      )
      .subscribe((res) => {
        console.log('Data', res);
      });
  }

  increment() {
    const newValue = this.value$ + 1;
    this.dataService.updateData(newValue); // Update BehaviorSubject with new value
  }
}
