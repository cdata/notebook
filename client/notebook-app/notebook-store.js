import { Element as PolymerElement } from '../node_modules/@polymer/polymer/polymer-element.js';
import { Store } from '../common/mixin/store.js';
import { notes } from './reducer/notes.js';

class NotebookStore extends Store(PolymerElement) {
  static get is() {
    return 'notebook-store';
  }

  static get reducers() {
    return {
      notes
    };
  }
}

customElements.define(NotebookStore.is, NotebookStore);

export { NotebookStore };

