# About the JSON schema standard and react-jsonschema-form

This walkthrough is going to detail how our form building code (called schemaform from here on) and the library it's built on work. This guide assumes you're comfortable with React and building forms.

## JSON Schema

The JSON Schema standard is used to describe the allowed shape of JSON objects. Schemas have a type, which tells you what kind of data is allowed:

```
{
  type: 'string'
}
```

They can also have validation information, like regexes or length requirements:

```
{
  type: 'string',
  pattern: '^[ef]*$',
  minLength: 2
}
```

The above allows any string that's at least two characters and only contains `e` and `f`. So `eff` is valid, but `fcc` is not. You can also specify some built in `format` values for strings, like `email`, as a shortcut for including your own patterns.

Objects fields can be described:

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

This describes a json document that's an object with one property called `myField`, which is a number. So, `{ myField: 2 }` would be valid.

However, `{}` is also valid. If you want to required a property in an object, you use the `required` property:

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

Note that `required` is on the object that contains the field, not the field itself.

Arrays work similarly to objects:

```
{
  type: 'array',
  items: {
    type: 'boolean'
  }
}
```

This describes an array of boolean values: `[true, false, true]`. Items can be an object schema or any other type of schema as well.

You can nest schemas as far down as you'd like. There are some other features, like metadata, sharing schema definitions between fields, and more complicated validation. But the above should get you most of the way there. There are many libraries that implement the JSON Schema spec and allow you to validate that an object matches a given schema. For reference, we use [ajv](https://www.npmjs.com/package/ajv) and [jsonschema](https://www.npmjs.com/package/jsonschema), the former in unit tests, and the latter in the schemaform code. ajv may go away eventually, since one of our dependencies is already using jsonschema.

For additional examples of JSON Schema projects, see the [JSON Schema site example list](http://json-schema.org/examples.html).

[Back to *Building a Form*](building-a-form/README.md)
