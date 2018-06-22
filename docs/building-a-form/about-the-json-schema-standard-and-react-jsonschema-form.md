# About the JSON Schema standard and react-jsonschema-form

Learn about the form building code, or *schemaform*, and the library it's built on. For more information about the JSON Schema Standard, see [Understanding JSON Schema](https://spacetelescope.github.io/understanding-json-schema/).

### In this guide

- Understanding JSON Schema
- Understanding react-jsonschema-form

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

Object fields can be described. This example describes a JSON document that is an object with one property called `myField`, which is a number, meaning `{ myField: 2 }` would be valid:

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

At the top level, rjsf uses a `Form` component to take the schema inputs and render a hierarchy of components for each field rendered on the form. For example, this schema:

```
{
  type: 'string'
}
```

... renders as

```
<SchemaField>
  <StringField>
    <FieldTemplate>
      <TextWidget/>
    </FieldTemplate>
  </StringField>
</SchemaField>
```

rjsf uses two important concepts: *fields* and *widgets*:

- Fields generally match the `type` attribute in a schema. There are object fields, array fields, number fields, boolean fields, and string fields. Except for arrays and objects, the fields render a label (via `FieldTemplate`) and a widget.
- A widget is the html input element that accepts data from the user. The schemaform uses `text`, `email`, `checkbox`, `radio`, `select`, and `textarea`. While there are many widgets provided by rjsf, the defaults are overwritten with these versions.

In the hierarchy above, the two `Field` components determine which fields and widgets to render. `SchemaField` uses the two schemas the library accepts, `schema` and `uiSchema`, to determine what other `Field` component to render. The example chose `StringField` because the schema type was `string`. The `StringField` component then rendered `TextWidget`, based on `schema` and `uiSchema`, because the only information provided was that the field is a string (the default widget type).

Here's another example:

```
{
  type: 'string',
  enum: ['first', 'second', 'third']
}
```

The hierarchy for this field looks the same as above, except it uses `SelectWidget` instead of `TextWidget`, because `StringField` saw that the schema had an `enum` property:

```
<SchemaField>
  <StringField>
    <FieldTemplate>
      <SelectWidget/>
    </FieldTemplate>
  </StringField>
</SchemaField>
```

[Back to *Building a Form*](building-a-form/README.md)
