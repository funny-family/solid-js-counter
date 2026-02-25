import { onCleanup, onMount } from 'solid-js';
import { Counter, fromEntries } from '@lib/index';
import { setupCounter } from '@lib/counter/counter.composable';
import { withLimits } from '@lib/plugins/with-limits';
import { withBaseEvents } from '@lib/plugins/with-base-events';


// prettier-ignore
var createCounter = () => (
  fromEntries(
    // order of plugins is matter!
    withLimits(
      withBaseEvents(
        setupCounter()
      )
    )
  )
);

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
    counter.setMin(() => 0);
    counter.setMax(() => 3);

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
      <h1>Mix</h1>

      <p>
        Mix of plugins <code>withLimits</code> and <code>withBaseEvents</code>
      </p>

      <div>
        <div>
          <label for="784sfdh" style={{ display: 'block' }}>
            <span>Min limit</span>&nbsp;
            <b>({counter.min()} value)</b>
          </label>
          <input
            type="number"
            placeholder="Set min limit value"
            id="784sfdh"
            value={counter.min()}
            onChange={(event) => {
              const target = event.target as HTMLInputElement;
              const value = Number(target.value);

              counter.setMin(() => value);
            }}
          />
        </div>

        <div>
          <label for="849hfj" style={{ display: 'block' }}>
            <span>Max limit</span>&nbsp;
            <b>({counter.max()} value)</b>
          </label>
          <input
            type="number"
            placeholder="Set max limit value"
            id="849hfj"
            value={counter.max()}
            onChange={(event) => {
              const target = event.target as HTMLInputElement;
              const value = Number(target.value);

              counter.setMax(() => value);
            }}
          />
        </div>
      </div>

      <br />

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
