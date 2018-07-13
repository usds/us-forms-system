# Creating a form config file

Your form is generated from a JSON Schema configuration file called `form.js`, along with a few other key configuration files. For information about the basic files you need to configure a form, see "Create required files" in the *US Forms System Getting Started Guide*.

### In this guide

- [Building a simple form](#building a simple form)
- [Example `form.js` file](#example-form.js-file)
- [About the `schema` and `uiSchema` objects](#about-the-schema-and-uischema-objects)
- [Configuring `uiSchema` using rjsf options](#configuring-uischema-using-rjsf-options)
- [Configuring `uiSchema` using US Form System options](#configuring-uischema-using-us-form-system-options)

### Building a simple form

To build a form, you'll use the configuration file to specify everything your form needs: questions, how questions are grouped together, content on the page, data validation, etc. In [the starter app](https://github.com/usds/us-forms-system-starter-app), the file that exports this configuration object is located at `/src/js/config/form.js` and defines a `formConfig`.

Most of the time you'll just be working within the config file to describe the form you need and you won't be writing React components. However, there are two cases that require working with React components directly:
1. **Rendering the top-level React component**: US Forms System uses a top-level React component, `FormApp`, to pass the `formConfig` object to the other components that are rendered. For the React component hierarchy to properly render, you must include `FormApp` in _your_ app's top-level component and pass it the `formConfig` object as a prop. If you're using the [starter app](https://github.com/usds/us-forms-system-starter-app), it already [takes care of this](https://github.com/usds/us-forms-system-starter-app/blob/master/js/components/Form.jsx).
2. **Creating custom components**: There may be times where you'll want to create your own custom React components to include in the form config. Examples may include creating a custom page you want to render (e.g., an introduction page), creating a component for content (e.g., a warning message) you want to render within a page, or creating a new component to override one of our default ones. In these cases you'll be building React components from scratch.

The `formConfig` has several sections, that include, for example:
* A `title` of the form;
* A set of `chapters` and `pages` that group form fields for display on the screen;
* A `uiSchema` with instructions about the way form elements should be displayed and labelled;
* A `schema` with information about the data resulting from the elements once they have been filled;
* Optional `introduction` and `confirmation` pages that can appear before and after the form.

The remainder of this page has much more detail about these and other options.

Here is a simple form that requests a name, phone number, and email address:

```js
import Introduction from '../components/Introduction.jsx';

const formConfig = {
  title: "Simple form",
  introduction: Introduction,
  chapters: {
    onlyChapter: {
      title: "Contact Information",
      pages: {
        onlyPage: {
          path: "contact-info",
          title: "",
          schema: {
            type: "object",
            required: [ "name", "phone", "email" ],
            properties: {
              name: { type: "string" },
              phone: { type: "string" },
              email: { type: "string" }
            }
          },
          uiSchema: {
            name: { "ui:title": "Name" },
            phone: { "ui:title": "Phone" },
            email: { "ui:title": "Email" }
          }
        }
      }
    }
  }
};
```

There are several enhancements that can (and should!) be made to this form. For example, there is no validation or formatting of the data, although the `required` property of the `schema` at least ensures that fields are not totally empty. However, it does demonstrate the basics.

### Example `form.js` file

This example `form.js` file will get you started with building your form.

```js
{
  // Prefix string to add to the path for each page.
  urlPrefix: '',

  // For debugging, print the form data to the JavaScript console so you can check for errors it before it's submitted.
  consoleSubmit: true;

  // The introduction page component. To exclude an introduction page, remove this component.
  introduction: IntroductionComponent,

  // The confirmation page component that will render after the user successfully submits the form.
  confirmation: ConfirmationComponent,

  // The prefix for Google Analytics events that are sent for different form actions.
  trackingPrefix: '',

  // The title of the form, rendered on all pages.
  title: '',

  // The subtitle of the form, usually the form number. The subtitle is rendered on all pages when there's also a title.
  subTitle: '',

  // Schema definitions that can be referenced on any page. These are added to each page's schema in the reducer code, so that you don't have to put all of the common fields in the definitions property in each page schema. For more information on definitions, see schema.definitions below.
  defaultDefinitions: {},

  // When a user begins completing a pre-filled form, this function is called after data migrations are run for pre-filled data in order to make necessary updates to the data or form schema ahead of time.
  prefillTransformer: (pages, formData, metadata ) => { pages, formData, metadata }

  // The object that contains the configuration for each chapter. Each property is the key for a chapter.
  chapters: {

    // The title of the chapter.
    title: '',

    // The object that contains the pages in each chapter. Each property is the key for a page, and should be unique across chapters.
    pages: {

      // The URL for the page.
      path: 'some-path',

      // The title of the page that renders on the review page.
      title: '',
      // This can also be a function that receives the current data as a parameter.
      title: formData => `A title for ${formData.thing}`,

      // Any initial data that should be set for the form.
      initialData: {
        field1: 'Default string'
      },

      // Specifies that a page will turn its schema into a page for each item in an array, such as an array of children with a page
      // for each child. The schema/uiSchema for this type of page should be built as usual for an array field.
      showPagePerItem: true,
      // The path to the array.
      arrayPath: 'children',
      // Items in the array that should not have a page.
      itemFilter: () => true,
      // You must specify a path with an :index parameter.
      path: 'some-path/:index',

      // The JSON schema object for the page, following the JSON Schema format.
      schema: {
        type: 'object',
        // A schema's properties refer to definitions. For example:
        //   "homePhone": { "$ref": "#/definitions/phone" }
        // In the configuration file, the definition for `phone` must be added into definitions in order to be parsed correctly and added to `homePhone`.
        definitions: {},
        properties: {
          field1: {
            type: 'string'
          },
          // Fields of type `string`, `boolean`, `number`, and `array` that begin with `view:` are excluded from data that's sent to
          // the server. Instead, their children are merged into the parent object and sent to the server. Use these to exclude fields
          // from being sent to the server, such as a question that's only used to reveal other questions, or to group related
          // questions together to be conditionally revealed that aren't in an object in the schema.
          'view:field2': {
            type: 'string'
          },
          'view:artificialGroup'{
            type: 'object',
            properties: {
              // `view:artificialGroup` is flattened. `subField1` and `subField2` are siblings of `field1` when sent to the API.
              subField1: {
                type: 'string'
              },
              subField2: {
                type: 'boolean'
              }
            }
          }
        }
      },

      // See "About the `schema` and `uiSchema` objects" below.
      uiSchema: {
        'ui:title': 'My form',
        field1: {
          'ui:title': 'My field'
        }
      }
    }
  }
}
```

### About the `schema` and `uiSchema` objects

`uiSchema` is the object that provides information about how the page should be rendered. This object follows the format described in the [react-jsonschema-form documentation](https://github.com/mozilla-services/react-jsonschema-form#the-uischema-object), with some custom us-forms-system additions. The `schema` and `uiSchema` objects should have a similar structure, with the same fields organized in the same way with these exceptions:

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

### Configuring `uiSchema` using rjsf options

If you're not already familiar with the rjsf uiSchema options, see the [library docs](https://github.com/mozilla-services/react-jsonschema-form#the-uischema-object). Some commonly used options include:

- [ui:order](https://github.com/mozilla-services/react-jsonschema-form#object-fields-ordering): An array of field names in the order in which they should appear.
- [ui:widget](https://github.com/mozilla-services/react-jsonschema-form#alternative-widgets): The name of an alternative widget to use for the field, for example, a custom widget called `yesNo`.
- [ui:field](https://github.com/mozilla-services/react-jsonschema-form#custom-field-components): The name of a custom field.
- [classNames](https://github.com/mozilla-services/react-jsonschema-form#custom-css-class-names): The class names to put on the component.

### Configuring `uiSchema` using US Form System options

The us-forms-system code includes additional `uiSchema` functionality not found in the rjsf library.

```js
{
  // Used instead of the `title` property in the JSON Schema.
  'ui:title': '',
  // It can also be a component, which passes the current form data as a property.
  'ui:title': ({ formData }) => <legend>{`A ${formData.thing} title`}</legend>,

  // Used instead of the `description` property in the JSON Schema. This can be a string or a React component, and is normally used on
  // object fields in the schema to provide description text or HTML before a block of fields.
  'ui:description': '' || DescriptionComponent,

  // Customizes the field or widget you're using.
  'ui:field': '' || FieldComponent,
  'ui:widget': '' || WidgetComponent,

  // Renders string fields on the review page. Always used when you specify a custom widget component. Can also be used with regular widgets.
  'ui:reviewWidget': WidgetComponent,

  // Provides a function to make a field conditionally required. The data in the whole form, with no page breaks, is the only
  // parameter. Don't make a field required in the JSON schema and in addition to using `ui:required` on that field. The index
  // argument is provided if you use `ui:required` on data inside an array.
  'ui:required': function (formData, index) {
    return true || false;
  },

  // An array of validation functions or objects that you can use to add validation that's not possible through JSON Schema. See below
  // for the properties passed to the validation functions and how to use them.
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

  // An object with field-specific error messages. Structured by error name (from JSON Schema error types). This is passed to custom
  // validations in `ui:validations` in order to allow configurable error messages in a validator.
  'ui:errorMessages': {
    'pattern': 'Please provide a value in the right format'
  },
  'ui:options': {

    // An map of enum values to labels that are shown by the select and radio widgets.
    labels: {
      chapter30: 'A readable description (Chapter 30)'
    },

    // A map of values to a component, text, or JSX (https://reactjs.org/docs/introducing-jsx.html). If your field is a radio widget,
    // the content here is shown underneath the radio button for that value when it's selected.
    nestedContent: {
      'value': <p>Some text</p>
    },

    // A string of class names that are added to the widget for the current field. `widgetClassNames` is similar to the default
    // `classNames` property, but it puts the class names on the input/select/etc element itself, rather than a surrounding `div`.
    widgetClassNames: '',

    // For array fields, this component is shown when the item in the array is rendered as read-only on a page that is not a review page.
    viewField: RowViewComponent,

    // To show a field only when another field is true, set this option to the property name. It wraps the fields with an
    // ExpandingGroup component using the `expandUnder` field as the first question.
    expandUnder: '',

    // To match to a specific value, use the `expandUnderCondition` option to specify the value that the `expandUnder` field's data should equal.
    expandUnderCondition: 'someValue',
    // `expandUnderCondition` can also be a function that receives the data from the `expandUnder` field as an argument.
    expandUnderCondition: (field) => field === 'someValue' || field === 'someOtherValue',

    // When using the expandUnder option, you can set `expandUnderClassNames` on the field specified by `expandUnder` and it will add
    // classes to the `div` that wraps all of the fields when they're expanded. See cookbook for an example use case.
    expandUnderClassNames: '',

    // Hides the specified field on the review page.
    hideOnReview: true || false,

    // Hides the specified field on the review page when the field value is `false`.
    hideOnReviewIfFalse: true || false

    // A function that conditionally hides fields in the form. `hideIf` provides the `index` argument when you use `ui:required` on data inside an array.
    hideIf: function (formData, index) {
      return true || false;
    }

    // A function that conditionally replaces the current field's schema. `updateSchema` provides the `index` argument when you use `ui:required` on data inside an array.
    updateSchema: function (formData, schema, uiSchema, index, pathToCurrentData) {
      // This function returns an object with the properties you want to update. Instead of replacing the existing schema, it updates the individual properties.
      return {
        type: 'string'
      };
    },

    // Use this when you have an array field that should not be pulled out of the page its in and shown separately on the review page.
    keepInPageOnReview: true
  }
}
```

[Back to *Building a Form*](README.md)
