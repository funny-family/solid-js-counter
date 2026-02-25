import type { Entry } from '../../types';
import type { CounterRecord } from '../../counter/counter.composable.types';
import type { CounterInterface } from 'lib/counter/counter.types';

export type WithIncrementDecrementRecord = {
  increment: CounterInterface['set'];
  decrement: CounterInterface['set'];
};

export type WithIncrementDecrementRecordEntry =
  | Entry<WithIncrementDecrementRecord>
  | Entry<Pick<CounterRecord, 'set'>>;
