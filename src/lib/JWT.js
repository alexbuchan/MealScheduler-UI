import jwtDecode from 'jwt-decode';

const JWT = {
  decodeJWTToken(token) {
    return jwtDecode(token);
  }
}

export default JWT;