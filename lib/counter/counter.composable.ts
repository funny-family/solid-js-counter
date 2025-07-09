import { createSignal } from 'solid-js';
import { Counter } from './counter';
import type {
  CounterRecord,
  CounterRecordEntry,
  CreateCounterSetup,
} from './counter.composable.types';
import type { DependentMapConstructor } from '../types';

export var createCounterSetup: CreateCounterSetup = (predicate) => () => {
  const recordMap = new (Map as DependentMapConstructor)<CounterRecordEntry>();
  var counter = predicate();

  const countSignal = createSignal(counter.count);
  const count = countSignal[0];
  var setCount = countSignal[1];

  // prettier-ignore
  var set: CounterRecord['set'] = (predicate) => (
    setCount(counter.set(predicate))
  );

  // prettier-ignore
  const increment: CounterRecord['set'] = (predicate) => (
    set((previousValue) => previousValue + predicate(previousValue))
  );

  // prettier-ignore
  const decrement: CounterRecord['set'] = (predicate) => (
    set((previousValue) => previousValue - predicate(previousValue))
  );

  recordMap.set('count', count);
  recordMap.set('set', set);
  recordMap.set('increment', increment);
  recordMap.set('decrement', decrement);

  return recordMap;
};

export var setupCounter = createCounterSetup(() => new Counter());
