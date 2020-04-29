import { EventEmitter } from 'events';
import Dispatcher from '../../dispatcher/dispatcher';

const CHANGE = 'CHANGE';

class Store extends EventEmitter {
  constructor() {
    super();
    Dispatcher.register(this._registerToActions.bind(this));
  }

  _registerToActions() {
    return 'Not implemented';
  }

  emitChange = () => {
    this.emit(CHANGE);
  }

  addChangeListener(callback) {
    this.on(CHANGE, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE, callback);
  }
}

export default Store;