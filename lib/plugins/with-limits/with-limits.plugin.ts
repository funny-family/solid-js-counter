import { createSignal } from 'solid-js';
import type {
  WithLimitsRecord,
  WithLimitsRecordEntry,
} from './with-limits.plugin.types';
import type { DependentMap, PluginFunction } from '../../types';
import type { CounterRecord } from '../../counter/counter.composable.types';

export var withLimits: PluginFunction<WithLimitsRecordEntry> = (
  recordMap: DependentMap<WithLimitsRecordEntry>
) => {
  const minLimitSignal = createSignal(0);
  var min = minLimitSignal[0];
  var setMin: WithLimitsRecord['setMin'] = minLimitSignal[1];

  const maxLimitSignal = createSignal(0);
  var max = maxLimitSignal[0];
  var setMax: WithLimitsRecord['setMax'] = maxLimitSignal[1];

  var counter_set = recordMap.get('set')!;

  // prettier-ignore
  const set: CounterRecord['set'] = (predicate) =>
    counter_set((previousValue) => {
      var newValue = predicate(previousValue);

      newValue < min() && (
        newValue = previousValue
      );

      newValue > max() && (
        newValue = previousValue
      );

      return newValue;
    });

  recordMap.set('set', set);
  recordMap.set('min', min);
  recordMap.set('setMin', setMin);
  recordMap.set('max', max);
  recordMap.set('setMax', setMax);

  return recordMap;
};
