const $ownerHost = Symbol('ownerHost');
const $onAction = Symbol('onAction');

const Store = SuperClass => class extends SuperClass {
  get ownerHost() {
    if (this[$ownerHost] == null) {
      const parent = this.parentNode;

      while (parent != null && parent.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
        parent = parent.parentNode;
      }

      this[$ownerHost] = parent != null
          ? parent.host
          : document;
    }

    return this[$ownerHost];
  }

  constructor() {
    super();

    this[$onAction] = action => this.onAction(action);
  }

  connectedCallback() {
    super.connectedCallback();

    this.ownerHost.addEventListener('action', this[$onAction]);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.ownerHost.removeEventListener('action', this[$onAction]);
    this[$ownerHost] = null;
  }

  onAction(event) {}
};

export { ActionObserver };
