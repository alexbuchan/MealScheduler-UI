import validation_rules from './validation_rules';

class Validator {
  constructor(...args) {
    this.validation_rules = validation_rules;
    this.fields = args;
  }

  validate = (state) => {
    let validation = this.valid(); // isValid: true, validation: { username: { isInvalid: false, message: '' }, etc... }

    this.validation_rules.forEach(rule => {
      if (!this.fields.includes(rule.field)) {
        return;
      }

      const field_value = state[rule.field];

      if (rule.method(field_value) !== rule.validWhen) {
        validation[rule.field] = { isInvalid: true, message: rule.message }
        validation.isValid = false;
      }
    });

    return validation;
  }

  valid() {
    const validation = {} // username = { isInvalid: false, message: '' }, etc...

    this.fields.map(field => ( // rule.field = username
      validation[field] = { isInvalid: false, message: '' }
    ));

    return { isValid: true, ...validation };
  }
}


export default Validator;