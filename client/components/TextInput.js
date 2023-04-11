


import { h, render } from 'https://cdn.skypack.dev/preact';
import { useState } from 'https://cdn.skypack.dev/preact/hooks';
import { html } from 'https://cdn.skypack.dev/htm/preact';

const TextInput = ({ value, onChange, onSubmit }) => {
  return html`
    <textarea
      class="border border-gray-300 p-2 rounded-md w-full"
      type="text"
      onInput=${(e) => onChange(e.target.value)}
      onKeyPress=${(e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          onSubmit();
        }
      }}
    >${value}</textarea>
  `;
};

export default TextInput;

