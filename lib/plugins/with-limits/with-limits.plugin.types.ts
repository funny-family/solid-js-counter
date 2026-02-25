import type { Entry } from '../../types';
import type { CounterRecord } from '../../counter/counter.composable.types';

export type WithLimitsRecord = {
  min: () => number;
  setMin: (predicate: (previousValue: number) => number) => number;
  max: () => number;
  setMax: (predicate: (previousValue: number) => number) => number;
};

export type WithLimitsRecordEntry =
  | Entry<WithLimitsRecord>
  | Entry<Pick<CounterRecord, 'set'>>;
