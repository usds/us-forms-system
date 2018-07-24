# Building a form

### [About the `schema` and `uiSchema` objects](about-the-schema-and-uischema-objects.md)

The US Forms System lets you build web-based forms using the JSON Schema standard for form data and React for the form UI. The form data and UI are represented by `schema` and `uiSchema` objects, respectively, which are included in the form configuration file.

### [Quick Start: Example `form.js` file](quick-start-example-formjs-file.md)

Use this example `form.js` file to build a basic form.

### [Creating a form config file](creating-a-form-config-file.md)

Your form is generated from a `form.js` file, along with a few other key configuration files.

### [Available form features and usage guidelines](available-form-features-and-usage-guidelines.md)

These form features are available in the US Forms System library. We've provided information about how to implement them in your form.

### [Available widgets](available-widgets.md)

Widgets are React components that return specific HTML form elements. Set these widgets in a config file while building your form.

### [Common definitions](common-definitions.md)

Definitions are pieces of the form config that can be dropped in to represent specific types of questions. Most often used in `uiSchema`, definitions include features such as label text, validation functions, error messages, and rules for which widget to render.

### [Common patterns for building forms](common-patterns-for-building-forms.md)

Some forms require custom validation, styles, or conditional information based on user input. Use these patterns to address those needs.

[Back to *US Forms System Documentation*](docs/README.md)
