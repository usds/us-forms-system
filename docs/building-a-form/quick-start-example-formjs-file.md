:book: [*US Forms System Documentation*](../README.md) :arrow_right: [*Building a Form*](./README.md)

# Quick Start: Example `form.js` file

Use this example `form.js` file to build a basic form. For more information about `form.js`, see "[Creating a form config file](creating-a-form-config-file.md)."

```js
const formConfig = {
  // Prefix string to add to the path for each page.
  urlPrefix: '',

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
  prefillTransformer: (pages, formData, metadata ) => { pages, formData, metadata },

  // The object that contains the configuration for each chapter.
  chapters: {
    // Each property is the key for a chapter.
    chapterOne: {
      // The title of the chapter.
      title: '',

      // The object that contains the pages in each chapter.
      pages: {
        // Each property is the key for a page, and should be unique across chapters.
        pageOne: {
            // The URL for the page.
          path: 'some-path',

          // The title of the page that renders on the review page.
          title: '',
          // `title` can also be a function that receives the current data as a parameter:
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
              'view:artificialGroup': {
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
  }
}

export default formConfig
```
[About the `schema` and `uiSchema` objects](./about-the-schema-and-uischema-objects.md)

[Back to *Building a Form*](./README.md)
