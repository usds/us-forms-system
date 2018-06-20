# Installing the library in an existing application

If your existing application has a web server to run the app locally, you can install the US Forms System Library in that app.

### In this guide

- [Install the library and dependencies](#install-the-library-and-dependencies)
- [Create required files](#create-required-files)

### Install the library and dependencies

1. Install the library:
``` command-line
npm install --save https://github.com/usds/us-forms-system.git
```

2. Install peer dependencies:
``` command-line
npm install --save-dev @department-of-veterans-affairs/formation`
npm install --save-dev uswds@^1.6.3
npm install --save-dev react@^15.5.4
npm install --save-dev react-dom@^15.6.2
```

### Create required files

To enable your form, create the following files. For an example of these files, see the [us-forms-system-starter-app repository](https://github.com/usds/us-forms-system-starter-app).

- A [form config file](https://github.com/usds/us-forms-system-starter-app/blob/master/js/config/form.js). For more information, see "Creating a form config file."
- An [entry js](https://github.com/usds/us-forms-system-starter-app/blob/master/app.js) file.
- A [React component](https://github.com/usds/us-forms-system-starter-app/blob/master/js/components/Form.jsx) to render the top-level us-forms-system component.
- A [routes file](https://github.com/usds/us-forms-system-starter-app/blob/master/js/routes.jsx) that loads `createRoutes` from us-forms-system. This automatically creates the routes from the form config file.
- A [reducers file](https://github.com/usds/us-forms-system-starter-app/blob/master/js/reducers.js) that loads `createSchemaFormReducer` from us-forms-system. This creates the app's reducer functions.

[Back to *Getting Started with the Forms System Library*](README.md)
