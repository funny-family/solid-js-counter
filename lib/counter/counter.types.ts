export type MutationPredicate = (previousValue: number) => number;

export type CounterInterface = {
  count: number;
  set: (predicate: MutationPredicate) => CounterInterface['count'];
  // increment: (predicate: MutationPredicate) => CounterInterface['count'];
  // decrement: (predicate: MutationPredicate) => CounterInterface['count'];
};
