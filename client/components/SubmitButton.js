


import { h, render } from 'https://cdn.skypack.dev/preact';
import { useState } from 'https://cdn.skypack.dev/preact/hooks';
import { html } from 'https://cdn.skypack.dev/htm/preact';

const SubmitButton = ({ onClick }) => {
  return html`
    <button
      class="bg-blue-500 text-white p-2 rounded-md"
      onClick=${onClick}
    >
      Submit
    </button>
  `;
};

export default SubmitButton;

