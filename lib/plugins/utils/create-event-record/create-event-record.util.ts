import type {
  CreateEventRecord,
  EventRecord,
} from './create-event-record.util.types';

export const createEventRecord: CreateEventRecord = (eventType) => {
  var eventsRecord: ReturnType<CreateEventRecord>['eventsRecord'] = new Set();

  // prettier-ignore
  const on: ReturnType<CreateEventRecord>['on'] = (type, listener) => (
    type === eventType && (
      eventsRecord.add(listener)
    )
  );

  // prettier-ignore
  const clearEvent: ReturnType<CreateEventRecord>['clearEvent'] = (listener) => (
    eventsRecord.delete(listener)
  );

  // prettier-ignore
  const clearEventsOf: ReturnType<CreateEventRecord>['clearEventsOf'] = (
    type
  ) => (
    type === eventType && (
      eventsRecord.clear()
    )
  );

  return {
    eventsRecord,
    on,
    clearEvent,
    clearEventsOf,
  };
};
