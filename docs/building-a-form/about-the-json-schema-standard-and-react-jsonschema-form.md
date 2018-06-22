# About the JSON schema standard and react-jsonschema-form

Learn about the form building code, or *schemaform*, and the library it's built on. For more information about the JSON Schema Standard, see [Understanding JSON Schema](https://spacetelescope.github.io/understanding-json-schema/).

### Understanding JSON schema

The JSON schema standard describes the allowed shape of JSON objects. You can nest schemas as far down as you'd like. Schemas have a type, which tells you what kind of data is allowed:

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

[Back to *Building a Form*](building-a-form/README.md)
