:book: [*US Forms System Documentation*](../README.md) :arrow_right: [*Building a Form*](./README.md)

# Creating a form config file

Your form is generated from a JSON Schema configuration file called `form.js`, along with a few other key configuration files.

- For information about the basic files you need to configure a form, see "[Create required files](../getting-started/installing-the-us-forms-system-in-an-existing-application.md#create-required-files)."
- For an example `form.js` file, see "[Quick Start: Example `form.js` file](quick-start-example-formjs-file.md)"

### In this guide

- [Elements of the form config](#elements-of-the-form-config)
- [How React components are rendered](#how-react-components-are-rendered)

### Elements of the form config

The form config itself is an object with many properties that determine how your form is rendered. It must contain these elements:
- Top level information about the form, such as title, URL, and whether or not certain features are enabled
- Nested objects for each `chapter` of the form (if you're building a multi-page form). Within each `chapter`, additional nested objects for each `page` within that `chapter`. For more information, see "[Supporting multi-page forms](./customizing-the-library/creating-custom-fields-and-widgets#supporting-multi-page-forms)."
- Top-level title and URL information about each `page` of the form, as well as 2 essential objects:
  - `schema`: Describes the form fields and the type of data each field accepts
  - `uiSchema`: Describes all UI elements of the form fields, such as label text, error message text, or CSS classes

The `schema` and `uiSchema` contain the essential information to build all of the form fields. For more information, see "[About the `schema` and `uiSchema` objects](about-the-schema-and-uischema-objects)." For a comprehensive example of a form config, with descriptions of the main properties you might include, see "[Quick Start: Example `form.js` file](quick-start-example-formjs-file.md)".

### How React components are rendered

The US Forms System code uses the form config to determine which React components to render in order to build your form, usually automatically. React components require props to render properly. These are passed down through the top-level `Form` component, which takes the entire form config itself as a prop. The `Form` component is also connected to the store, so it has access to the form data as well.

You rarely need to create or interact with React components directly to use this library, except in these cases:

- You must manually add the top level `Form` component for every form. For more information, see "[Create required files](../getting-started/installing-the-us-forms-system-in-an-existing-application#create-required-files)."
- You may need to build a custom React component that isn't included in the library by default, such as for the introduction and review pages, or for special content that might appear on each a particular form page. For more information, see "[Creating custom fields and widgets](../customizing-the-library/creating-custom-fields-and-widgets)."

For more information, see "[About the component hierarchy](../how-the-library-works/about-the-component-hierarchy)."

[Back to *Building a Form*](./README.md)
