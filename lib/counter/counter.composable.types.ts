import type { Accessor } from 'solid-js';
import type { DependentMap, Entry, MapEntries, Spread } from '../types';
import type { CounterInterface } from './counter.types';
import type { Counter } from './counter';

export type CounterRecord = Spread<
  [
    Pick<CounterInterface, 'count' | 'set'>,
    {
      count: Accessor<CounterInterface['count']>;
    }
  ]
>;

export type CounterRecordEntry = Entry<CounterRecord>;

export type SetupCounter = <
  T extends MapEntries
  // >() => DependentMap<CounterRecordEntry> & DependentMap<MapEntries>;
  // >() => DependentMap<CounterRecordEntry & MapEntries>;
  // >() => DependentMap<CounterRecordEntry | MapEntries>;
  // >() => DependentMap<CounterRecordEntry> & DependentMap<T>;
  // >() => DependentMap<T & CounterRecordEntry>;
  // >() => DependentMap<T> | DependentMap<CounterRecordEntry>;
// >() => DependentMap<T> & DependentMap<CounterRecordEntry>;
>() => DependentMap<CounterRecordEntry>;

export type CreateCounterSetup = (predicate: () => Counter) => SetupCounter;
