import { FormControl, ValidationErrors } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

//export function mensajes()
export function validateRequired(err, field: FormlyFieldConfig) {
  return `El campo ${field.key} es requerido`;
}

export function validateMinLength(err, field: FormlyFieldConfig) {
  return `Should have atleast ${field.templateOptions.minLength} characters`;
}
export function validateMaxLength(err, field: FormlyFieldConfig) {
  return `Should have less than ${field.templateOptions.maxLength} characters`;
}
export function validateMin(err, field: FormlyFieldConfig) {
  return 'Debe haber más de  ' + field.templateOptions.min + ' caracteres';
}
export function validateMax(err, field: FormlyFieldConfig) {
  return `This value should be less than ${field.templateOptions.max}`;
}

// Custom validation
export function IpValidator(control: FormControl): ValidationErrors {
  console.log('Field', control.value);
  return !control.value || /(\d{1,3}\.){3}\d{1,3}/.test(control.value)
    ? null
    : { ip: true };
}
export function IpValidatorMessage(err, field: FormlyFieldConfig) {
  return `"${field.formControl.value}" is not a valid IP Address`;
}
