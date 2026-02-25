import { setupCounter } from '@lib/counter/counter.composable';
import {
  Counter,
  DependentMap,
  fromEntries,
  MapEntries,
  UnionToOvlds,
  PluginFunction,
  Spread,
  UnionToArray,
  LastElementOf,
} from '@lib/index';
import type { Equal, Expect, ExpectExtends } from '@lib/types.tests';

var createCounter = () => fromEntries(setupCounter());

// // type S = ('1' | '2' | '3') & string

// type Prettify<T> = {
//   [K in keyof T]: T[K];
// } & unknown;

// type U1 = ['count', () => number];
// type U2 =
//   | (['count', (() => number) | (() => string)] | ['test', () => void])
//   | ([string, any] & {});
// type U3 = ['count', (() => number) | (() => string)] | ['test', () => void];

// var u2: U2 = ['adad', () => 1];

// type A = UnionToOvlds<U3>;

// // type Intersect<T> = (T extends any ? (x: T) => 0 : never) extends (
// //   x: infer R
// // ) => 0
// //   ? R
// //   : never;
// // type TupleKeys<T extends any[]> = Exclude<keyof T, keyof []>;
// // type Foo<T extends any[]> = {
// //   [K in TupleKeys<T>]: { foo: T[K] };
// // };
// // type Values<T> = T[keyof T];
// // type Unfoo<T> = T extends { foo: any } ? T['foo'] : never;
// // type IntersectItems<T extends any[]> = Unfoo<Intersect<Values<Foo<T>>>>;

// type PickEntry<T extends [any, any]> = {
//   [Key in T[0]]: [Key, any];
// }[T[0]];

// // type Sp = Spread<
// //   [
// //     Record<string, any>,
// //     {
// //       count: () => string;
// //       test: () => void;
// //     }
// //   ]
// // >;

// export type PluginFN<TNew extends MapEntries> = <TBase extends MapEntries>(
//   // recordMap: UnionToOvlds<DependentMap<TBase>> extends (a: infer A) => void ? A & DependentMap<TNew> : never

//   // recordMap: DependentMap<TBase> extends DependentMap<infer U>
//   //   ? DependentMap<TNew | U>
//   //   : DependentMap<TNew>

//   // recordMap: DependentMap<TNew>

//   // recordMap: DependentMap<TBase> | DependentMap<TNew>

//   // recordMap: DependentMap<TBase & TNew>

//   // recordMap: DependentMap<TBase | TNew>

//   // recordMap: DependentMap<TBase> & DependentMap<TNew>

//   // // works????
//   // recordMap: DependentMap<TNew> & DependentMap<TBase>
//   // recordMap: DependentMap<TNew & MapEntries> & DependentMap<TBase & MapEntries>
//   recordMap: DependentMap<TBase>

//   // recordMap: DependentMap<TBase> & DependentMap<TNew>

//   // recordMap: DependentMap<TBase> & DependentMap<TNew>

//   // recordMap: [() => DependentMap<TBase>] extends [DependentMap<infer U>]
//   //   ? DependentMap<U | TNew>
//   //   : never
//   // recordMap: DependentMap<TBase | TNew | (MapEntries & {})>
//   // recordMap: DependentMap<TNew>
//   // recordMap: DependentMap<MapEntries> extends DependentMap<infer U>
//   //   ? DependentMap<U | TNew | TBase>
//   //   : never
// ) => DependentMap<Exclude<TBase, PickEntry<TNew>> | TNew>;

// type R = ['test', () => void] | ['count', (() => number) | (() => string)];

// type ToRRR<T extends MapEntries> = {
//   [K in T[0]]: [K, T[1]];
// }[T[0]];

// type Distribute<U> = U extends MapEntries
//   ? [U[0], LastElementOf<UnionToArray<U[1]>>]
//   : never;

// type T1 = Distribute<R>;

// // right
// // get: (key: K) => (K extends any ? any : never) | (K extends "test" ? () => void : never) | (K extends "count" ? (() => number) | (() => string) : never) | KeyToValue<K, TBase> | undefined;

// // get: (key: K) => (K extends "test" ? () => void : never) | (K extends "count" ? (() => number) | (() => string) : never) | KeyToValue<K, TBase> | (K extends any ? any : never) | undefined;

// // get: (key: K) => (K extends "test" ? () => void : never) | (K extends "count" ? (() => number) | (() => string) : never) | KeyToValue<K, TBase> | undefined;

// // get: (key: K) => (K extends "test" ? () => void : never) | (K extends "count" ? (() => number) | (() => string) : never) | (K extends any ? any : never) | KeyToValue<K, TBase> | undefined;

// // dosent work!
// // var count: ((MapEntries | R | TBase)[0] extends "test" ? () => void : never) | ((MapEntries | R | TBase)[0] extends "count" ? (() => number) | (() => string) : never) | NonNullable<(MapEntries | R | TBase)[0] extends any ? any : never> | NonNullable<KeyToValue<(MapEntries | R | TBase)[0], TBase>>

// // function get(key: "count" | "test"): () => void | () => number | () => string | undefined
// // function get(key: K): (K extends "test" ? () => void : never) | (K extends "count" ? (() => number) | (() => string) : never) | KeyToValue<K, TBase> | undefined

// var wiThTestFn: PluginFN<R> = (recordMap: DependentMap<R>) => {
//   // var wiThTestFn: PluginFN<
//   //   ['test', () => void] | ['count', (() => number) | (() => string)]
//   // > = (recordMap) => {
//   var count = recordMap.get('count') as () => number;
//   var test = recordMap.get('test')!;

//   recordMap.set('count', () => 1);

//   return recordMap;
// };

// var withLogFn: PluginFN<['log', () => void]> = (recordMap) => {
//   return recordMap;
// };

// var createCounter1 = () => fromEntries(wiThTestFn(withLogFn(setupCounter())));
// // // var createCounter1 = () => wiThTestFn(setupCounter());

export default () => {
  // var counter
  var c = new Counter();
  var counter = createCounter();
  window.counter = counter;

  const onSet = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const value = Number(target.value);

    counter.set(() => value);
  };

  return (
    <div>
      <h1>Base counter</h1>

      <div>
        count: <b>{counter.count()} </b>
      </div>

      <div>
        <input
          type="number"
          value={counter.count()}
          onChange={(event) => {
            onSet(event);
          }}
          // onBlur={(event) => {
          //   onSet(event);
          // }}
        />
      </div>

      <button
        type="button"
        onClick={() => {
          counter.set((previousValue) => previousValue + 1);
        }}
      >
        +
      </button>

      <button
        type="button"
        onClick={() => {
          counter.set((previousValue) => previousValue - 1);
        }}
      >
        -
      </button>
    </div>
  );
};
