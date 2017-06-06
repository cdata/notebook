import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js';
import { NoteAction } from './reducer/notes.js';
import { ActionDispatcher } from '../common/mixin/action-dispatcher.js';

class NotebookNote extends ActionDispatcher(PolymerElement) {
  static get is() {
    return 'notebook-note';
  }

  static get template() {
    return `
<style>
  :host {
    display: list-item;
  }
</style>
<span>[[note.value]]</span>
<button on-click="remove">x</button>
`;
  }

  static get properties() {
    return {
      note: {
        type: Object
      }
    };
  }

  remove() {
    this.dispatchAction({
      type: NoteAction.REMOVE,
      note: this.note
    });
  }
}

customElements.define(NotebookNote.is, NotebookNote);

export { NotebookNote };
