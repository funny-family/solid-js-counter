export type EventRecord<
  TType extends string,
  TListener extends VoidFunction
> = {
  eventsRecord: Map<TListener, TListener>;
  on: (type: TType, listener: TListener) => void;
  clearEvent: (listener: VoidFunction) => boolean;
  clearEventsOf: (type: TType) => void;
};

export type CreateEventRecord = <TType extends string>(
  name: TType
) => EventRecord<TType, VoidFunction>;

export const createEventRecord: CreateEventRecord = (name) => {
  var eventsRecord: Map<VoidFunction, VoidFunction> = new Map();

  const on: ReturnType<CreateEventRecord>['on'] = (type, listener) => {
    // prettier-ignore
    type === name && (
      eventsRecord.set(listener, listener)
    );
  };

  const clearEvent: ReturnType<CreateEventRecord>['clearEvent'] = (listener) =>
    eventsRecord.delete(listener);

  const clearEventsOf: ReturnType<CreateEventRecord>['clearEventsOf'] = (
    type
  ) => {
    // prettier-ignore
    name === type && (
      eventsRecord.clear()
    );
  };

  return {
    eventsRecord,
    on,
    clearEvent,
    clearEventsOf,
  };
};
