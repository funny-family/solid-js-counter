import type {
  DependentMap,
  Entry,
  ExtractValue,
  Spread,
} from './../../../types';
import type {
  CreateEventRecord,
  EventRecord,
} from '../create-event-record/create-event-record.util.types';
import { type EVENTS_RECORD_SYMBOL } from './create-event-plugin-setup.util';

export type CreateEventRecordReturnValue = ReturnType<CreateEventRecord>;

export type EventPluginRecord = Spread<
  [
    Pick<CreateEventRecordReturnValue, 'on' | 'clearEvent' | 'clearEventsOf'>,
    {
      [EVENTS_RECORD_SYMBOL]: ExtractValue<
        CreateEventRecordReturnValue,
        'eventsRecord'
      >;
    }
  ]
>;

export type EventPluginRecordMap = DependentMap<Entry<EventPluginRecord>>;

export type EventRecordPredicate<
  TType extends string,
  TListener extends VoidFunction
> = () => EventRecord<TType, TListener>;

export type CreateEventPluginSetup = <
  TType extends string,
  TListener extends VoidFunction
>(
  predicate: EventRecordPredicate<TType, TListener>
) => (recordMap: EventPluginRecordMap) => EventPluginRecordMap;
