import type { Accessor } from 'solid-js';
import type { DependentMap, Entry, Spread } from '../types';
import type { CounterInterface } from './counter.types';
import type { Counter } from './counter';

export type CounterRecord = Spread<
  [
    Pick<CounterInterface, 'count' | 'set'>,
    {
      count: Accessor<CounterInterface['count']>;
      increment: CounterInterface['set'];
      decrement: CounterInterface['set'];
    }
  ]
>;

export type CounterRecordEntry = Entry<CounterRecord>;

export type SetupCounter = () => DependentMap<CounterRecordEntry>;

export type CreateCounterSetup = (predicate: () => Counter) => SetupCounter;
