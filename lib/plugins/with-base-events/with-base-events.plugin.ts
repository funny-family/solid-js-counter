import {
  SET_EVENTS_SET_SYMBOL,
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
import type { CounterRecord } from './../../counter/counter.composable.types';

export var withBaseEvents: PluginFunction<WithBaseEventsRecordEntry> = (
  recordMap: DependentMap<WithBaseEventsRecordEntry>
) => {
  var setEventsSet: WithBaseEventsRecord[typeof SET_EVENTS_SET_SYMBOL] =
    new Set();
  var incrementEventsSet: WithBaseEventsRecord[typeof INCREMENT_EVENTS_SET_SYMBOL] =
    new Set();
  var decrementEventsSet: WithBaseEventsRecord[typeof DECREMENT_EVENTS_SET_SYMBOL] =
    new Set();

  var counter_count = recordMap.get('count')!;
  var counter_set = recordMap.get('set')!;

  const set: CounterRecord['set'] = (predicate) => {
    var previousCount = counter_count();

    return counter_set((previousValue) => {
      const newValue = predicate(previousValue);

      // prettier-ignore
      (newValue !== previousCount) && (
        setEventsSet.forEach((listener) => {
          listener();
        })
      );

      // prettier-ignore
      (newValue > previousCount) && (
        incrementEventsSet.forEach((listener) => {
          listener();
        })
      );

      // prettier-ignore
      (newValue < previousCount) && (
        decrementEventsSet.forEach((listener) => {
          listener();
        })
      );

      return newValue;
    });
  };

  const on = ((type, listener: ListenerWithTypeField) => {
    // prettier-ignore
    type === 'set' && (
      listener[LISTENER_TYPE_SYMBOL] = 'set',
      setEventsSet.add(listener)
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
    type === 'set' && (
      setEventsSet.delete(listener)
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
    type === 'set' && setEventsSet.clear();

    // prettier-ignore
    type === 'increment' && incrementEventsSet.clear();

    // prettier-ignore
    type === 'decrement' && decrementEventsSet.clear();
  };

  recordMap.set('set', set);
  recordMap.set('on', on);
  recordMap.set('clearEvent', clearEvent);
  recordMap.set('clearEventsOf', clearEventsOf);
  recordMap.set(SET_EVENTS_SET_SYMBOL, setEventsSet);
  recordMap.set(DECREMENT_EVENTS_SET_SYMBOL, incrementEventsSet);
  recordMap.set(DECREMENT_EVENTS_SET_SYMBOL, decrementEventsSet);

  return recordMap;
};
