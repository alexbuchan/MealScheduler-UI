import Cookie from 'universal-cookie';
import JWT from '../lib/JWT/JWT';

class ActionsHelper {
  getCookie = (type) => {
    const cookie = new Cookie();
    return cookie.get(type);
  }

  setCookie = (type, token) => {
    const cookie = new Cookie();
    cookie.set(type, token, { path: '/' });
  }

  removeCookie = () => {
    const cookie = new Cookie();
    cookie.remove('user');
  }

  asyncHelper = (promise) => {
    return promise.then(data => {
       return [null, data];
    })
    .catch(err => [err]);
  }

  handleTokenResponse = (response) => {
    switch(response.status) {
      case 200:
      case 201:
      case 202:
        this.setCookie('user', response.data.token);
        return JWT.decodeJWTToken(response.data.token);

      default:
        return;
    }
  }
}

export default new ActionsHelper();