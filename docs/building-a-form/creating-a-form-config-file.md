# Creating a form config file

Your form is generated from a JSON Schema configuration file called `form.js`, along with a few other key configuration files.

- For information about the basic files you need to configure a form, see "[Create required files](../getting-started/installing-the-us-forms-system-in-an-existing-application.md#create-required-files)."
- For an example `form.js` file, see "[Quick Start: Example `form.js` file](quick-start-example-formjs-file.md)"

### In this guide

- [Elements of the form config](#elements-of-the-form-config)
- [How React components are rendered](#how-react-components-are-rendered)
  - [When you need to create React components](#when-you-need-to-create-react-components)
  - [How components receive their props](#how-components-receive-their-props)
  - [Advanced information about the React component hierarchy](#advanced-information-about-the-react-component-hierarchy)

### Elements of the form config

The form config itself is an object with many properties that determine how your form is rendered.

Your form config should contain the following essential elements:
- Top level information about the form (e.g., title, url, whether or not certain features are enabled, etc.)
- If you are building a multi-page form, nested objects for each `chapter` of the form. Within each `chapter`, additional nested objects for each `page` within that `chapter`. For more information, see "[Supporting multi-page forms](../customizing-the-library/creating-custom-fields-and-widgets#supporting-multi-page-forms)."
- Each `page` of the form should contain top level information about the page (e.g, title, url), as well as 2 essential objects:
  - `schema`: the description of the form fields and the type of data each field accepts
  - `uiSchema`: the description of all UI elements of the form fields (e.g., label text, error message text, CSS classes, etc.)

The `schema` and `uiSchema` contain the essential information to build all of the form fields. Read more about the `schema` and `uiSchmea` objects [here](about-the-schema-and-uischema-objects).

Refer [here](quick-start-example-formjs-file.md) to a comprehensive example of what a form config might contain, with descriptions of the main properties you might include.

### How React components are rendered

The form config is used by the US Forms System code to determine which React components to render in order to build your form. This determination is usually done automatically; you are rarely creating React components in using this library.

#### When you need to create React components

There are only 2 times where you may need to interact with React components directly:

1. Each form needs to manually the top level `Form` component. For more information about how to include the `Form` component in your application, read about the [required files needed](../getting-started/installing-the-us-forms-system-in-an-existing-application#create-required-files).
2. There are times you may need to build a custom React component that isn't included in the library by default. Examples of times where custom React components are needed are for the introduction and confirmation pages, [building custom fields and widgets](../customizing-the-library/creating-custom-fields-and-widgets), and for special content that might appear on each a particular form page.

#### How components receive their props

The props that React components need in order to render themselves properly are passed down through the top level `Form` component, which takes the entire form config itself as a prop. The `Form` component is also connected to the store, so it has access to the form data as well.

#### Advanced information about the React component hierarchy

For more advanced information about the React component hierarchy that is rendered for a form, refer [here](../how-the-library-works/the-component-hierarchy).
