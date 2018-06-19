# Creating custom field validation

Within the `uiSchema` object, use `ui:validations` to add field validations.

If you pass a function, it will be called with these arguments:

- `errors`: The errors object for the field.
- `fieldData`: The data for the field.
- `formData`: The current form data.
- `schema`: The current JSON Schema for the field.
- `errorMessages`: The error messsage object (if available) for the field.

Every validation function should update the errors object with found errors by calling its `addErrors()` method. For example:

```js
function validateSSN(errors, ssn) {
  if (!isValidSSN(ssn)) {
    errors.addError('Please enter a valid 0 digit SSN (dashes allowed)');
  }
}
```

Items in the `ui:validations` array can also be objects. Objects should have two properties:

- `options`: The object that will be passed to your validation function. You can use this to allow your validation function to be configurable for different fields on the form.
- `validator`: A function with the same signature as above, plus the options object.

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

[Back to *Form Recipes*](README.md)
