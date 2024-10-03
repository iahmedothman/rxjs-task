# RxJS and Observables

Observables are part of RxJS library<br>
They are used to handle asynchronous operations

## Observables Creation

### 1) Custom observables <br>

Take a call back function with parameter (observer) An observer is an object that defines how to react to the values <br>

- next(value):
  Is used to emit a value from an observable.<br>
- error(err):
  Is used to emit an error from an observable. <br>
- complete():
  complete obseravble and finish emitting values <br>

```ts
subscription = new Observable<number>((observer) => {
  observer.next(1);
  observer.next(2);
  observer.error(3);
  observer.complete();
});
```

### 2) Creation functions <br>

```ts
newObsOf = of(1, 2, 10); // 1,2,10 immediately
newObsRange = range(1, 5); // 1,2,3,4,5 immediately
newObsInterval = interval(1000); // 0,1,2,3,5,6,7 etc.. every sec
newObsTimer = timer(1000); // 0 once after sec
clickObservable = fromEvent(document, "click"); // creates an observable from a DOM event
```

### 3) Built in observables

- #### Form Controls Observables <br>
  - Angular's Reactive Forms module provides observables like valueChanges and statusChanges for tracking changes to form controls and groups.
- #### Event Emitters:
  - Components in Angular can emit events using EventEmitter, which are essentially observables. They allow communication between components.
- #### HTTP Client Observables:
  - Angular's HttpClient module returns responses as observables when making HTTP requests.
- #### Router Observables:
  - Router.events: This observable emits events whenever the router navigates. It can be used to listen to various navigation events (e.g., navigation start, end, cancel, etc.).
  - ActivatedRoute: You can use the params, queryParams, and data observables to react to changes in route parameters, query parameters, or route data.
- #### NgRx Store Observables:
  - If you're using NgRx for state management, NgRx Store provides observables for managing and reacting to changes in the application state.

## How to use the Observables?

**subscribe**(next?, error?, complete?):
It takes up to three optional callback functions: next, error, and complete. <br>

```ts
subscription.subscribe(
  (value) => console.log("Next:", value), // Next handler
  (error) => console.error("Error:", error), // Error handler
  () => console.log("Complete") // Complete handler
);
```

**unsubscribe()**

## Operators in RxJS

An operator is a pure function that take an observable as input and return a new observable, allowing for transformation and manipulation of the data stream without altering the original observable.

**_To work with operators we need a pipe() method_**

**Types of operators** <br>

**1) Combination (combine multiple Observable)** <br>

- **merge**: emits as soon as any observable emits, return it as an Individual values <br>
- **concat**: emits sequentially one after the other, return it as an Individual values<br>
- **forkJoin**: emits once all observables have completed, return value as an array or object.<br>
- **combineLatest**: emits when any observable emits (after all have emitted once) return value as an array or object.<br>
- **startsWith**: allows you to add an initial value (or values) to the emissions of an observable. <br>

**2) Transformation** <br>

- **map**: transforms each emitted value. <br>
- **reduce**: used to accumulate values emitted by an observable into a single value over time. <br>
- **scan**: used for continuous accumulation <br>
- **switchMap**: maps to an observable and cancels the previous observable when a new alue is emitted. <br>
- **concatMap**: maps to an observable and queues the inner observables, emitting their results one after the other.<br>
- **mergeMap**: maps to an observable and subscribes to all inner observables concurrently, emitting their results as they arrive.<br>

**3) Filtering** <br>

- **filter**: return the emitted values that meet a specific condition.<br>
- **first**: return the first emitted value. can throw an error if no matching value is found.<br>
- **last**: return the last emitted value. can throw an error if no matching value is found.<br>
- **find**: return the first matching emitted value. emits undefined if no match is found.<br>
- **findIndex**: return the index of the first matching emitted value. emits -1 if no match is found.<br>
- **take**: limits the number of emissions from an observable and completes after that number is reached.<br>
- **takeWhile**: emits value while a specified condition is true. Once the condition fails, it completes.<br>
- **takeUntil**: completes the source observable when another observable emits a value.<br>
- **skip**: ignores the first n emitted values and emits the rest. <br>
- **skipWhile**: skips emitted values while condition is true begins emitting when condition becomes false. <br>
- **skipUntil**: skips all emitted values until another.observable emits a value; then emits all subsequent values.<br>
- **distinct**: returns emitted values that are unique with no duplicates <br>
- **debounceTime**: delays emission of values until a specified time has passed without any new emissions. <br>
- **tap**: allows to perform side effects, such as logging or debugging, without modifying the items.

**4) Mathematical** <br>

- **count**: counts emitted values and emits the total count.<br>
- **max**: emits the maximum value from the emitted values.<br>
- **min**: emits the minimum value from the emitted values.<br>

## Subjects

Subject in RxJS acts as a bridge between the observer and the observable world. Imagine it as a microphone on a stage: you can shout into it (emit values) and those sitting in the audience (observers) can hear it loud and clear. The uniqueness of a Subject is its capability to multicast, i.e., it can emit values to multiple listeners.

**Types of Subjects**<br>

- **Subject** - No initial value or replay behavior.
- **BehaviorSubject** - Requires an initial value and emits its current value (last emitted item) to new subscribers.
- **ReplaySubject** - Emits specified number of last emitted values (a replay) to new subscribers.
- **AsyncSubject** - Emits latest value to observers upon completion.

**Difference between subjects and observables?**<br>

- **Subjects**: are multi casting, meaning they maintain a list of observer and notify all of them when a new value emitted
- **Observables**: are uni casting, meaning each subscribed observer has its own execution of the observable,when you subscribe to an observable

**Difference between promises and observables?** <br>

- **Promises**: One time result, Once a promise is resolved (fulfilled or rejected), it cannot change.
  When you create a promise, it starts executing immediately
- **Observables**:
  Return Streams of data, An observable does not start emitting values until you subscribe to it
