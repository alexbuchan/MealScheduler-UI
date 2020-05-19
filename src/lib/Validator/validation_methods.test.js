// export const isEmpty = (field) => {
//   return (field.length === 0);
// };

// export const usernameLength = (username) => {
//   return (username.length > 2);
// };

// export const isValidEmail = (email) => {
//   const regex = RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);
//   return regex.test(email);
// };

// export const passwordLength = (password) => {
//   return (password.length > 6);
// };

import { isEmpty, usernameLength, isValidEmail, passwordLength } from './validation_methods';

describe('Validation Methods', () => {
  describe('#isEmpty', () => {
    describe('when field has length equal to zero', () => {
      it('should return true', () => {
        const field = '';
        expect(isEmpty(field)).toBe(true);
      });
    });

    describe('when field has a length larger than 0', () => {
      it('should return false', () => {
        const field = 'field';
        expect(isEmpty(field)).toBe(false);
      });
    });
  });

  describe('#usernameLength', () => {
    describe('when username field has length smaller than or equal to 2', () => {
      it('should return false', () => {
        const field = 'us';
        expect(usernameLength(field)).toBe(false);
      });
    });

    describe('when username field has a length larger than 2', () => {
      it('should return true', () => {
        const field = 'username';
        expect(usernameLength(field)).toBe(true);
      });
    });
  });

  describe('#isValidEmail', () => {
    describe('when email field does not match regex pattern', () => {
      it('should return false', () => {
        const field = 'email';
        expect(isValidEmail(field)).toBe(false);
      });
    });

    describe('when email field matches the regex pattern', () => {
      it('should return true', () => {
        const field = 'user@email.com';
        expect(isValidEmail(field)).toBe(true);
      });
    });
  });

  describe('#passwordLength', () => {
    describe('when password field has length smaller or equal to 6', () => {
      it('should return false', () => {
        const field = 'pass';
        expect(passwordLength(field)).toBe(false);
      });
    });

    describe('when password field has length larger than 6', () => {
      it('should return true', () => {
        const field = 'password';
        expect(passwordLength(field)).toBe(true);
      });
    });
  });
});