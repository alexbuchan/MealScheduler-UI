import validation_rules from './validation_rules';

class Validator {
  constructor(requiredFields = [], ...args) {
    this.requiredFields = requiredFields;
    this.validation_rules = validation_rules;
    this.fields = args;
  }

  validate = (state) => {
    let validation = this.valid();

    this.validation_rules.forEach(rule => {
      if (!this.fields.includes(rule.field)) {
        return;
      }

      if (!this.requiredFields.includes(rule.field) && rule.methodName === 'isEmpty') {
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

  valid = () => {
    const validation = {};

    this.fields.map(field => {
      const isRequired = this.requiredFields.includes(field);
      validation[field] = { isInvalid: false, message: '', isRequired: isRequired };
    });

    return { isValid: true, ...validation };
  }
}


export default Validator;