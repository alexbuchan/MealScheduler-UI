import validation_rules from './validation_rules';

class Validator {
  constructor() {
    this.validation_rules = validation_rules;
  }

  validate = (state) => {
    let validation = this.valid(); // isValid: true, validation: { username: { isInvalid: false, message: '' }, etc... }

    this.validation_rules.forEach(rule => {
      const field_value = state[rule.field];

      if(rule.method(field_value) !== rule.validWhen) {
        validation[rule.field] = { isInvalid: true, message: rule.message }
        validation.isValid = false;
      }
    });

    return validation;
  }

  valid() {
    const validation = {} // username = { isInvalid: false, message: '' }, etc...
    this.validation_rules.map(rule => ( // rule.field = username
      validation[rule.field] = { isInvalid: false, message: '' }
    ));

    return { isValid: true, ...validation };
  }
}


export default Validator;