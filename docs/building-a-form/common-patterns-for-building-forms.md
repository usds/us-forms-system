# Common patterns for building forms

Some forms require custom validation, styles, or conditional information based on user input. Use these patterns to address those needs.

### In this guide

- Writing custom field validation
- Validating a field based on other fields in the same object
- Changing drop-down options based on data in another field
- Creating a block of text with no associated fields
- Conditionally hiding a group of fields
- Styling expanded or collapsed fields
- Conditionally including a page

[Back to *Building a Form*](building-a-form/README.md)

### Writing custom field validation

To add field validations to your forms that JSON Schema doesn't provide, use the array `ui:validations` in the `uiSchema` object. `ui:validations` can be a function or an object.

If you pass a function, `ui:validations` is called with these arguments:

- `errors`: The errors object for the field.
- `fieldData`: The data for the field.
- `formData`: The current form data.
- `schema`: The current JSON Schema for the field.
- `errorMessages`: The error messsage object for the field, if available.

Every validation function should update the `errors` object with any errors found by calling the `addErrors()` method. For example:

```js
function validateSSN(errors, ssn) {
  if (!isValidSSN(ssn)) {
    errors.addError('Please enter a valid 0 digit SSN (dashes allowed)');
  }
}
```

When items in the `ui:validations` array are objects, they have two properties:

- `options`: The object that's passed to the validation function. This allows you to configure your validation function for different fields in the form.
- `validator`: A function with the same signature as above, plus the `options` object.

```js
{
  validator: (errors, ssn, formData, schema, errorMessages, options) => {
    if (!isValidWidget(ssn, options.someOption)) {
      errors.addError('Please enter a valid 9 digit SSN (dashes allowed)');
    }
  },
  options: {
    someOption: true
  }
}
```
