import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js';
import '/node_modules/@polymer/polymer/lib/elements/dom-repeat.js';
import './notebook-store.js';
import './notebook-note.js';
import { NoteAction } from './reducer/notes.js';
import { ActionDispatcher } from '../common/mixin/action-dispatcher.js';

class NotebookApp extends ActionDispatcher(PolymerElement) {
  static get is() {
    return 'notebook-app';
  }

  static get template() {
    return `
<style>
  :host {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
<notebook-store
    on-state-changed="onStateChanged">
</notebook-store>
<ul>
  <dom-repeat items="[[state.notes]]" as="note">
    <template>
      <notebook-note note="[[note]]"></notebook-note>
    </template>
  </dom-repeat>
</ul>
<input id="input" type="text"></input>
<button on-click="createNote">Add</button>
`;
  }

  static get properties() {
    return {
      state: {
        type: Object
      }
    };
  }

  onStateChanged(event) {
    const state = event.detail.value;
    this.state = state;
    console.log('State:', state);
  }

  createNote() {
    this.dispatchAction({
      type: NoteAction.ADD,
      note: {
        value: this.$.input.value
      }
    });
  }
}

customElements.define(NotebookApp.is, NotebookApp);

export { NotebookApp };
