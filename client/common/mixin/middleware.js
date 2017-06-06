import { ActionObserver } from './action-observer.js';

const Middleware = SuperClass =>
    class extends ActionDispatcher(ActionObserver(SuperClass)) {};

export { Middleware };
