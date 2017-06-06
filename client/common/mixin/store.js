import { ActionObserver } from './action-observer.js';

const $onReducersChanged = Symbol('onReducersChanged');

const Store = SuperClass => class extends ActionObserver(SuperClass) {
  static get reducers() { return {}; }

  static get properties() {
    return {
      reducers: {
        type: Object,
        notify: true,
        readOnly: true
      },

      state: {
        type: Object,
        readOnly: true,
        notify: true,
        value: () => ({})
      }
    };
  }

  constructor() {
    super();

    this.reducers = this._setReducers(this.constructor.reducers);
    this[$onReducersChanged] = event => this.onReducersChanged(event);
  }

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener('reducers-changed', this[$onReducersChanged]);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener('reducers-changed', this[$onReducersChanged]);
  }

  onAction(event) {
    const action = event.detail;
    const state = {};

    for (const key in this.reducers) {
      const reducer = this.reducers[key];
      const oldState = this.state[key];
      const newState = reducer(action, oldState);

      state[key] = newState;
    }

    this._setState(state);
  }

  onReducersChanged(event) {}
};

export { Store };
