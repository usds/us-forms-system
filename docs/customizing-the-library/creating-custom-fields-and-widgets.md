:book: [*US Forms System Documentation*](../../README.md) :arrow_right: [*Customizing the library*](README.md)

# Creating custom fields and widgets

You can customize the base library to satisfy the unique requirements of your particular form.

### In this guide

- [How the us-forms-system uses rjsf](#how-us-forms-system-uses-rjsf)
  - [Customizing fields and widgets from rjsf](customizing-fields-and-widgets-from-rjsf)
  - [Supporting multi-page forms](#supporting-multi-page-forms)

### How us-forms-system uses rjsf

The us-forms-system code uses react-jsonschema-form, or rjsf, to render form fields, but it builds a scaffolding on top of it to support multi-page forms and common form patterns. Additionally, us-forms-system uses rjsf to create a form configuration spec that allows developers to specify the structure of a multi-page form.

##### Customizing fields, widgets, and events from rjsf

rjsf passes all field and widget components to `SchemaField` (and most other components) as a `registry` property. To override fields and widgets in the registry, pass components of the same name into the library's main `Form` component. The us-forms-system uses custom versions of these components:

- `ObjectField`
- `ArrayField`
- `FieldTemplate`
- [`TextWidget`](available-widgets.md#textwidget)
- [`SelectWidget`](available-widgets.md#selectwidget)
- [`EmailWidget`](available-widgets.md#emailwidget)
- [`CheckboxWidget`](available-widgets.md#checkboxwidget)
- [`RadioWidget`](available-widgets.md#radiowidget)
- `TextareaWidget`

The us-forms-system uses these custom fields and widgets:

- [`YesNoWidget`](available-widgets.md#yesnowidget)
- [`DateWidget`](available-widgets.md#datewidget)
- [`SSNWidget`](available-widgets.md#ssnwidget)
- [`PhoneNumberWidget`](available-widgets.md#phonenumberwidget)

Writing custom widgets is similar to writing React components: A value is passed in, and an `onChange` hook is provided for changing data. Other properties like the schemas and field ID are also provided.

Custom fields receive all properties listed previously for field components in rjsf.

In addition to customizing fields and widgets, the us-forms-system code hooks into a number of events provided by `Form` to support our form patterns, found in the `FormPage` component. These events are:

- `validate`: This event is called when validation occurs. We call our custom validation, which reads uiSchema for custom validation hooks that have been included for form fields outside of what JSON Schema provides.
- `transformErrors`: This event is provided when the us-forms-system receives the list of JSON Schema validation errors and can return a transformed list. It replaces the messages with a set of default messages, as well as any messages provided for specific fields in uiSchema. It also moves the errors for required fields from the object level to the field level. Because JSON Schema specifies required fields with a `required` array on an object field schema, any errors about missing data are associated with that object and moved so they're associated with the missing field and rendered with that field on the form.
- `onError`: This event is called if a user tries to submit a form with a validation error. The us-forms-system sets a `submitted` flag in `formContext`, which is an object passed to all fields and components in the rjsf form. The `FieldTemplate` component uses `formContext` to display all error messages to the user.
- `onSubmit`: This event is called when a user submits a form with no validation errors. When this happens, the us-forms-system code looks for the next page in the multi-page form and navigates to it.
- `onChange`: This event is called when a user changes data in the form. The us-forms-system fires a Redux action and updates the store with the new data. The reducer code does several recalculations:
    - **Recalculate the required fields for the schema:** You can specify functions in uiSchema that set fields as optional or required based on form data. This runs them and updates the schema.
    - **Recalculate which schema fields are hidden and remove that data:** In uiSchema, you can specify fields that are conditionally hidden based on user data. To avoid validation errors from data a user can't see, the us-forms-system updates the schema to add a `ui:hidden` property and remove any user data for those fields.
    - **Recalcuate general schema updates:** Because you can make arbitrary changes to the schema based on form data, the us-forms-system must also make those changes, for example, removing options in an `enum` array when a user has entered certain data.

##### Supporting multi-page forms

Large forms are organized into *chapters* and *pages*. A chapter is a collection of pages, each rendered as a single rjsf form with a schema and `uiSchema` field component. The chapter and page organization is described in a form config file that the us-forms-system uses to generate a list of routes. A user can move through the list of pages until they reach the review page.

The review page also takes the config file and renders each chapter in an accordion panel. Inside a panel, the us-forms-system uses rjsf to render each page in a read-only view. This view uses simplified widgets and a different `FieldTemplate` component to render each form field in a definition list. The read-only view uses the rjsf `Form` component with no input elements, rendering instead with text. When a user on the review page clicks Edit for a form page, the normal widgets are used and a normal form is rendered.

Each array item on a review page is rendered as read-only, and individual items can be edited independently. To accomplish this, the review `ArrayField` component renders each item in the array as it's own rjsf `Form`. In addition, array fields are taken from the page's read-only view and rendered separately.

[Back to *Customizing the library*](README.md)
