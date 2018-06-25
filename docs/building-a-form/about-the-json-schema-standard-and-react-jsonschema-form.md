# About the JSON Schema standard and react-jsonschema-form

Learn about the form building code, or *schemaform*, and the library it's built on. For more information about the JSON Schema Standard, see [Understanding JSON Schema](https://spacetelescope.github.io/understanding-json-schema/).

### In this guide

- Understanding JSON Schema
  - Describing object fields and arrays
- Understanding react-jsonschema-form
  - About the `Form` component
  - Field components
- How schemaform uses rjsf
  - Customizing fields and widgets from rjsf
  - Creating multi-page forms

### Understanding JSON Schema

The JSON Schema standard describes the allowed shape of JSON objects. You can nest schemas as far down as you'd like. Schemas have a type, which tells you what kind of data is allowed:

```
{
  type: 'string'
}
```

The JSON schema can also have validation information, such as regexes or length requirements. This example allows any string that's at least two characters and only contains `e` and `f`, meaning `eff` is valid, but `fcc` is not:

```
{
  type: 'string',
  pattern: '^[ef]*$',
  minLength: 2
}
```

You can also specify some built-in `format` values for strings, such as `email`, as a shortcut for including your own patterns.

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

However, `{}` is also valid. To require a property in an object, use the `required` property. In this example, `required` is on the object that contains the field, not the field itself:

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

Many libraries implement the JSON Schema specification and let you validate that an object matches a given schema. The US Forms System uses [ajv](https://www.npmjs.com/package/ajv) for unit tests and [jsonschema](https://www.npmjs.com/package/jsonschema) in the schemaform code. For more examples of JSON Schema projects, see the [JSON Schema site example list](http://json-schema.org/examples.html).

### Understanding react-jsonschema-form

[react-jsonschema-form](https://github.com/mozilla-services/react-jsonschema-form), or *rjsf*, generates a form from a JSON Schema, in addition to other UI information. To generate a form, react-jsonschema-form steps through the schema depth and renders different React components based on the type of data each property in the schema represents.

##### About the `Form` component

At the top level, rjsf uses a `Form` component to take the schema inputs and render a hierarchy of components for each field rendered on the form:

- *Fields* generally match the `type` attribute in a schema. There are object fields, array fields, number fields, boolean fields, and string fields. Except for arrays and objects, the fields render a label (via `FieldTemplate`) and a widget.
- A *widget* is the html input element that accepts data from the user. The schemaform uses `text`, `email`, `checkbox`, `radio`, `select`, and `textarea`. While there are many widgets provided by rjsf, the defaults are overwritten with these versions.

##### Example schema

```
{
  type: 'string'
}
```

##### Resulting hierarchy

The two `Field` components determine which fields and widgets to render. `SchemaField` uses the two schemas the library accepts, `schema` and `uiSchema`, to determine what other `Field` component to render. The example chose `StringField` because the schema type was `string`. The `StringField` component then rendered `TextWidget`, based on `schema` and `uiSchema`, because the only information provided was that the field is a string (the default widget type).

```
<SchemaField>
  <StringField>
    <FieldTemplate>
      <TextWidget/>
    </FieldTemplate>
  </StringField>
</SchemaField>
```

##### Example schema

```
{
  type: 'string',
  enum: ['first', 'second', 'third']
}
```

##### Resulting hierarchy

The hierarchy for this field uses `SelectWidget` instead of `TextWidget`, because `StringField` detected the `enum` property in the schema.

```
<SchemaField>
  <StringField>
    <FieldTemplate>
      <SelectWidget/>
    </FieldTemplate>
  </StringField>
</SchemaField>
```

To override rules in `uiSchema`, specify a `ui:widget` property set to `text`, `email`, `checkbox`, or your own custom widget. The `ui:field` property can specify a specific or custom field.

For `object` and `array` schema types, a field component does something other than figure out what widgets to render.

##### Example schema: `object`

This is an `object` schema with two string fields.

```
{
  type: 'object',
  properties: {
    field1: {
      type: 'string'
    },
    field2: {
      type: 'string'
    }
  }
}
```
##### Resulting hierarchy

The `ObjectField` component renders a `SchemaField` component for each of its properties. Those properties are both `string` types, so it looks like the first hierarchy, but nested.

```
<SchemaField>
  <ObjectField>
    <SchemaField>
      <StringField>
        <FieldTemplate>
          <TextWidget/>
        </FieldTemplate>
      </StringField>
    </SchemaField>
    <SchemaField>
      <StringField>
        <FieldTemplate>
          <TextWidget/>
        </FieldTemplate>
      </StringField>
    </SchemaField>
  </ObjectField>
</SchemaField>
```

##### Example schema: `ArrayField`

`ArrayField` renders a `SchemaField` component for each item in the array. The library only uses the array field where each time is an object type schema.

```
{
  type: 'array',
  items: {
    type: 'object',
    properties: {
      field1: {
        type: 'string'
      },
      field2: {
        type: 'string'
      }
    }
  }
}
```

##### Field components

These field components pass a collection of props down through each component. Most are passed to widget components.

- `name`: The property name of the current field. For example, the object schema above would be named `field1`.
- `required`: If the field is required or not (i.e. the property name is in the schema's `required` array).
- `schema`: The schema for the specific field.
- `uiSchema`: The ui schema for this field. See "[About the `uiSchema` field component](#about-the-uischema-field-component)."
- `errorSchema`: An object that contains the list of errors for the current field and any child properties, if the field is an array or object.
- `idSchema`: An object that contains the field IDs for the current field and any child properties. The library generates IDs for each field by joining each property name with an underscore.
- `formData`: The actual data entered for the field so far.
- `onChange`: The function that's called when data changes. See "[About the `onChange` field component](#about-the-onchange-field-component)."
- `onBlur`: The function that's called when focus is lost on a widget.

##### About the `onChange` field component

When a user enters data, each widget calls `onChange`. Each component in the hierarchy passes an `onChange` handler to child fields. When child data changes, the component combines it with the rest of the data and calls the `onChange` prop passed to it from its parent.

```
{
  type: 'object',
  properties: {
    field1: {
      type: 'string'
    }
  }
}
```

In this example:

1. The user types 'a'.
2. The `TextWidget` for field1 calls `onChange` with 'a'.
3. The `onChange` property came from the parent `ObjectField` component, which puts 'a' in an object as `field1` (`{ field1: 'a' }`), then calls the `onChange` prop it was passed.
4. When it reaches the top-level `Form` component, rjsf runs the JSON Schema validation and passes the results through the component hierarchy.

Similar to Redux, all state is kept in the `Form` component, or the root of the form. All data processing and validation happens in `Form`, or is triggered by hooks provided by `Form`. The schemaform code built on top of this processes the schemas and form data in Redux, triggered by events provided by `Form`.

##### About the `uiSchema` field component

Along with the regular JSON Schema, a UI schema for UI-specific options that don't fit within the JSON Schema standard is also optionally defined for each field. The `uiSchema` field component is primarily used for specifying custom fields and widgets for specific fields in the schema using `ui:field` and `ui:widget`. In the schemaform, it's also used for label names, custom validation, and conditionally required fields.

### How schemaform uses rjsf

The schemaform code uses rjsf to render form fields, but it builds a scaffolding on top of it to support multi-page forms and our common form patterns. The second part is creating a form configuration spec that allows devs to specify the structure of one of our multi-page forms.

##### Customizing fields, widgets, and events from rjsf

rjsf passes all field and widget components to `SchemaField` (and most other components) as a `registry` property. To override fields and widgets in the registry, pass components of the same name into the library's main `Form` component. The schemaform uses custom versions of these components:

- `ObjectField`
- `ArrayField`
- `FieldTemplate`
- `TextWidget`
- `SelectWidget`
- `EmailWidget`
- `CheckboxWidget`
- `RadioWidget`
- `TextareaWidget`

The schemaform uses these custom fields and widgets:

- `YesNoWidget`
- `AddressField`
- `DateWidget`
- `SSNWidget`
- `PhoneWidget`

Writing custom widgets is similar to writing React components: A value is passed in, and an `onChange` hook is provided for changing data. Other properties like the schemas and field ID are also provided.

Custom fields receive all properties listed previously for field components in rjsf.

In addition to customizing fields and widgets, the schemaform code hooks into a number of events provided by `Form` to support our form patterns, found in the `FormPage` component. These events are:

- `validate`: This event is called when validation occurs. We call our custom validation, which reads uiSchema for custom validation hooks that have been included for form fields outside of what JSON Schema provides.
- `transformErrors`: This event is provided when the schemaform receives the list of JSON Schema validation errors and can return a transformed list. It replaces the messages with a set of default messages, as well as any messages provided for specific fields in uiSchema. It also moves the errors for required fields from the object level to the field level. Because JSON Schema specifies required fields with a `required` array on an object field schema, any errors about missing data are associated with that object and moved so they're associated with the missing field and rendered with that field on the form.
- `onError`: This event is called if a user tries to submit a form with a validation error. The schemaform sets a `submitted` flag in `formContext`, which is an object passed to all fields and components in the rjsf form. The `FieldTemplate` component uses `formContext` to display all error messages to the user.
- `onSubmit`: This event is called when a user submits a form with no validation errors. When this happens, the schemaform code looks for the next page in the multi-page form and navigates to it.
- `onChange`: This event is called when a user changes data in the form. The schemaform fires a Redux action and updates the store with the new data. The reducer code does several recalculations:
    - **Recalculate the required fields for the schema:** You can specify functions in uiSchema that set fields as optional or required based on form data. This runs them and updates the schema.
    - **Recalculate which schema fields are hidden and remove that data:** In uiSchema, you can specify fields that are conditionally hidden based on user data. To avoid validation errors from data a user can't see, the schemaform updates the schema to add a `ui:hidden` property and remove any user data for those fields.
    - **Recalcuate general schema updates:** Because you can make arbitrary changes to the schema based on form data, the schemaform must also make those changes, for example, removing options in an `enum` array when a user has entered certain data.

##### Creating multi-page forms

Large forms are organized into *chapters* and *pages*. A chapter is a collection of pages, each rendered as a single rjsf form with a schema and `uiSchema` field component. The chapter and page organization is described in a form config file that the schemaform uses to generate a list of routes. A user can move through the list of pages until they reach the review page.

The review page also takes the config file and renders each chapter in an accordion panel. Inside a panel, the schemaform uses rjsf to render each page with two sets of widgets, enabling a read-only view. This view uses simplified widgets and a different `FieldTemplate` component to render each form field in a definition list. The read-only view uses the rjsf `Form` component with no input elements, rendering instead with text. When a user on the review page clicks Edit for a form page, the normal widgets are used and a normal form is rendered.

Each array item on a review page is rendered as read-only, and individual items can be edited independently. To accomplish this, the review `ArrayField` component renders each item in the array as it's own rjsf `Form`. In addition, array fields are taken from the page's read-only view and rendered separately.

[Back to *Building a Form*](building-a-form/README.md)
