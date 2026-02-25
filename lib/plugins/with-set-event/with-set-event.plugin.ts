// import { CounterRecord } from './../../counter/counter.composable.types';
// import type {
//   CreateWithSetEventSetup,
//   SetupWithSetEventRecord,
//   WithSetEventRecord,
// } from './with-set-event.plugin.types';
// import { createWithEventSetup } from '../utils';

import { DependentMap, Entry, PluginFunction } from 'lib/types';
import { createEventPluginSetup } from '../utils/create-event-plugin-setup/create-event-plugin-setup.util';
import { createEventRecord } from '../utils/create-event-record/create-event-record.util';
import { SetupWithEventPlugin, Test } from './with-set-event.plugin.types';
import { EventPluginRecord } from '../utils/create-event-plugin-setup/create-event-plugin-setup.util.types';

export const SET_EVENTS_RECORD_SYMBOL = Symbol('SET_EVENTS_RECORD_SYMBOL');

// export var createWithSetEventSetup: CreateWithSetEventSetup =
//   (predicate) => (recordMap) => {
//     const eventRecord = predicate();

//     var counter_on = recordMap.get('on');
//     const on: WithSetEventRecord['on'] = (type, listener) => {
//       counter_on && counter_on(type, listener);

//       eventRecord.on(type, listener);
//     };

//     var counter_clearEvent = recordMap.get('clearEvent');
//     const clearEvent: WithSetEventRecord['clearEvent'] = (listener) => {
//       counter_clearEvent && counter_clearEvent(listener);

//       return eventRecord.clearEvent(listener);
//     };

//     var counter_clearEventsOf = recordMap.get('clearEventsOf');
//     const clearEventsOf: WithSetEventRecord['clearEventsOf'] = (type) => {
//       counter_clearEventsOf && counter_clearEventsOf(type);

//       eventRecord.clearEventsOf(type);
//     };

//     recordMap.set('on', on);
//     recordMap.set('clearEvent', clearEvent);
//     recordMap.set('clearEventsOf', clearEventsOf);
//     recordMap.set(EVENTS_RECORD_SYMBOL, eventRecord.eventsRecord);

//     return recordMap;
//   };

// export var setupWithSetEvents =
//   (
//     setupFunction: (
//       recordMap: SetupWithSetEventRecord
//     ) => SetupWithSetEventRecord
//   ) =>
//   (_recordMap: SetupWithSetEventRecord) => {
//     const recordMap = setupFunction(_recordMap);

//     var counter_count = recordMap.get('count')!;
//     var counter_set = recordMap.get('set')!;
//     var eventsRecord = recordMap.get(EVENTS_RECORD_SYMBOL)!;

//     const set: CounterRecord['set'] = (predicate) => {
//       var previousCount = counter_count();

//       return predicate(previousCount);
//     };

//     recordMap.set('set', set);

//     return recordMap;
//   };

// export var setupWithSetEvent: SetupWithEventPlugin<'set', Test> =
//   (setupFunction) => (_recordMap) => {
//     const recordMap = setupFunction(_recordMap);
//     const on = recordMap.get('on')!;

//     return recordMap;
//   };

// export var setupWithSetEvent =
//   <TSetupFunction extends any, TRecordMap extends any>(
//     setupFunction: TSetupFunction
//   ) =>
//   (_recordMap: TRecordMap) => {
//     const recordMap = setupFunction(_recordMap);

//     return recordMap;
//   };

var tSetupFunction = createEventPluginSetup(() => createEventRecord('set'));

type E = Entry<
  {
    on: (type: 'set', listener: VoidFunction) => void;
  } & Pick<EventPluginRecord, 'clearEvent' | 'clearEventsOf'>
>;

// export var setupWithSetEvent =
//   (setupFunction) => (_recordMap: DependentMap<[]>) => {
//     const recordMap = setupFunction(_recordMap);

//     return recordMap;
//   };

export var setupWithSetEvent =
  (
    setupFunction: (recordMap: DependentMap<E>) => DependentMap<E>
  ): PluginFunction<E> =>
  (_recordMap: DependentMap<E>) => {
    const recordMap = setupFunction(_recordMap);

    const on = recordMap.get('on')!;

    return recordMap;
  };

export var withSetEvent = setupWithSetEvent(
  createEventPluginSetup(() => createEventRecord('set'))
);
