:book: [*US Forms System Documentation*](../../README.md) :arrow_right: [*Customizing the library*](README.md)

# About the React component hierarchy

The US Forms System builds a React application of a form, and determines which React components to render based on the description of the form in the form configuration file.

### In this guide

- [About the `Form` component, fields, and widgets](#about-the-form-component-fields-and-widgets)
  - [Example schema: `string` object](#example-schema-string-object)
  - [Example schema: `string` with `enum` property](#example-schema-string-with-enum-property)
  - [Example schema: `object`](#example-schema-object)
  - [Example schema: `ArrayField`](#example-schema-arrayfield)
- [Field component props](#field-component-props)
  - [About the `onChange` field component](#about-the-onchange-field-component)
  - [About the `uiSchema` field component](#about-the-uischema-field-component)

### About the `Form` component, fields, and widgets

At the top level, rjsf uses a `Form` component to take the schema inputs and render a hierarchy of components for each field of the form:

- *Fields* generally match the `type` attribute in a `schema` object. There are object fields, array fields, number fields, boolean fields, and string fields. Except for arrays and objects, the fields render a label (via `FieldTemplate`) and a widget. To specify a particular field, set the `ui:field` property to a specific field.
- A *widget* is the html input element that accepts data from the user. To specify a particular widget, set the  `ui:widget` property to `text`, `email`, `checkbox`, `radio`, `select`, and `textarea`. While there are many widgets provided by rjsf, the defaults are overwritten with these versions.

The `Form` component is the only React component that you need to manually render in your application. All other components are automatically determined based on the form config. For more information, see "[Create required files](../getting-started/installing-the-us-forms-system-in-an-existing-application#create-required-files)."

##### Example schema: `string` object

```
{
  type: 'string'
}
```

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

##### Example schema: `string` with `enum` property

```
{
  type: 'string',
  enum: ['first', 'second', 'third']
}
```

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

While in most cases a field component is responsible for rendering a label and a widget, for `object` and `array` schema types, the field component renders additional field components for each of the elements they contain.

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

`ArrayField` renders a `SchemaField` component for each item in the array. The library only uses the array field where each item is an object type schema.

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

### Field component props

In order for each component to know what to render, field components pass a collection of props down through the component hierarchy. Most are passed to widget components.

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

Similar to Redux, all state is kept in the `Form` component, or the root of the form. All data processing and validation happens in `Form`, or is triggered by hooks provided by `Form`. The us-forms-system code built on top of this processes the schemas and form data in Redux, triggered by events provided by `Form`.

##### About the `uiSchema` field component

Along with the regular JSON Schema, a UI schema for UI-specific options that don't fit within the JSON Schema standard is also optionally defined for each field. The UI schema is passed to the form config file as an object, `uiSchema`, for each field. For more information, see "[Understanding the `uiSchema` object](../building-a-form/about-the-schema-and-uischema-objects.md#understanding-the-uischema-object)."

[Back to *Customizing the library*](README.md)
