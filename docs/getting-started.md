## Getting started

There are two options for how to start using this library.

### 1: Start a new application

If you are starting a completely new application from scratch, the easiest way to get started is to use our [us-forms-system-starter-app](https://github.com/usds/us-forms-system-starter-app). This sets up the initial files, configuration, build process, and web server so you can start building the form immediately. Please refer to the set up instructions in that repo.

### 2: Install in an existing application

If you are installing the library into an existing application, you can follow these steps:

1. Install the library:
`npm install --save https://github.com/usds/us-forms-system.git`

2. Install peer dependencies:
- `npm install --save-dev @department-of-veterans-affairs/formation`
- `npm install --save-dev uswds@^1.6.3`
- `npm install --save-dev react@^15.5.4`
- `npm install --save-dev react-dom@^15.6.2`

3. There will be a few files you will need to configure in order for the form to work. The best reference for understanding what files you will need to create is our [us-forms-system-starter-app](https://github.com/usds/us-forms-system-starter-app).

The essential files needed are:
- An [entry js](https://github.com/usds/us-forms-system-starter-app/blob/master/app.js) file
- A [top-level React component](https://github.com/usds/us-forms-system-starter-app/blob/master/js/components/Form.jsx) that will render the top-level us-forms-system component
- A [routes](https://github.com/usds/us-forms-system-starter-app/blob/master/js/routes.jsx) file that loads `createRoutes` from the us-forms-system, which creates the routes from the config automatically
- A [reducers](https://github.com/usds/us-forms-system-starter-app/blob/master/js/reducers.js) file that loads `createSchemaFormReducer` from us-forms-system to create the app's reducer functions
- The [form config](https://github.com/usds/us-forms-system-starter-app/blob/master/js/config/form.js) itself

These instructions assume your existing app has a web server in order to run the app locally.
