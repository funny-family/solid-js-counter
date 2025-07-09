import {
  CHANGE_EVENTS_SET_SYMBOL,
  DECREMENT_EVENTS_SET_SYMBOL,
  INCREMENT_EVENTS_SET_SYMBOL,
  LISTENER_TYPE_SYMBOL,
} from './utils';
import type {
  ListenerWithTypeField,
  WithBaseEventsRecord,
  WithBaseEventsRecordEntry,
} from './with-base-events.plugin.types';
import type { DependentMap, PluginFunction } from '../../types';

export var withBaseEvents: PluginFunction<WithBaseEventsRecordEntry> = (
  recordMap: DependentMap<WithBaseEventsRecordEntry>
) => {
  var changeEventsSet: WithBaseEventsRecord[typeof CHANGE_EVENTS_SET_SYMBOL] =
    new Set();
  var incrementEventsSet: WithBaseEventsRecord[typeof INCREMENT_EVENTS_SET_SYMBOL] =
    new Set();
  var decrementEventsSet: WithBaseEventsRecord[typeof DECREMENT_EVENTS_SET_SYMBOL] =
    new Set();

  var count = recordMap.get('count')!;

  const on = ((type, listener: ListenerWithTypeField) => {
    // prettier-ignore
    type === 'change' && (
      listener[LISTENER_TYPE_SYMBOL] = 'change',
      changeEventsSet.add(listener)
    );

    // prettier-ignore
    type === 'increment' && (
      listener[LISTENER_TYPE_SYMBOL] = 'increment',
      incrementEventsSet.add(listener)
    );

    // prettier-ignore
    type === 'decrement' && (
      listener[LISTENER_TYPE_SYMBOL] = 'decrement',
      decrementEventsSet.add(listener)
    );
  }) as WithBaseEventsRecord['on'];

  const clearEvent = ((listener: ListenerWithTypeField) => {
    const type = listener[LISTENER_TYPE_SYMBOL];

    // prettier-ignore
    type === 'change' && (
      changeEventsSet.delete(listener)
    );

    // prettier-ignore
    type === 'increment' && (
      incrementEventsSet.delete(listener)
    );

    // prettier-ignore
    type === 'decrement' && (
      decrementEventsSet.delete(listener)
    );
  }) as WithBaseEventsRecord['clearEvent'];

  const clearEventsOf: WithBaseEventsRecord['clearEventsOf'] = (type) => {
    // prettier-ignore
    type === 'change' && changeEventsSet.clear();

    // prettier-ignore
    type === 'increment' && incrementEventsSet.clear();

    // prettier-ignore
    type === 'decrement' && decrementEventsSet.clear();
  };

  recordMap.set('on', on);
  recordMap.set('clearEvent', clearEvent);
  recordMap.set('clearEventsOf', clearEventsOf);
  recordMap.set(CHANGE_EVENTS_SET_SYMBOL, changeEventsSet);
  recordMap.set(DECREMENT_EVENTS_SET_SYMBOL, incrementEventsSet);
  recordMap.set(DECREMENT_EVENTS_SET_SYMBOL, decrementEventsSet);

  return recordMap;
};
