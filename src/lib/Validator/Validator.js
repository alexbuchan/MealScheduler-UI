import validation_rules from './validation_rules';

class Validator {
  constructor(requiredFields, ...args) {
    this.requiredFields = requiredFields;
    this.validation_rules = validation_rules;
    this.fields = args;
  }

  validate = (state) => {
    let validation = this.valid();

    this.validation_rules.forEach(rule => {
      // Check if there are no rules for field.
      if (!this.fields.includes(rule.field)) {
        return;
      }

      // Check if field is not required. Do not validate isEmpty unless required.
      if (!this.requiredFields.includes(rule.field) && rule.methodName === 'isEmpty') {
        return;
      }

      const field_value = state[rule.field];

      if (rule.method(field_value) !== rule.validWhen) {
        const isRequired = this.isFieldRequired(rule.field);
        validation[rule.field] = { isInvalid: true, message: rule.message, isRequired: isRequired }
        validation.isValid = false;
      }
    });

    return validation;
  }

  valid = () => {
    const validation = {};

    this.fields.map(field => {
      const isRequired = this.isFieldRequired(field);
      validation[field] = { isInvalid: false, message: '', isRequired: isRequired };
    });

    return { isValid: true, ...validation };
  }

  isFieldRequired = (field) => {
    return this.requiredFields.includes(field);
  }
}


export default Validator;