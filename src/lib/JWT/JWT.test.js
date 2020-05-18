import JWT from './JWT';
import jwtDecode from 'jwt-decode';
jest.mock("jwt-decode");

describe('JWT', () => {
  describe('#decodeJWTToken', () => {
    it('decodes a json web token', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      JWT.decodeJWTToken(token);
      expect(jwtDecode).toHaveBeenCalledWith(token);
    });
  });
});