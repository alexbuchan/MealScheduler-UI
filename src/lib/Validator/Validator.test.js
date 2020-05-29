import Validator from './Validator';

describe('Validator', () => {
  let validator;
  let state;

  beforeEach(() => {
    const fields = [];
    state = {
      username: 'username',
      email: 'user@email.com',
      password: 'password'
    };

    validator = new Validator([], ...fields);
  });

  describe('#validate', () => {
    it('should call valid method', () => {
      const validSpy = jest.spyOn(validator, 'valid');

      validator.validate(state);

      expect(validSpy).toHaveBeenCalledTimes(1);
    });

    describe('when Validator field arguments are NOT required', () => {
      let validator;
      let state;

      beforeEach(() => {
        const fields = ['email', 'password'];
        state = {
          email: '',
          password: ''
        };

        validator = new Validator([], ...fields);
      });

      it('should NOT validate fields when empty', () => {
        expect(validator.validate(state)).toEqual({
          'isValid': true,
          'email': {
            'isInvalid': false,
            'message': '',
            'isRequired': false
          },
          'password': {
            'isInvalid': false,
            'message': '',
            'isRequired': false
          }
        });
      });
    });

    describe('when Validator field arguments are required', () => {
      let validator;
      let state;

      beforeEach(() => {
        const fields = ['email', 'password'];
        state = {
          email: '',
          password: ''
        };

        validator = new Validator(['email', 'password'], ...fields);
      });

      it('should validate fields when empty', () => {
        expect(validator.validate(state)).toEqual({
          'isValid': false,
          'email': {
            'isInvalid': true,
            'message': 'Email is required.',
            'isRequired': true
          },
          'password': {
            'isInvalid': true,
            'message': 'Password is required.',
            'isRequired': true
          }
        });
      });
    });

    describe('when Validator field arguments do NOT have a validation rule', () => {
      let validator;
      let state;

      beforeEach(() => {
        const fields = ['noRule'];
        state = {
          noRule: 'noRule'
        };

        validator = new Validator([], ...fields);
      });

      it('should return the default validation object', () => {
        expect(validator.validate(state)).toEqual({
          'isValid': true,
          'noRule': {
            'isInvalid': false,
            'message': '',
            'isRequired': false
          }
        });
      });
    });

    describe('when Validator field arguments do have a validation rule', () => {
      describe('when fields are valid', () => {
        let validator;
        let state;

        beforeEach(() => {
          const fields = ['email', 'password'];
          state = {
            email: 'user@email.com',
            password: 'password'
          };

          validator = new Validator([], ...fields);
        });
        it('should return the default validation object', () => {
          expect(validator.validate(state)).toEqual({
            'isValid': true,
            'email': {
              'isInvalid': false,
              'message': '',
              'isRequired': false
            },
            'password': {
              'isInvalid': false,
              'message': '',
              'isRequired': false
            }
          });
        });
      });

      describe('when fields are NOT valid', () => {
        let validator;
        let state;

        beforeEach(() => {
          const fields = ['email', 'password'];
          state = {
            email: 'email',
            password: 'pass'
          }

          validator = new Validator([], ...fields);
        });

        it('should return a validation object that contains an invalid field and rule message', () => {
          expect(validator.validate(state)).toEqual({
            'isValid': false,
            'email': {
              'isInvalid': true,
              'message': 'That is not a valid email.',
              'isRequired': false
            },
            'password': {
              'isInvalid': true,
              'message': 'Password should be longer than 6 characters.',
              'isRequired': false
            }
          });
        });
      });
    });
  });
});