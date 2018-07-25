# Common patterns for building forms

Some forms require custom validation, styles, or conditional information based on user input. Use these patterns to address those needs.

### In this guide

- [Writing custom field validation](#writing-custom-field-validation)
- [Validating a field based on other fields in the same object](#validating-a-field-based-on-other-fields-in-the-same-object)
- [Changing drop-down options based on data in another field](#changing-drop-down-options-based-on-data-in-another-field)
- [Creating a block of text with no associated fields](#creating-a-block-of-text-with-no-associated-fields)
- [Conditionally hiding a group of fields](#conditionally-hiding-a-group-of-fields)
- [Styling expanded or collapsed fields](#styling-expanded-or-collapsed-fields)
- [Conditionally including a page](#conditionally-including-a-page)

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
    errors.addError('Please enter a valid 9 digit SSN (dashes allowed)');
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

### Creating a block of text with no associated fields

Use 'ui:description' to show text or a custom component before the fields in a particular object in the schema.

To create a block of text with no fields that follow, create an empty view object:

```js
// schema
{
  type: 'object',
  properties: {
    'view:textObject': {
      type: 'object',
      properties: {}
    }
  }
}

// uiSchema
{
  'view:textObject': {
    'ui:description': 'My text'
  }
}
```

### Conditionally hiding a group of fields

Sometimes fields in a form are siblings to others, but should be hidden conditionally. For example, this schema defines a field named `employed` that is rendered as a checkbox the user can check. If this field is false (the checkbox is not checked) there is no need to display the `jobStartDate` or `monthlyWages` fields:

```js
schema: {
  type: 'object',
  properties: {
    employed: { type: 'boolean' },
    jobStartDate: { type: 'string' },
    monthlyWages: { type: 'string' },
    otherMonthlyIncome: { type: 'string' }
  }
}

```

To accomplish this, the `schema` and `uiSchema` are written as:

```js
schema: {
  type: 'object',
  properties: {
    employed: { type: 'boolean' },
    'view:jobInformation': {
      type: 'object',
      properties: {
        jobStartDate: { type: 'string' },
        monthlyWages: { type: 'string' }
      }
    },
    otherMonthlyIncome: { type: 'string' }
  }
},
uiSchema: {
  employed: { 'ui:title': 'I am employed' },
  'view:jobInformation': {
    'ui:options': {
      hideIf: (formData) => !formData.employed
    },
    jobStartDate: { 'ui:title': 'Job start date' },
    monthlyWages: { 'ui:title': 'Monthly wages' },
  },
  otherMonthlyIncome: { 'ui:title': 'Other monthly income' }
}
```

The `hideIf` function is passed a copy of the current `formData` in order to determine the condition upon which the fields are shown. In this example, it will hide the fields unless `employed` is `true`.

Objects from the form config with names that start with `view:` are not passed to the back-end, but fields within those `view:` objects are passed to the back-end by including them in the parent object. In this example, the fields `jobStartDate` and `monthlyWages` would be included in the same object as `employed` and `otherMonthlyIncome`, while the field for `view:JobInformation` would be filtered out.

## Styling expanded or collapsed fields

To indent or otherwise style fields that are expanded or collapsed with the `expandUnder` option, set a class on the controlling field. For example:

```js
// uiSchema
{
  field1: {
    'ui:title': 'This field expands/collapses other items',
    'ui:options': {
      expandUnderClassNames: 'schemaform-expandUnder-indent'
    }
  },
  field2: {
    'ui:title': 'This field is controlled by field1'
    'ui:options': {
      expandUnder: 'field1'
    }
  },
  field3: {
    'ui:title': 'This field is controlled by field1'
    'ui:options': {
      expandUnder: 'field1'
    }
  }
}
```

In this example, `schemaform-expandUnder-indent` is applied to the `div` that surrounds `field2` and `field3`, which indents the fields. For additional styling, create a new class and add your own styles.

### Conditionally including a page

The `depends` property determines whether a page is active or not. `depends` can work in a few ways:

```js
// With an object
depends: {
  passPhrase: 'open sesame'
}

// With an array
// This will activate the page if any of the items in the array are true. Think || not &&.
depends: [
  { passPhrase: 'open sesame' },
  { passPhrase: 'open up!' }
]

// With a function
depends: (formData) => {
  // return bool, true if page is active, false if page should be skipped
  return formData.passPhrase === 'open sesame' && formData.codeWord === 'chicken';
}
```

For example, given this chapter configuration:

```js
chapterName: {
  title: 'Chapter Title',
  pages: {
    pageName: {
      ...
      schema: {
        type: 'object',
        properties: {
          passPhrase: { type: 'string' }
        }
      }
    }
    otherPageName: {
      title: 'Page title',
      path: 'path/to/page',
      initialData: {},
      depends: {
        passPhrase: 'open sesame'
      },
      uiSchema: {},
      schema: {}
    }
  }
}
```

If a user types 'open sesame' for the `passPhrase` on the first page, `otherPageName` is active. For any other value, including no value, `otherPageName` is inactive and the page is skipped.

**Don't use the pass phrase as a secure login or other authentication mechanism.** Within the source, the text of a pass phrase is clear text, even when it's in a function.

[Back to *Building a Form*](README.md)
