export type IsEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends <
  T
>() => T extends B ? 1 : 2
  ? true
  : false;

// export type IsUnion<T, U = T> = T extends any
//   ? IsEqual<U, T> extends true
//     ? false // only one member, not a union
//     : true // multiple members, it's a union
//   : never;

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

// Converts union to overloaded function
export type UnionToOvlds<U> = UnionToIntersection<
  U extends any ? (f: U) => void : never
>;

type PopUnion<U> = UnionToOvlds<U> extends (a: infer A) => void ? A : never;

type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;

/**
 * @see https://catchts.com/union-array
 */
export type UnionToArray<T, A extends unknown[] = []> = IsUnion<T> extends true
  ? UnionToArray<Exclude<T, PopUnion<T>>, [PopUnion<T>, ...A]>
  : [T, ...A];

/**
 * @see https://stackoverflow.com/questions/76276504/extract-type-of-last-element-of-tuple-in-typescript
 */
export type LastElementOf<T extends readonly unknown[]> = T extends readonly [
  ...unknown[],
  infer Last
]
  ? Last
  : never;

export type PickLastUnionValue<T extends Record<any, any>> = {
  [K in keyof T]: IsUnion<T[K]> extends true
    ? LastElementOf<UnionToArray<T[K]>>
    : T[K];
};

/**
 * @see https://github.com/type-challenges/type-challenges/blob/main/questions/02949-hard-objectfromentries/README.md
 * @see https://github.com/type-challenges/type-challenges/issues/3382
 */
export type ObjectFromEntries<T extends [string, any]> = {
  [K in T[0]]: T extends [K, any] ? T[1] : never;
};

/**
 * @see https://stackoverflow.com/questions/45894524/getting-type-of-a-property-of-a-typescript-class-using-keyof-operator
 */
export type ExtractValue<TObj, TProp extends keyof TObj> = TObj[TProp];

export type Entry<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T];

export type Entries<T> = Entry<T>[];

// ------------------------------------------ Spread ------------------------------------------
type OptionalPropertyNames<T> = {
  [K in keyof T]-?: {} extends { [P in K]: T[K] } ? K : never;
}[keyof T];

type SpreadProperties<L, R, K extends keyof L & keyof R> = {
  [P in K]: L[P] | Exclude<R[P], undefined>;
};

type Id<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

type SpreadTwo<L, R> = Id<
  Pick<L, Exclude<keyof L, keyof R>> &
    Pick<R, Exclude<keyof R, OptionalPropertyNames<R>>> &
    Pick<R, Exclude<OptionalPropertyNames<R>, keyof L>> &
    SpreadProperties<L, R, OptionalPropertyNames<R> & keyof L>
>;

export type Spread<A extends readonly [...any]> = A extends [
  infer L,
  ...infer R
]
  ? SpreadTwo<L, Spread<R>>
  : unknown;
// ------------------------------------------ Spread ------------------------------------------

// ------------------------------------------ "Type safe" Map ------------------------------------------
export type MapEntries = [any, any];
export type KeyToValue<K, E extends MapEntries> = E extends [infer EK, infer EV]
  ? K extends EK
    ? EV
    : never
  : never;

/**
 * @see https://www.typescriptlang.org/play/?ssl=21&ssc=41&pln=1&pc=1#code/C4TwDgpgBAogdsATgSwgZygXigbQIZwgA0UBIAugFDIISIBmeAxtACISRwAmECAsnjAAeGFAgAPYLy4Z4SVGgB8UAN6UoUegHtEMZgAsAFEzwAbUwCNmAa3pwAXFCEBpMZOmycABnKLD6jSgANzMAVwhHGElEZmAREhxnEjJfHABGchJrCBBHJKgAW0FHdk4efkERRQCASixlIK1kLhJgfWQ0AEFEAHMAfkcyGsdG5oBuAJ6IONcJKW5PHz9s3KhnYdho2PjcfJTFdPIoAB8oUO4IehoILgmNNGmXN3mZWG9fQxW8khDTcMitkw4jAEntCKkMhs2h07lBEBA8FwtHBTCAoGhkAAvCJQOChAoWOiwnAAZRABK0pgAdMgpDFgDpyIYNgBJOl4CymCBsuh4BmIKqw3jydDMxw8mKc7ns-mCgIrNBiqASjlclWymDvRSw37hRWs9lS9U6ESHbUBeGI5Go3BkinUhkk+RwHoAFTwPXIjjQzp6EwAvpRqLQGMw2BxpMKBGAAMLIn2IUJAnSqAJwCAAdycojmHlgCBQ6D8AQ0wsLaEiOCoGg2pUjFWEMHNGnTWZEzzzcnLflrEYuDblGktSJRaLAiC0DNAkBKffKwGjQjI5sDlCY8eAUDr-YXgiwUGjpAw2-n0bjcATSf5EzXG6gK06jgAYucgchkfvmfVVFBA+uL5uKwAEKOCopCOHiBJ0L++5gXgjhpAATAAzL+Qb-j6hR7tgrZbnOUaVDgL5wG+yIkJBhKIEcpw4HBEH4pRv4kBYWiUgicC+EGRRgFSDzAJ8OSdCQSHIXUAD0YlQFo1iUNxvHTAJIBAa0iYQOJknSehd7wbiDHQac5w8Fc6ZcPuclTPxD41LeAFQBYjgsWxBAnGcFzGTcZmCFSFmKUB1myV5fGKUJUBIOE1lyUFwHCSh1lAA
 */
export interface DependentMap<E extends MapEntries> {
  forEach(
    callbackfn: <K extends E[0]>(
      value: KeyToValue<K, E>,
      key: K,
      map: DependentMap<E>
    ) => void,
    thisArg?: any
  ): void;
  get<K extends E[0]>(key: K): KeyToValue<K, E> | undefined;
  set<K extends E[0]>(key: K, value: KeyToValue<K, E>): this;
  readonly size: number;
  [Symbol.iterator](): IterableIterator<E>;
  entries(): IterableIterator<E>;
  keys(): IterableIterator<E[0]>;
  values(): IterableIterator<E[1]>;
  readonly [Symbol.toStringTag]: string;
}

export interface DependentMapConstructor {
  new <E extends MapEntries>(entries: E[]): DependentMap<E>;
  new <E extends MapEntries>(): DependentMap<E>;
  readonly prototype: DependentMap<any>;
}
// ------------------------------------------ "Type safe" Map ------------------------------------------

type PickEntry<T extends [any, any]> = {
  [Key in T[0]]: [Key, any];
}[T[0]];

export type PluginFunction<TNew extends MapEntries> = <
  TBase extends MapEntries
>(
  recordMap: DependentMap<TBase>
) => DependentMap<Exclude<TBase, PickEntry<TNew>> | TNew>;

// export type StrictMapEntry = Record<any, any>;

// export interface StrictMap<TRecord extends StrictMapEntry> {
//   // forEach(
//   //   callbackfn: <TKey extends keyof TRecord>(
//   //     value: TRecord[TKey],
//   //     key: TKey,
//   //     map: StrictMap<TRecord>
//   //   ) => void,
//   //   thisArg?: this
//   // ): void;
//   get<TKey extends keyof TRecord>(key: TKey): TRecord[TKey] | undefined;
//   set<TKey extends keyof TRecord>(key: TKey, value: TRecord[TKey]): this;
//   has<TKey extends keyof TRecord>(key: TKey): boolean;
//   // [Symbol.iterator](): IterableIterator<keyof TRecord>;
//   // readonly size: number;
//   // readonly [Symbol.toStringTag]: string;
//   // entries(): IterableIterator<any>;
//   // keys(): IterableIterator<keyof TRecord>;
//   // values(): IterableIterator<any>;
// }

// // export type ObjectFromEntries<T extends [string, any]> = {
// //   [K in T[0]]: T extends [K, any] ? T[1] : never;
// // };

// // type S = FromEntries<
// //   StrictMap<{
// //     count: () => number;
// //     set: (newCount: number) => number;
// //   }>
// // >;

// export var fromEntries: <T extends StrictMap<StrictMapEntry>>(
//   entries: T
// ) => T extends StrictMap<infer U> ? U : never = Object.fromEntries;

// // export var fromEntries: <T extends StrictMap<StrictMapEntry>>(
// //   entries: T
// // ) => ObjectFromEntries<T extends StrictMap<infer U> ? U : never> =
// //   Object.fromEntries ;

// var setupCounter = () => {
//   const recordMap = new Map() as StrictMap<
//     Spread<
//       [
//         StrictMapEntry,
//         {
//           count: () => number;
//           set: (newCount: number) => number;
//         }
//       ]
//     >
//   >;

//   return recordMap;
// };

// export type Prettify<T> = {
//   [K in keyof T]: T[K];
// } & {};

// type TTTT = Spread<
//   [
//     StrictMapEntry,
//     {
//       log: () => void;
//     }
//   ]
// >;

// type PlgFn<TNewEntry extends StrictMapEntry> = <
//   TBaseEntry extends StrictMapEntry
// >(
//   // recordMap: StrictMap<TNewEntry | TBaseEntry>

//   // recordMap: StrictMap<TBaseEntry & TNewEntry>

//   // recordMap: StrictMap<Spread<[TBaseEntry, TNewEntry]>>

//   // recordMap: StrictMap<Spread<[TNewEntry, TBaseEntry]>>

//   // recordMap: StrictMap<Spread<[TBaseEntry, TNewEntry]>>

//   // recordMap: StrictMap<TNewEntry>

//   // recordMap: StrictMap<TBaseEntry> extends StrictMap<infer U>
//   //   ? StrictMap<U & TNewEntry>
//   //   : never

//   recordMap: StrictMap<TBaseEntry> extends StrictMap<infer U>
//     ? StrictMap<TNewEntry & U>
//     : never

//   // recordMap: Spread<[TBaseEntry, TNewEntry]>
//   // recordMap: StrictMap<TBaseEntry> extends StrictMap<infer U>
//   //   ? StrictMap<TBaseEntry>
//   //   : never
//   // ) => StrictMap<TNewEntry & TBaseEntry>;
//   // ) => StrictMap<Spread<[TBaseEntry, TNewEntry]>>;
// ) => StrictMap<TBaseEntry> extends StrictMap<infer U>
//   ? StrictMap<U & TNewEntry>
//   : never;
// // ) => StrictMap<TBaseEntry>;
// // ) => any;
// // ) => StrictMap<TBaseEntry> extends StrictMap<infer U>
// //   ? StrictMap<TNewEntry & U>
// //   : never;

// var withTest: PlgFn<{
//   count: (() => number) | (() => string);
//   test: () => void;
// }> = (recordMap) => {
//   var count = recordMap.get('count') as () => number;
//   var test = recordMap.get('count');

//   recordMap.set('count', () => '');

//   return recordMap as any;
// };

// var withLog: PlgFn<{
//   log: () => void;
// }> = (recordMap) => {
//   var log = () => {};

//   recordMap.set('log', log);

//   return recordMap as any;
// };

// var createCounter = () => fromEntries(withTest(setupCounter()));
// var counter = createCounter();

// type R = {
//   count: () => number;
//   set: (newCount: number) => number;
// } & {
//   count: (() => number) | (() => string);
//   test: () => void;
// };

// type R0 = Prettify<
//   {
//     count: () => number;
//     set: (newCount: number) => number;
//   } & {
//     count: (() => number) | (() => string);
//     test: () => void;
//   }
// >;

// type R1 = Spread<
//   [
//     // old
//     {
//       count: () => number;
//       set: (newCount: number) => number;
//     },
//     // new
//     {
//       count: (() => number) | (() => string);
//       test: () => void;
//     }
//   ]
// >;

// type R2 = Spread<
//   [
//     // old
//     StrictMapEntry,
//     // new
//     {
//       count: (() => number) | (() => string);
//       test: () => void;
//     }
//   ]
// >;
