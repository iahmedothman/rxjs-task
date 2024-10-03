# RxjsTask

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


# RxJS and Observables 
Observables are part of RxJS library - They are used to handle asynchronous operations

## Observables Creation
1) Custom observables new Observable()
•	Take a call back function with parameter (observer) An observer is an object that defines how to react to the values
•	.next(value):
Is used to emit a value from an observable. 
•	.error(err):
Is used to emit an error from an observable. 
•	.complete():
complete obseravble and finish emitting values 
subscription = new Observable<number>( (observer) => {
    observer.next(1);
    observer.next(2);
    observer.error(3);
    observer.complete();
  });

2) Creation functions
newObsOf = of(1, 2, 10); // 1,2,10 immediately
newObsRange = range(1, 5); // 1,2,3,4,5 immediately
newObsInterval = interval(1000); // 0,1,2,3,5,6,7 etc.. every sec
newObsTimer = timer(1000); // 0 once after sec
clickObservable = fromEvent(document, 'click') - Creates an observable from a DOM event

3) Built in observables
- Form Controls Observables:
Angular's Reactive Forms module provides observables like valueChanges and statusChanges for tracking changes to form controls and groups.
- Event Emitters:
Components in Angular can emit events using EventEmitter, which are essentially observables. They allow communication between components.
- HTTP Client Observables:
Angular's HttpClient module returns responses as observables when making HTTP requests.
-	Router Observables:
router.events: This observable emits events whenever the router navigates. It can be used to listen to various navigation events (e.g., navigation start, end, cancel, etc.).
ActivatedRoute: You can use the params, queryParams, and data observables to react to changes in route parameters, query parameters, or route data.
-	NgRx Store Observables:
If you're using NgRx for state management, NgRx Store provides observables for managing and reacting to changes in the application state.

## How to use the Observables?
1) subscribe(next?, error?, complete?):
It takes up to three optional callback functions: next, error, and complete. 
subscription.subscribe(
  value => console.log('Next:', value), // Next handler
  error => console.error('Error:', error), // Error handler
  () => console.log('Complete') // Complete handler
);
2) unsubscribe():

## Operators in RxJS
An operator is a pure function that take an observable as input and return a new observable, allowing for transformation and manipulation of the data stream without altering the original observable.

To work with operators we need a pipe() method

**Types of operators**
1) Combination (combine multiple Observable)
merge: emits as soon as any observable emits, return it as an Individual values
concat: emits sequentially one after the other, return it as an Individual values
forkJoin: emits once all observables have completed, return value as an array or object.
combineLatest: emits when any observable emits (after all have emitted once) return value as an array or object.
startsWith: allows you to add an initial value (or values) to the emissions of an observable.
2) Transformation 
map: transforms each emitted value.
reduce: used to accumulate values emitted by an observable into a single value over time.
scan: used for continuous accumulation 
switchMap: maps to an observable and cancels the previous observable when a new alue is emitted.
concatMap: maps to an observable and queues the inner observables, emitting their results one after the other.
mergeMap: maps to an observable and subscribes to all inner observables concurrently, emitting their results as they arrive.
3) Filtering 
filter: return the emitted values that meet a specific condition.
first: return the first emitted value. can throw an error if no matching value is found.
last: return the last emitted value. can throw an error if no matching value is found.
find: return the first matching emitted value. emits undefined if no match is found.
findIndex: return the index of the first matching emitted value. emits -1 if no match is found.
take: limits the number of emissions from an observable and completes after that number is reached.
takeWhile: emits value while a specified condition is true. Once the condition fails, it completes.
takeUntil: completes the source observable when another observable emits a value.
skip: ignores the first n emitted values and emits the rest.
skipWhile: skips emitted values while condition is true begins emitting when condition becomes false.
skipUntil: skips all emitted values until another observable emits a value; then emits all subsequent values.
distinct: returns emitted values that are unique with no duplicates
debounceTime: delays emission of values until a specified time has passed without any new emissions.
4) Mathematical 
count: counts emitted values and emits the total count.
max: emits the maximum value from the emitted values.
min: emits the minimum value from the emitted values.
5) Others
tap: allows to perform side effects, such as logging or debugging, without modifying the items.

## Subjects 
Subject in RxJS acts as a bridge between the observer and the observable world. Imagine it as a microphone on a stage: you can shout into it (emit values) and those sitting in the audience (observers) can hear it loud and clear. The uniqueness of a Subject is its capability to multicast, i.e., it can emit values to multiple listeners.

**Types of Subjects**
Subject - No initial value or replay behavior.
BehaviorSubject - Requires an initial value and emits its current value (last emitted item) to new subscribers.
ReplaySubject - Emits specified number of last emitted values (a replay) to new subscribers.
AsyncSubject - Emits latest value to observers upon completion.

**Difference between subjects and observables?**
in stream programming there are two main interfaces: Observable and Observer.
Observable is for the consumer, it can be transformed and subscribed:
observable.map(x => ...).filter(x => ...).subscribe(x => ...)
Observer is the interface which is used to feed an observable source:
observer.next(newItem)
Subjects are multi casting, meaning they maintain a list of observer and notify all of them when a new value emitted
Observables are uni casting, meaning each subscribed observer has its own execution of the observable,when you subscribe to an observable

**Difference between promises and observables?**
Promises 
One time result - Once a promise is resolved (fulfilled or rejected), it cannot change.
When you create a promise, it starts executing immediately
Observables 
Streams of data
Lazy Execution: An observable does not start emitting values until you subscribe to it

