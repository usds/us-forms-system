:book: [*US Forms System Documentation*](../README.md) :arrow_right: [*Building a Form*](./README.md)

# Available form features and usage guidelines

These form features are available in the US Forms System library. We've provided information about how to implement them in your form.

### In this guide

- [Form instructions](#form-instructions)
- [Form footer](#form-footer)
- [Progress bar](#progress-bar)
- [Title](#title-and-subtitle)
- [Date](#date)
- [Alerts](#alerts)
- [Radio button group](#radio-button-group)
- [Checkbox group](#checkbox-group)
- [Required field](#required-field)
- [Contextual error message](#contextual-error-message)
- [Duplicate field validation](#duplicate-field-validation)
- [Conditional form fields](#conditional-form-fields)
- [Sequential duplicate form groups](#sequential-duplicate-form-groups)
- [Review page](#review-page)
- [Required checkbox before form submission](#required-checkbox-before-form-submission)

### Form instructions

This widget allows you to provide important information, warnings, or step-by-step instructions to users before they fill out a form.

![Instructions for an example healthcare benefits form](https://raw.githubusercontent.com/wiki/usds/us-forms-system/images/Instructions.png)

#### Usage guidelines

Unlike most components, the `Introduction` React component is in the US Forms System Starter App at https://github.com/usds/us-forms-system-starter-app/blob/master/js/components/Introduction.jsx, not the library itself.

To include the component, set the `formConfig.introduction` property to a reference to that component. Edit the HTML inside the component to change the content. For example:

```js
import Introduction from '../components/Introduction.jsx';

const formConfig = {
  …
  introduction: Introduction,
  …
};
```

### Form footer

This widget appears at the bottom of every page of a multi-page form. It is not required.

![A form footer that lists phone numbers to call for help](https://raw.githubusercontent.com/wiki/usds/us-forms-system/images/Footer.png)

#### Usage guidelines

To define footer content, create a React component that renders HTML to act as a footer. The [US Forms System Starter App](https://github.com/usds/us-forms-system-starter-app) does not include a footer, but the design of this component would be very similar to the Introduction component that the starter app contains. For example:

```js
import Footer from '../components/Footer.jsx';
const formConfig = {
  …
  footer: Footer,
  …
};
```

For the code implementation, see [FormApp.jsx](https://github.com/usds/us-forms-system/blob/master/src/js/containers/FormApp.jsx).

### Progress bar

The `SegmentedProgressBar` component calculates the number of chapters completed and displays them in a horizontal stack of blocks. It indicates to the user how much of a multi-chapter or multi-page form they've completed. It includes:

- A non-interactive, sectioned progress bar
- A number to indicate how many pages there are within each section
- The title of that section

![A progress bar indicating that three of six parts of a form are completed](https://raw.githubusercontent.com/wiki/usds/us-forms-system/images/Progress-Bar.png)

#### Usage guidelines

In `formConfig`, define your form's chapters and the pages contained inside each chapter. To add a progress bar to a multi-page form, create chapters with a single page each. We don't recommend including a progress bar on single-page forms.

US Forms System includes the progress bar by default, and will display automatically when the chapters and pages are defined. To remove the progress bar, edit the `FormNav.jsx` component to remove the defined `SegmentedProgressBar` in the HTML.

For the code implementation, see:
- [FormNav.jsx](../../src/js/components/FormNav.jsx)
- [SegmentedProgressBar.jsx](../../src/js/components/SegmentedProgressBar.jsx)

### Title and Subtitle

The Title and Subtitle represent the name and form number, respectively. The subtitle displays near the form title.

![A title and subtitle of a form with the title highlighted](https://raw.githubusercontent.com/wiki/usds/us-forms-system/images/Title.jpg)

#### Usage guidelines

Define the title and subtitle in `formConfig`. For example:

```js
const formConfig = {
  …
  title: 'Apply for Health Care',
  subtitle: 'Form 10-10EZ',
  …
};
```

For the code implementation, see [FormTitle.jsx](../../src/js/components/FormTitle.jsx).

### Date

Defines a date picker with validations.

![A form date selector widget with June 8, 1995 selected](https://raw.githubusercontent.com/wiki/usds/us-forms-system/images/Date.jpg)

#### Usage guidelines

Define these fields in the `schema` and then reference them in the `uiSchema`. These date field definitions are available:

- [date.js](../../src/js/definitions/date.js)
- [dateRange.js](../../src/js/definitions/dateRange.js)
- [currentOrPastDate.js](../../src/js/definitions/currentOrPastDate.js)
- [monthYear.js](../../src/js/definitions/monthYear.js)
- [monthYearRange.js](../../src/js/definitions/monthYearRange.js)

For example:

```js
import currentOrPastDate from '../definitions/currentOrPastDate.js';
const formConfig = {
  …
  schema: {
    type: 'object',
    required: [ 'serviceDate' ],
    properties: {
      serviceDate: 'string'
    }
  },
  uiSchema: {
    serviceDate: currentOrPastDate('Service Date'),
  }
  …
};
```

### Alerts

Alerts are included automatically in fields that include validation. Taken from USWDS, alerts appear in several color variations, with or without icons, to indicate a warning, an error, or contextual information.

#### Usage guidelines

For examples of how alerts are used, see https://github.com/usds/us-forms-system/tree/master/src/js/widgets.

### Radio button group

A group of options where the user can only select a single item.

![A question with four radio button options and one selected](https://raw.githubusercontent.com/wiki/usds/us-forms-system/images/Boolean-radio.jpg)

#### Usage guidelines

The data for a group of radio buttons is similar to the data for a select field (i.e., `string` type with an `enum` property), which means the `SelectWidget` will be rendered by default.

To override the `SelectWidget`, pass `'ui:widget': 'radio'` to your `uiSchema` for that field. To specify different label text for each option, pass `'ui:options'` to `uiSchema`.

Your config for a question where the answer is selected from a group of radio buttons might look like this:

```js
schema: {
  type: 'object',
  properties: {
    favoriteAnimal: {
      type: 'string',
      enum: ['dog', 'cat', 'octopus', 'sloth']
    }
  }
},
uiSchema: {
  'ui:widget': 'radio',
  'ui:options': {
    labels: {
      dog: 'Dog',
      cat: 'Cat',
      octopus: 'Octopus',
      sloth: 'Sloth'
    }
  }
}
```

For the code implementation, see [`RadioWidget`](../../src/js/widgets/RadioWidget.jsx).

### Checkbox group

A group of options where the user can select multiple items.

![A multiple choice question with two options selected](https://raw.githubusercontent.com/wiki/usds/us-forms-system/images/Boolean-checkbox.jpg)

#### Usage guidelines

Each individual checkbox is used to store `boolean` data. To include a group of checkboxes, include separate fields for each checkbox, with `type: 'boolean'` passed to the `schema`.

Your config for a group of checkboxes might look like this:

```js
schema: {
  type: 'object',
  properties: {
    'view:booksRead': {
      type: 'object',
      properties: {
        hasReadPrideAndPrejudice: { type: 'boolean' },
        hasReadJaneEyre: { type: 'boolean' },
        hasReadGreatGatsby: { type: 'boolean' },
        hasReadBuddenbrooks: { type: 'boolean' }
      }
    }
  }
},
uiSchema: {
  'view:booksRead': {
    'ui:title': 'Which books have you read?',
    'ui:description': 'You may check more than one.',
    hasReadPrideAndPrejudice: {
      'ui:title': 'Pride and Prejudice by Jane Austen'
    },
    hasReadJaneEyre: {
      'ui:title': 'Jane Eyre by Charlotte Brontë'
    },
    hasReadGreatGatsby: {
      'ui:title': 'The Great Gatsby by F. Scott Fitzgerald'
    },
    hasReadBuddenbrooks: {
      'ui:title': 'Buddenbrooks by Thomas Mann'
    }
  }
}
```

For the code implementation, see [`CheckboxWidget`](../../src/js/widgets/CheckboxWidget.jsx).

### Required field

Require any field. Validation is included.

![A field with an error indicating a response is required](https://raw.githubusercontent.com/wiki/usds/us-forms-system/images/Required-field.jpg)

#### Usage guidelines

For information on requiring fields or components, see "[About the schema and uiSchema objects](./about-the-schema-and-uischema-objects.md)."

### Contextual error message

This indicates to the user that they have either not filled out a required field or they have not done so within the form's parameters. You can set a custom error message to help the user progress with the form.

![A question with no response and an error indicating a response is required](https://raw.githubusercontent.com/wiki/usds/us-forms-system/images/Error.jpg)

#### Usage guidelines

There are several ways that form fields can be invalid, such as a required field is blank, the entry is too short or long, or the entry does not satisfy a specific format.

- **To show an error on a blank field that is required**, include the field in the array under the `required` property in the `schema`. An error on that field will automatically be rendered if the field is blank.
- **To show an error on a field for any other reason** (e.g., it has not met certain data requirements), pass a validation function to the array for the `ui:validations` property under that field in `uiSchema`.

The error message that is displayed can either be a default message or one that you specify. There are several [default error messages](../../src/js/validations.js) for different situations.

To show a custom error message, add the message to the `ui:errorMessages` object in the `uiSchema` as a key value pair:

- The key is the `schema` property that the data is in violation of (e.g., the entry doesn't match the requirements of the `pattern` property).
- The value is the text of the error message.

When you include multiple messages in the `ui:errorMessages` object, they will be evaluated in order.

Your config file may look like this:
```js
schema: {
  type: 'object',
  required: ['ssn'],
  properties: {
    ssn: {
      type: 'string',
      pattern: '^[0-9]{9}$'
    }
  }
},
uiSchema: {
  ssn: {
    'ui:widget': SSNWidget,
    'ui:title': 'Social Security number',
    'ui:validations': [
      validateSSN
    ],
    'ui:errorMessages': {
      required: 'Please enter your SSN',
      pattern: 'Please enter a valid 9 digit SSN (dashes not allowed)'
    }
  }
}
```

### Duplicate field validation

This feature validates that a user has correctly entered duplicate data in two fields.

![Two fields with an error indicating the value of the entries must match](https://raw.githubusercontent.com/wiki/usds/us-forms-system/images/Duplicate-Field-Validation.jpg)

#### Usage guidelines

For more information, see "[Validating a field based on other fields in the same object](./common-patterns-for-building-forms.md#validating-a-field-based-on-other-fields-in-the-same-object)."

### Conditional form fields

You can set follow up questions to appear only if the user answers a form question a particular way.

![A question with a yes/no answer, and additional fields that displayed when the answer was Yes](https://raw.githubusercontent.com/wiki/usds/us-forms-system/images/Conditional-Fields.jpg)

#### Usage guidelines

There are 2 fields you can use to conditionally expand a form field:
- `expandUnder`: This property takes the name of the other field upon which your field is shown.
- `expandUnderCondition`: This property takes 1 of 2 values:
- The answer to the other field that would satisfy the condition to show your field. If the other field takes boolean data, your field will automatically be shown if the answer to the other field is `true`, so there is no need to include `expandUnderCondition: true` in that case. However, if the other field takes any other type of data, you will need to include `expandUnderCondition`.
- A function that receives the data from the `expandUnder` field as an argument.

Both fields are nested under the `ui:options` property in the `uiSchema`.

The `expandUnder` and `expandUnderCondition` properties are distinctly separate from the `depends` property, which conditionally shows entire pages of the form. For more information, see "[Conditionally excluding a page](./common-patterns-for-building-forms#conditionally-including-a-page).

Your config file might look like this:
```js
{
  schema: {
    type: 'object',
    properties: {
      hasPet: {
        type: 'boolean'
      },
      petName: {
        type: 'string'
      }
    }
  },
  uiSchema: {
    hasPet: {
      'ui:title': 'Do you have a pet?'
      'ui:widget': 'yesNo'
    },
    petName: {
      'ui:title': 'What is your pet‘s name?',
      'ui:options': {
        expandUnder: 'hasPet',
        expandUnderCondition: true
      }
    }
  }
}
```

For the code implementation, see [`helpers.js`](../../src/js/state/helpers.js).

### Sequential duplicate form groups

Use this feature to collect multiple items with the same form questions, such as addresses in a time period, jobs in a time period, or employment in a time period.

![A form section showing basic information about multiple insurance policies](https://raw.githubusercontent.com/wiki/usds/us-forms-system/images/Sequential-Duplicate-Form-Groups.jpg)

#### Usage guidelines

To display multiple groups of the same form questions, define the data in the `schema` as `type: 'array'`, with each group of questions as an `item` in that `array`. The `schema` and `uiSchema` for the group of questions within the `items` object is structured the same as other fields.

Your config file might look like this:
```js
{
  schema: {
    type: 'object',
    properties: {
      dogs: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            nameOfDog: { type: 'string' },
            age: { type: 'string' },
            breed: { type: 'string' }
          }
        }
      }
    }
  },
  uiSchema: {
    'ui:title': 'How many dogs do you have?',
    items: {
      nameOfDog: { 'ui:title': 'What is your dog‘s name?' },
      age: { 'ui:title': 'How old is your dog?' },
      breed: { 'ui:title': 'What is your dog‘s breed?' }
    }
  }
}
```

### Review page

When you build a form with more than one chapter (shown by the segments in a progress bar), the review page lets a user edit all of their entered form data without having to go back one page at a time.

![Multiple collapsed summaries of sections within a form](https://raw.githubusercontent.com/wiki/usds/us-forms-system/images/Review-Page.jpg)

#### Usage guidelines

The review page renders the form data in review mode automatically. However, you can pass some specific options to the form config to customize some review features.

This property is nested directly under `uiSchema`:
- `'ui:reviewWidget'`: takes a widget component to render on the review page for that field. Default review widgets are automatically rendered, so only use this if you need to customize the review widget that is used.

These properties are nested under `uiSchema: { `ui:options`: {} }`:
- `hideOnReview`: Hides the field on the review page; takes a `boolean`
- `hideOnReviewIfFalse`: Hides the field on the review page when the field value is `false`; takes a `boolean`
- `keepInPageOnReview`: By default, array fields that are displayed on a single page in a form, such as information for multiple dependents, are displayed in a separate section on the review page. To keep the information in a single section on a review page, set this property.

For the code implementation, see the [`review` folder](../../src/js/review).

### Required checkbox before form submission

Use this feature to require a user to indicate they have read terms and conditions, a privacy policy, or any other text before submitting your form. This includes a checkbox and short-form text that can include relevant links to more verbose text on separate pages on your site.

![Required checkbox before form submission](https://raw.githubusercontent.com/wiki/usds/us-forms-system/images/Required-Checkbox.jpg)

#### Usage guidelines

Right now, the required checkbox is automatically included in all forms. The US Forms System team will refactor this component to make it more customizable. To follow that discussion, subscribe to https://github.com/usds/us-forms-system/issues/53.

For the code implementation, see [`ErrorableCheckbox`](../../src/js/components/ErrorableCheckbox.jsx).

[Back to *Building a Form*](./README.md)
