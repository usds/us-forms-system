# About the `schema` and `uiSchema` objects

The US Forms System lets you build web-based forms using the JSON Schema standard for form data and React for the form UI. The form data and UI are represented by `schema` and `uiSchema` objects, respectively, which are included in the form configuration file.

- [Understanding the `schema` object](#understanding-json-schema-and-the-schema-object)
  - [Describing object fields and arrays](#describing-object-fields-and-arrays)
- [Understanding the `uiSchema` object](#understanding-the-uischema-object)
  - [Configuring `uiSchema` using rjsf options](#configuring-uischema-using-rjsf-options)
  - [Configuring `uiSchema` using US Form System options](#configuring-uischema-using-us-form-system-options)

### Understanding the `schema` object

The JSON Schema standard describes the allowed shape of JSON objects. Using a `schema` object, a JSON schema provides information about structured JSON data. For more information about the JSON Schema Standard, see [Understanding JSON Schema](https://spacetelescope.github.io/understanding-json-schema/).

For JSON Schema validator libraries, the US Forms System uses [ajv](https://www.npmjs.com/package/ajv) for unit tests and [jsonschema](https://www.npmjs.com/package/jsonschema) in the us-forms-system code.

##### Describing object fields and arrays

This example describes a JSON document that is an object with one property called `myField`, which is a number, meaning `{ myField: 2 }` would be valid:

```
{
  type: 'object',
  properties: {
    myField: {
      type: 'number'
    }
  }
}
```

However, `{}` is also valid. To require a property in an object, use the `required` property, which takes an array of property names passed as strings. As in this example, `required` is always on the object that contains the field, not the field itself:

```
{
  type: 'object',
  required: ['myField'],
  properties: {
    myField: {
      type: 'number'
    }
  }
}
```

Arrays work similarly to objects. This example describes an array of boolean values: `[true, false, true]`. Items can be an object schema or any other type of schema as well:

```
{
  type: 'array',
  items: {
    type: 'boolean'
  }
}
```

### Understanding the `uiSchema` object

The `uiSchema` object was introduced by [react-jsonschema-form](https://github.com/mozilla-services/react-jsonschema-form#react-jsonschema-form), or *rjsf*, as a means of describing how a form page should be rendered from a `schema`. To generate a form, react-jsonschema-form steps through the schema depth and renders different React components based on the type of data each property in the schema represents. In the US Forms System library, `uiSchema` follows the format described in the [react-jsonschema-form documentation](https://github.com/mozilla-services/react-jsonschema-form#the-uischema-object), with some custom us-forms-system additions. The `schema` and `uiSchema` objects should have a similar structure, with the same fields organized in the same way with these exceptions:

- `uiSchema` doesn't need to contain all the fields found in the `schema` object.
- `uiSchema` doesn't need a `properties` object for sub-fields.

For example, given this schema:

```js
{
  type: 'object',
  properties: {
    field1: {
      type: 'string'
    }
  }
}
```

The matching `uiSchema` would be:

```js
{
  'ui:title': 'My form',
  field1: {
    'ui:title': 'My field'
  }
}
```

For array fields, you must specify an `items` object that contains the fields for each row in the array in the `uiSchema` object:

```js
{
  'ui:title': 'My form',
  toursOfDuty: {
    items: {
      branchName: {
        'ui:title': 'Branch'
      }
    }
  }
}
```

##### Configuring `uiSchema` using rjsf options

If you're not already familiar with the rjsf uiSchema options, see the [library docs](https://github.com/mozilla-services/react-jsonschema-form#the-uischema-object). Some commonly used options include:

- [ui:order](https://github.com/mozilla-services/react-jsonschema-form#object-fields-ordering): An array of field names in the order in which they should appear.
- [ui:widget](https://github.com/mozilla-services/react-jsonschema-form#alternative-widgets): The name of an alternative widget to use for the field, for example, a custom widget called `yesNo`.
- [ui:field](https://github.com/mozilla-services/react-jsonschema-form#custom-field-components): The name of a custom field.
- [classNames](https://github.com/mozilla-services/react-jsonschema-form#custom-css-class-names): The class names to put on the component.

##### Configuring `uiSchema` using US Form System options

The us-forms-system code includes additional `uiSchema` functionality not found in the rjsf library.

```js
{
  // Used instead of the `title` property in the JSON Schema.
  'ui:title': '',
  // It can also be a component, which passes the current form data as a property.
  'ui:title': ({ formData }) => <legend>{`A ${formData.thing} title`}</legend>,

  // Used instead of the `description` property in the JSON Schema. This can be a string
  // or a React component, and is normally used on object fields in the schema to provide
  // description text or HTML before a block of fields.
  'ui:description': '' || DescriptionComponent,

  // Customizes the field or widget you're using.
  'ui:field': '' || FieldComponent,
  'ui:widget': '' || WidgetComponent,

  // Renders string fields on the review page. Always used when you specify a custom widget
  // component. Can also be used with regular widgets.
  'ui:reviewWidget': WidgetComponent,

  // Provides a function to make a field conditionally required. The data in the whole form,
  // with no page breaks, is the only parameter. Don't make a field required in the JSON
  // schema and in addition to using `ui:required` on that field. The index argument is
  // provided if you use `ui:required` on data inside an array.
  'ui:required': function (formData, index) {
    return true || false;
  },

  // An array of validation functions or objects that you can use to add validation that's
  // not possible through JSON Schema. See below for the properties passed to the validation
  // functions and how to use them.
  'ui:validations': [
    /**
     * Note the difference between the three data parameters:
     *
     * @param {any} fieldData The data for the current field being validated
     * @param {object} formData The data for all the fields in every page
     */
    function (errors, fieldData, formData, fieldSchema, errorMessages) {
      errors.addError('My error');
    },
    {
      validator: (errors, fieldData, formData, fieldSchema, errorMessages, options) => {
        errors.addError('My other error');
      },
      options: {}
    }
  ],

  // An object with field-specific error messages. Structured by error name (from JSON Schema
  // error types). This is passed to custom validations in `ui:validations` in order to allow
  // configurable error messages in a validator.
  'ui:errorMessages': {
    'pattern': 'Please provide a value in the right format'
  },
  'ui:options': {

    // An map of enum values to labels that are shown by the select and radio widgets.
    labels: {
      chapter30: 'A readable description (Chapter 30)'
    },

    // A map of values to a component, text, or JSX
    // (https://reactjs.org/docs/introducing-jsx.html). If your field is a radio widget, the
    // content here is shown underneath the radio button for that value when it's selected.
    nestedContent: {
      'value': <p>Some text</p>
    },

    // A string of class names that are added to the widget for the current field.
    // `widgetClassNames` is similar to the default `classNames` property, but it puts the
    // class names on the input/select/etc element itself, rather than a surrounding `div`.
    widgetClassNames: '',

    // For array fields, this component is shown when the item in the array is rendered as
    // read-only on a page that is not a review page.
    viewField: RowViewComponent,

    // To show a field only when another field is true, set this option to the property name.
    // It wraps the fields with an ExpandingGroup component using the `expandUnder` field as
    // the first question.
    expandUnder: '',

    // To match to a specific value, use the `expandUnderCondition` option to specify the
    // value that the `expandUnder` field's data should equal.
    expandUnderCondition: 'someValue',
    // `expandUnderCondition` can also be a function that receives the data from the
    // `expandUnder` field as an argument.
    expandUnderCondition: (field) => field === 'someValue' || field === 'someOtherValue',

    // When using the expandUnder option, you can set `expandUnderClassNames` on the field
    // specified by `expandUnder` and it will add classes to the `div` that wraps all of the
    // fields when they're expanded. See cookbook for an example use case.
    expandUnderClassNames: '',

    // Hides the specified field on the review page.
    hideOnReview: true || false,

    // Hides the specified field on the review page when the field value is `false`.
    hideOnReviewIfFalse: true || false

    // A function that conditionally hides fields in the form. `hideIf` provides the `index`
    // argument when you use `ui:required` on data inside an array.
    hideIf: function (formData, index) {
      return true || false;
    }

    // A function that conditionally replaces the current field's schema. `updateSchema`
    // provides the `index` argument when you use `ui:required` on data inside an array.
    updateSchema: function (formData, schema, uiSchema, index, pathToCurrentData) {
      // This function returns an object with the properties you want to update. Instead of
      // replacing the existing schema, it updates the individual properties.
      return {
        type: 'string'
      };
    },

    // By default, array fields that are displayed on a single page in a form, such as
    // information for multiple dependents, are displayed as separate pages or sections on
    // the review page. To keep the information in a single section on a review page, set
    // this property.
    keepInPageOnReview: true
  }
}
```

[Back to *Building a Form*](README.md)
