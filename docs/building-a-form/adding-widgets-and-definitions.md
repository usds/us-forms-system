# Adding widgets and definitions

There are many common fields and widgets you can use to build forms. There are common types of definitions: `schema`/`uiSchema` objects and functions that return `schema`/`uiSchema` objects. For the function versions, there is documentation within the fields for the parameters.

### In this guide

- [Common widgets](#common-widgets)

### Common widgets

These common widgets are included in the schemaform by default that you'll likely set in a config file while building your form. Some widgets are associated with particular schema types or formats. There are additional widgets available, but the schemaform uses definitions they're included in, rather than just the field.

To use a widget, set `ui:widget` for a field to the name of the widget. Widgets are located in `src/js/common/schemaform/widgets`.

Widget       | Default schema type or format
------------ | -------------
`TextWidget` | type: `string`
`SelectWidget` | type: `string` with an enum property
`RadioWidget` |
`CheckboxWidget` | type: `boolean`
`yesNo` |

[Back to *Building a Form*](building-a-form/README.md)
