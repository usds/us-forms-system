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

### Validating a field based on other fields in the same object

You can use `ui:validations` to validate objects in order to compare subfields. For example, given this schema:

```js
{
  type: 'object',
  properties: {
    email: {
      type: 'string'
    },
    confirmEmail: {
      type: 'string'
    }
  }
}
```

If you use `ui:validations` on this object field instead of on the email or confirmEmail fields, you can compare the two fields:

```js
export function validateEmailsMatch(errors, pageData) {
  const { email, confirmEmail } = pageData;
  if (email !== confirmEmail) {
    errors.confirmEmail.addError('Please ensure your entries match');
  }
}
```

The function must be referenced in the `uiSchema`:

```js
{
  'ui:validations': [ validateEmailsMatch ],
  email: {
    'ui:title': 'Email address'
  },
  confirmEmail: {
    'ui:title': 'Re-enter email address'
  }
}
```

### Changing drop-down options based on data in another field

Use the `updateSchema` option in `uiSchema` to change a list of enums:

```js
{
  'ui:options': {
    updateSchema: (form, pageSchema) {
      if (form.myField === 'otherOption') {
        return {
          enum: ['option1', 'option2'],
          enumNames: ['Option 1', 'Option 2']
        }
      } else {
        return {
          enum: ['option1', 'option2'],
          enumNames: ['Option 1', 'Option 2']
        }
      }
    }
  }
}
```

Only the properties in the returned object are changed in the current schema. The object returned isn't used as an exact replacement for the schema, and if the current schema contains other properties, they aren't removed.

For a long list of options, create all variations of the schema outside of the update function and use the update function to switch between them. You won't need to create a new schema object each time data changes in the form, requiring your field to re-render.
