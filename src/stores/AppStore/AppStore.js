import Store from '../Store/Store';
import Constants from '../../constants/appConstants';

class AppStore extends Store {
  constructor() {
    super();

    this.appState = {
      locale: 'es',
      locales: ['en', 'es', 'fr']
    };
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case Constants.CHANGE_LOCALE:
        this.changeLocale(action.data);
        break;
    }
  }

  changeLocale = (data) => {
    this.appState.locale = data;
    this.emitChange();
  }

  getAppState = () => {
    return this.appState;
  }
}

export default new AppStore();