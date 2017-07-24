let validate = require('validate.js')

module.exports = function liveValidate (fieldValue, fieldName, formConstraints, formErrors) {
  let objectToValidate = {}
  objectToValidate[fieldName] = fieldValue

  let constraints = {}
  constraints[fieldName] = formConstraints[fieldName]
  for (let i = 0; i < formErrors[fieldName].length; i++) {
    formErrors[fieldName] = []
  }

  let errors = validate(objectToValidate, constraints)

  if (errors) {
    for (let propertyName in errors) {
      formErrors[propertyName] = errors[propertyName]
    }
  }
}
