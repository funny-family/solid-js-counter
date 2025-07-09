import { setupCounter } from '@lib/counter/counter.composable';
import { Counter, fromEntries } from '@lib/index';

var createCounter = () => fromEntries(setupCounter());

export default () => {
  // var counter = new Counter();
  var counter = createCounter();
  window.counter = counter;

  const onSet = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const value = Number(target.value);

    counter.set(() => value);
  };

  return (
    <div>
      <div>
        count: <b>{counter.count()} </b>
      </div>

      <div>
        <input
          type="number"
          onChange={(event) => {
            onSet(event);
          }}
          onBlur={(event) => {
            onSet(event);
          }}
        />
      </div>

      <button
        type="button"
        onClick={() => {
          counter.increment(() => 1);
        }}
      >
        +
      </button>

      <button
        type="button"
        onClick={() => {
          counter.decrement(() => 1);
        }}
      >
        -
      </button>
    </div>
  );
};
