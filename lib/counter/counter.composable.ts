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
  const set: CounterRecord['set'] = (predicate) => (
    setCount(counter.set(predicate))
  );

  recordMap.set('set', set);
  recordMap.set('count', count);

  return recordMap;
};

export var setupCounter = createCounterSetup(() => new Counter());
