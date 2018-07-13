# Available components

TBD

### In this guide

- [Form instructions](#form-instructions)
- [Form footer](#form-footer)
- [Progress bar](#progress-bar)
- [Title](#title-and-subtitle)
- [Date](#date)
- [Alerts](#alerts)
- [Hidden contextual information](#hidden-contextual-information)
- [Radio button group](#radio-button-group)
- [Checkbox group](#checkbox-group)
- [Contextual error message](#contextual-error-message)
- [Required field](#required-field)
- [Action buttons](#action-buttons)
- [Password](#password)
- [Duplicate field validation](#duplicate-field-validation)
- [Conditional form fields](#conditional-form-fields)
- [Sequential duplicate form groups](#sequential-duplicate-form-groups)
- [Linear form sections](#linear-form-sections)
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

This widget appears at the bottom of every page of the form (if it has multiple pages). It is not required.

![A form footer that lists phone numbers to call for help](https://raw.githubusercontent.com/wiki/usds/us-forms-system/images/Footer.png)

#### Usage guidelines

To define footer content, create a React component that renders HTML to act as a footer. The starter app does not include a footer, but the design of this component would be very similar to the Introduction component that the starter app contains. For example:

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
- [FormNav.jsx](https://github.com/usds/us-forms-system/blob/master/src/js/components/FormNav.jsx)
- [SegmentedProgressBar.jsx](https://github.com/usds/us-forms-system/blob/master/src/js/components/SegmentedProgressBar.jsx)

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

For the code implementation, see [FormTitle.jsx](https://github.com/usds/us-forms-system/blob/master/src/js/components/FormTitle.jsx).

### Date

Defines a date picker with validations.

![A form date selector widget with June 8, 1995 selected](https://raw.githubusercontent.com/wiki/usds/us-forms-system/images/Date.jpg)

#### Usage guidelines

Define these fields in the `schema` and then reference them in the `uiSchema`. These date field definitions are available:

- [date.js](https://github.com/usds/us-forms-system/blob/master/src/js/definitions/date.js)
- [dateRange.js](https://github.com/usds/us-forms-system/blob/master/src/js/definitions/dateRange.js)
- [currentOrPastDate.js](https://github.com/usds/us-forms-system/blob/master/src/js/definitions/currentOrPastDate.js)
- [monthYear.js](https://github.com/usds/us-forms-system/blob/master/src/js/definitions/monthYear.js)
- [monthYearRange.js](https://github.com/usds/us-forms-system/blob/master/src/js/definitions/monthYearRange.js)

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

### Hidden contextual information

This component hides contextual information so that the user can opt to see it only if needed.

![Two questions, one with contextual information hidden and one with information shown](https://raw.githubusercontent.com/wiki/usds/us-forms-system/images/Contextual-info-hidden.jpg)

#### Usage guidelines

How to specify?

For the code implementation, see [`ExpandingGroup`](https://github.com/usds/us-forms-system/blob/master/src/js/components/ExpandingGroup.jsx).

### Radio button group

A group of options where the user can only select a single item.

![A question with four radio button options and one selected](https://raw.githubusercontent.com/wiki/usds/us-forms-system/images/Boolean-radio.jpg)

#### Usage guidelines

Define this in the data definition in the form config file.

- https://github.com/usds/us-forms-system/blob/master/src/js/widgets/RadioWidget.jsx

### Checkbox group

A group of options where the user can select multiple items.

![A multiple choice question with two options selected](https://raw.githubusercontent.com/wiki/usds/us-forms-system/images/Boolean-checkbox.jpg)

#### Usage guidelines

Define this in the data definition in the form config file.

- https://github.com/usds/us-forms-system/blob/master/src/js/widgets/CheckboxWidget.jsx

### Required field

Require any field. Validation is included.

![A field with an error indicating a response is required](https://raw.githubusercontent.com/wiki/usds/us-forms-system/images/Required-field.jpg)

#### Usage guidelines

See the example in https://github.com/usds/us-forms-system/blob/master/docs/building-a-form/creating-a-form-config-file.md#building-a-simple-form.

### Contextual error message

This indicates to the user that they have either not filled out a required field or they have not done so within the form's parameters. You can set a custom error message to help the user progress with the form.

![A question with no response and an error indicating a response is required](https://raw.githubusercontent.com/wiki/usds/us-forms-system/images/Error.jpg)

#### Usage guidelines

- ?

### Password

Description TBD

#### Usage guidelines

This is documented in the README of react-jsonschema-form.

### Duplicate field validation

User enters duplicate data in two fields. Validation included.

![Two fields with an error indicating the value of the entries must match](https://raw.githubusercontent.com/wiki/usds/us-forms-system/images/Duplicate-Field-Validation.jpg)

#### Usage guidelines

For more information, see "[Validating a field based on other fields in the same object](common-patterns-for-building-forms.md#validating-a-field-based-on-other-fields-in-the-same-object)."

### Conditional form fields

You can set follow up questions to appear only if the user answers a form question a particular way.

![A question with a yes/no answer, and additional fields that displayed when the answer was Yes](https://raw.githubusercontent.com/wiki/usds/us-forms-system/images/Conditional-Fields.jpg)

#### Usage guidelines

Declare this through form config. See https://github.com/usds/us-forms-system/blob/master/src/js/state/helpers.js.

### Sequential duplicate form groups

Use this feature to collect multiple items with the same form questions, such as addresses in a time period, jobs in a time period, or employment in a time period.

![A form section showing basic information about multiple insurance policies](https://raw.githubusercontent.com/wiki/usds/us-forms-system/images/Sequential-Duplicate-Form-Groups.jpg)

#### Usage guidelines

This must be defined in the form config file.

### Review page

When you build a form with more than one chapter (shown by the segments in a progress bar), the review page lets users edit all of their entered form data without having to go back one page at a time.

![Multiple collapsed summaries of sections within a form](https://raw.githubusercontent.com/wiki/usds/us-forms-system/images/Review-Page.jpg)

#### Usage guidelines

Break into separate topic?

- https://github.com/usds/us-forms-system/tree/master/src/js/review

### Required checkbox before form submission

Use this feature to require a user to indicate they have read terms & conditions, a privacy policy, or any other text before submitting your form. This includes a checkbox and short-form text that can include relevant links to more verbose text on separate pages on your site.

! Update image

![](https://raw.githubusercontent.com/wiki/usds/us-forms-system/images/Required-Checkbox.jpg)

#### Usage guidelines

- https://github.com/usds/us-forms-system/blob/master/src/js/components/ErrorableCheckbox.jsx

[Back to *Building a Form*](README.md)
