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

Sometimes fields in a form are siblings to others, but must be hidden conditionally. For example, see this schema snippet from [VA Form 22-5490](https://www.va.gov/vaforms/form_detail.asp?FormNo=22-5490):

```json
"previousBenefits": {
  "type": "object",
  "properties": {
    "disability": { "type": "boolean" },
    "dic": { "type": "boolean" },
    "chapter31": { "type": "boolean" },
    "ownServiceBenefits": { "type": "string" },
    "chapter35": { "type": "boolean" },
    "chapter33": { "type": "boolean" },
    "transferOfEntitlement": { "type": "boolean" },
    "other": { "type": "string" },
    "veteranFullName": { "$ref": "#/definitions/fullName" },
    "veteranSocialSecurityNumber": { "$ref": "#/definitions/ssn" }
  }
}
```

Only `chapter35`, `chapter33`, `transferOfEntitlement`, `veteranFullName`, and `veteranSocialSecurityNumber` are conditionally hidden, so the `schema` and `uiSchema` are written as:

```js
// schema
{
  disability: { ... },
  dic: { ... },
  chapter31: { ... },
  ownServiceBenefits: { ... },
  'view:sponsorServiceOptions': {
    chapter35: { ... },
    chapter33: { ... },
    transferOfEntitlement: { ... },
    veteranFullName: { ... },
    veteranSocialSecurityNumber: { ... }
  },
  other: { ... }
}

// uiSchema
{
  disability: { ... },
  dic: { ... },
  chapter31: { ... },
  ownServiceBenefits: { ... },
  'view:sponsorServiceOptions': {
    hideIf: (formData) => /* Some condition here */,
    chapter35: { ... },
    chapter33: { ... },
    transferOfEntitlement: { ... },
    veteranFullName: { ... },
    veteranSocialSecurityNumber: { ... }
  },
  other: { ... }
}
```

From this, the fields in the `view:sponsorServiceOptions` object are moved up one level and sent alongside `dic` and `chapter31`. The back end doesn't see objects with names that start with `view:`, but it gets all fields inside those objects.

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
