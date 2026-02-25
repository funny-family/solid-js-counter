import type { CreateEventPluginSetup } from './create-event-plugin-setup.util.types';
import type { CreateEventRecord } from '../create-event-record/create-event-record.util.types';

export const EVENTS_RECORD_SYMBOL = Symbol('EVENTS_RECORD_SYMBOL');

export var createEventPluginSetup: CreateEventPluginSetup =
  (predicate) => (recordMap) => {
    const eventRecord = predicate() as unknown as ReturnType<CreateEventRecord>;

    // prettier-ignore
    const create_on = (
      (
        counter_on: ReturnType<CreateEventRecord>['on'] | undefined,
        eventRecord_on: ReturnType<CreateEventRecord>['on'],
      ): ReturnType<CreateEventRecord>['on'] =>
      (type, listener) => (
        counter_on && counter_on(type, listener),
        eventRecord_on(type, listener)
      )
    );
    const on = create_on(recordMap.get('on'), eventRecord.on);

    // prettier-ignore
    const create_clearEvent = (
      (
        counter_clearEvent: ReturnType<CreateEventRecord>['clearEvent'] | undefined,
        eventRecord_clearEvent: ReturnType<CreateEventRecord>['clearEvent'],
      ): ReturnType<CreateEventRecord>['clearEvent'] =>
      (listener) => (
        counter_clearEvent && counter_clearEvent(listener),
        eventRecord_clearEvent(listener)
      )
    );
    const clearEvent = create_clearEvent(
      recordMap.get('clearEvent'),
      eventRecord.clearEvent
    );

    // prettier-ignore
    const create_clearEventsOf = (
      (
        counter_clearEventsOf: ReturnType<CreateEventRecord>['clearEventsOf'] | undefined,
        eventRecord_clearEventsOf: ReturnType<CreateEventRecord>['clearEventsOf'],
      ): ReturnType<CreateEventRecord>['clearEventsOf'] =>
      (type) => (
        counter_clearEventsOf && counter_clearEventsOf(type),
        eventRecord_clearEventsOf(type)
      )
    );
    const clearEventsOf = create_clearEventsOf(
      recordMap.get('clearEventsOf'),
      eventRecord.clearEventsOf
    );

    recordMap.set('on', on);
    recordMap.set('clearEvent', clearEvent);
    recordMap.set('clearEventsOf', clearEventsOf);
    recordMap.set(EVENTS_RECORD_SYMBOL, eventRecord.eventsRecord);

    return recordMap;
  };
