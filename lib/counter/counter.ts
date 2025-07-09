import type { CounterInterface } from './counter.types';

export class Counter implements CounterInterface {
  count: CounterInterface['count'] = 0;

  // prettier-ignore
  set: CounterInterface['set'] = (predicate) => (
    (this.count = predicate(this.count))
  );
}
