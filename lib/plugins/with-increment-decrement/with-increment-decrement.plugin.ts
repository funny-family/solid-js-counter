import type { WithIncrementDecrementRecordEntry } from './with-increment-decrement.plugin.types';
import type { DependentMap, PluginFunction } from '../../types';
import type { CounterRecord } from '../../counter/counter.composable.types';

export var withIncrementDecrement: PluginFunction<
  WithIncrementDecrementRecordEntry
> = (recordMap: DependentMap<WithIncrementDecrementRecordEntry>) => {
  var counter_set = recordMap.get('set')!;

  // prettier-ignore
  const increment: CounterRecord['set'] = (predicate) => (
    counter_set((previousValue) => previousValue + predicate(previousValue))
  );

  // prettier-ignore
  const decrement: CounterRecord['set'] = (predicate) => (
    counter_set((previousValue) => previousValue - predicate(previousValue))
  );

  recordMap.set('increment', increment);
  recordMap.set('decrement', decrement);

  return recordMap;
};
