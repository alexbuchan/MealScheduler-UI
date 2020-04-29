import Cookie from 'universal-cookie';

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
}

export default new ActionsHelper();