import validation_rules from './validation_rules';

class Validator {
  constructor() {
    this.validation_rules = validation_rules;
  }

  validate = (state, ...args) => {
    const fields = args;
    let validation = this.valid(...fields); // isValid: true, validation: { username: { isInvalid: false, message: '' }, etc... }

    this.validation_rules.forEach(rule => {
      if (!fields.includes(rule.field)) {
        return;
      }

      const field_value = state[rule.field];

      if(rule.method(field_value) !== rule.validWhen) {
        validation[rule.field] = { isInvalid: true, message: rule.message }
        validation.isValid = false;
      }
    });

    return validation;
  }

  valid(...args) {
    const fields = args;
    const validation = {} // username = { isInvalid: false, message: '' }, etc...

    if (fields) {
      fields.map(field => ( // rule.field = username
        validation[field] = { isInvalid: false, message: '' }
      ));
    }
    return { isValid: true, ...validation };
  }
}


export default Validator;