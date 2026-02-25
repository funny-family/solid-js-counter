import type {
  DependentMap,
  Entry,
  ExtractValue,
  MapEntries,
  PluginFunction,
  Spread,
} from './../../types';
// import type { DependentMap, Entry, ExtractValue, Spread } from '../../types';
// import { type EVENTS_RECORD_SYMBOL } from './with-set-event.plugin';
// import type { WithEventSetupRecord } from '../utils';
import type { CounterRecord } from './../../counter/counter.composable.types';

import type {
  CreateEventPluginSetup,
  CreateEventRecordReturnValue,
} from '../utils/create-event-plugin-setup/create-event-plugin-setup.util.types';
import { EventRecord } from '../utils/create-event-record/create-event-record.util.types';
import { type SET_EVENTS_RECORD_SYMBOL } from './with-set-event.plugin';

// export type WithSetEventRecord = WithEventSetupRecord<'set', VoidFunction>;

// export type WithSetEventSetupRecord = Spread<
//   [
//     Pick<WithSetEventRecord, 'on' | 'clearEvent' | 'clearEventsOf'>,
//     {
//       [EVENTS_RECORD_SYMBOL]: ExtractValue<WithSetEventRecord, 'eventsRecord'>;
//     }
//   ]
// >;

// export type WithSetEventSetupRecordEntry = Entry<WithSetEventSetupRecord>;

// export type SetupWithSetEventRecord = DependentMap<
//   WithSetEventSetupRecordEntry | Entry<Pick<CounterRecord, 'count' | 'set'>>
// >;

// export type CreateWithSetEventSetup = (
//   predicate: () => WithSetEventRecord
// ) => (recordMap: SetupWithSetEventRecord) => SetupWithSetEventRecord;

// export type SetupWithSetEvent = (
//   setupFunction: () => EventRecord<>
// ) => PluginFunction<
//   Entry<
//     Spread<
//       [
//         EventRecord<'set', VoidFunction>,
//         {
//           [SET_EVENTS_RECORD_SYMBOL]: ExtractValue<
//             CreateEventRecordReturnValue,
//             'eventsRecord'
//           >;
//         }
//       ]
//     >
//   >
// >;

type E<TEventType extends string> = Entry<
  Spread<[Omit<EventRecord<TEventType, VoidFunction>, 'eventsRecord'>]>
>;

export type SetupWithEventPlugin<
  TEventType extends string,
  TRestEntry extends MapEntries
> = (
  updateRecordMap: (
    recordMap: DependentMap<E<TEventType>>
  ) => DependentMap<E<TEventType> | TRestEntry>
) => PluginFunction<E<TEventType> | TRestEntry>;

export type Test = Entry<Pick<CounterRecord, 'count' | 'set'>>;
