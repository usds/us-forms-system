## Form config

### I want to conditionally hide a group of fields

We may have some fields that are siblings to others, but need to be hidden conditionally. Take the following schema snippet (from the education benefits form 22-5490):

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

Only `chapter35`, `chapter33`, `transferOfEntitlement`, `veteranFullName`, and `veteranSocialSecurityNumber` need to be hidden conditionally, so we can make the `schema` and `uiSchema` like so:

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

When this form is sent to the backend, the fields in the `view:sponsorServiceOptions` object will be moved up one level and sent alongside `dic` and `chapter31`. The back end will never see objects with names that start with `view:`, but it will get all the fields inside of them.

## I want to indent or style the fields that are using expandUnder

If you need to indent all the fields that are being expanded/collapsed with the expandUnder option, or do some other styling, you can set a class on the controlling field.

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

Now, `schemaform-expandUnder-indent` will be applied to the div that surrounds `field2` and `field3`. This class currently indents the fields, so if that's what you need, you're all set. If you need to do other styling, you can create a new class to use here and add your own styles.

## I want to skip / conditionally include a page based on some information

We use the `depends` property on the page to determine whether the page is active or not. For example, your chapter config might look like this:
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
If you then enter 'open sesame' for the `passPhrase` on the first page, `otherPageName` will be active. If you enter anything else (or nothing), `otherPageName` won't be active, and the page will be skipped.

`depends` can work in a few ways:
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
