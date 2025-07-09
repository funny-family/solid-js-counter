import type { Entry } from '../../types';
import type { CounterRecord } from '../../counter/counter.composable.types';
import type {
  LISTENER_TYPE_SYMBOL,
  CHANGE_EVENTS_SET_SYMBOL,
  DECREMENT_EVENTS_SET_SYMBOL,
  INCREMENT_EVENTS_SET_SYMBOL,
} from './utils';

export type ListenerWithTypeField = VoidFunction & {
  [LISTENER_TYPE_SYMBOL]: 'change' | 'increment' | 'decrement';
};

export type WithBaseEventsRecord = {
  [CHANGE_EVENTS_SET_SYMBOL]: Set<VoidFunction>;
  [INCREMENT_EVENTS_SET_SYMBOL]: Set<VoidFunction>;
  [DECREMENT_EVENTS_SET_SYMBOL]: Set<VoidFunction>;
  on: <TListener extends VoidFunction>(
    type: 'change' | 'increment' | 'decrement',
    listener: TListener
  ) => void;
  clearEvent: (listener: VoidFunction) => void;
  clearEventsOf: (type: 'change' | 'increment' | 'decrement') => void;
};

export type WithBaseEventsRecordEntry =
  | Entry<WithBaseEventsRecord>
  | Entry<Pick<CounterRecord, 'count' | 'set'>>;
