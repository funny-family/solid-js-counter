export type EventRecord<
  TType extends string,
  TListener extends VoidFunction
> = {
  eventsRecord: Set<TListener>;
  on: (type: TType, listener: TListener) => void;
  clearEvent: (listener: VoidFunction) => boolean;
  clearEventsOf: (type: TType) => void;
};

export type CreateEventRecord = <TType extends string>(
  eventType: TType
) => EventRecord<TType, VoidFunction>;
