const ActionDispatcher = SuperClass => class extends SuperClass {
  dispatchAction(action) {
    this.dispatchEvent(new CustomEvent('action', {
      detail: action,
      bubbles: true,
      cancelable: true
    }));
  }
};

export { ActionDispatcher }
