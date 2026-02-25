import { Counter, fromEntries } from '@lib/index';
import { setupCounter } from '@lib/counter/counter.composable';
import { withBaseEvents } from '@lib/plugins/with-base-events';
import { onCleanup, onMount } from 'solid-js';

var createCounter = () => fromEntries(withBaseEvents(setupCounter()));

export default () => {
  // var counter = new Counter();
  var counter = createCounter();
  window.counter = counter;

  const onSet = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const value = Number(target.value);

    counter.set(() => value);
  };

  var onCounterChange = () => {
    console.log('set!');
  };

  var onCounterIncrement = () => {
    console.log('increment!');
  };

  var onCounterDecrement = () => {
    console.log('decrement!');
  };

  onMount(() => {
    counter.on('set', onCounterChange);
    counter.on('increment', onCounterIncrement);
    counter.on('decrement', onCounterDecrement);
  });

  onCleanup(() => {
    counter.clearEventsOf('set');
    counter.clearEventsOf('increment');
    counter.clearEventsOf('decrement');
  });

  return (
    <div>
      <h1>With base events</h1>

      <pre>open the console to see events fire</pre>

      <div>
        count: <b>{counter.count()} </b>
      </div>

      <div>
        <input
          type="number"
          value={counter.count()}
          onChange={(event) => {
            onSet(event);
          }}
          // onBlur={(event) => {
          //   onSet(event);
          // }}
        />
      </div>

      <button
        type="button"
        onClick={() => {
          counter.set((previousValue) => previousValue + 1);
        }}
      >
        +
      </button>

      <button
        type="button"
        onClick={() => {
          counter.set((previousValue) => previousValue - 1);
        }}
      >
        -
      </button>
    </div>
  );
};
