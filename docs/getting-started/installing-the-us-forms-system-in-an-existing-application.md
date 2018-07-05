# Installing the US Forms System in an existing application

If you're using an existing React application, you can install the US Forms System in that app.

Before you begin, review "[Tools for getting started with the US Forms System](getting-started/tools-for-getting-started-with-the-us-forms-system)."

### In this guide

- [Install the library and dependencies](#install-the-library-and-dependencies)
- [Create required files](#create-required-files)

### Install the library and dependencies

1. Install the library:
```bash
npm install --save https://github.com/usds/us-forms-system.git
```

2. Install the US Web Design System and React dependencies:
```bash
npm install --save-dev uswds@^1.6.3
npm install --save-dev react@^15.5.4
npm install --save-dev react-dom@^15.6.2
```

### Create required files

To enable your form, create the following files. For an example of these files, see the [us-forms-system-starter-app repository](https://github.com/usds/us-forms-system-starter-app).

- A [form config file](https://github.com/usds/us-forms-system-starter-app/blob/master/js/config/form.js). For more information, see "Creating a form config file."
- An entry [app.js](https://github.com/usds/us-forms-system-starter-app/blob/master/app.js) file.
- A [React component](https://github.com/usds/us-forms-system-starter-app/blob/master/js/components/Form.jsx) to render the top-level us-forms-system component.
- A [routes file](https://github.com/usds/us-forms-system-starter-app/blob/master/js/routes.jsx) that loads `createRoutes` from us-forms-system. This automatically creates the routes from the form config file.
- A [reducers file](https://github.com/usds/us-forms-system-starter-app/blob/master/js/reducers.js) that loads `createSchemaFormReducer` from us-forms-system. This creates the app's reducer functions.

[Back to *Getting Started with the US Forms System*](README.md)
