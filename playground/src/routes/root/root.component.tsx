import { A } from '@solidjs/router';
import { type ParentProps } from 'solid-js';

export default (props: ParentProps) => {
  return (
    <main>
      <ul>
        <li>
          <A href="/base">base</A>
        </li>
        <li>
          <A href="/with-limits">with-limits</A>
        </li>
        <li>
          <A href="/with-base-events">with-base-events</A>
        </li>
        <li>
          <A href="/mix">mix</A>
        </li>
      </ul>

      {props.children}
    </main>
  );
};
