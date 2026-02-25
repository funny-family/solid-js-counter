import type { Entry } from '../../types';
import type { CounterRecord } from '../../counter/counter.composable.types';
import type {
  LISTENER_TYPE_SYMBOL,
  SET_EVENTS_SET_SYMBOL,
  DECREMENT_EVENTS_SET_SYMBOL,
  INCREMENT_EVENTS_SET_SYMBOL,
} from './utils';

export type ListenerType = 'set' | 'increment' | 'decrement';

export type ListenerWithTypeField = VoidFunction & {
  [LISTENER_TYPE_SYMBOL]: ListenerType;
};

export type WithBaseEventsRecord = {
  [SET_EVENTS_SET_SYMBOL]: Set<VoidFunction>;
  [INCREMENT_EVENTS_SET_SYMBOL]: Set<VoidFunction>;
  [DECREMENT_EVENTS_SET_SYMBOL]: Set<VoidFunction>;
  on: <TListener extends VoidFunction>(
    type: ListenerType,
    listener: TListener
  ) => void;
  clearEvent: (listener: VoidFunction) => void;
  clearEventsOf: (type: ListenerType) => void;
};

export type WithBaseEventsRecordEntry =
  | Entry<WithBaseEventsRecord>
  | Entry<Pick<CounterRecord, 'count' | 'set'>>;
