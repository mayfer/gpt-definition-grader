


import { h, render } from 'https://cdn.skypack.dev/preact';
import { useState } from 'https://cdn.skypack.dev/preact/hooks';
import { html } from 'https://cdn.skypack.dev/htm/preact';


const ResponseDisplay = ({ response }) => {
  return html`
    <pre class="border border-gray-300 p-4 rounded-md mt-4">
      ${JSON.stringify(response, null, 2)}
    </pre>
  `;
};

export default ResponseDisplay;

