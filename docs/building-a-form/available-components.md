# Available components

TBD

### In this guide

- [Form instructions](#form-instructions)
- [Form footer](#form-footer)
- [Progress bar](#progress-bar)
- [Title](#title)
- [Subtitle](#subtitle)
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
- [Document upload](#document-upload)

### Form instructions

This widget allows you to provide important information, warnings, or step-by-step instructions to users before they fill out a form.

![Instructions for an example healthcare benefits form](https://raw.githubusercontent.com/wiki/usds/us-forms-system/images/Instructions.png)

#### What's available and where?

- ?

### Form footer

This widget appears at the bottom of every page of the form (if it has multiple pages).

![A form footer that lists phone numbers to call for help](https://raw.githubusercontent.com/wiki/usds/us-forms-system/images/Footer.png)

#### What's available and where?

- https://github.com/usds/us-forms-system/blob/master/src/js/containers/FormApp.jsx

### Progress bar

This widget indicates to the user where they are in the process of the form. It includes a non-interactive, sectioned progress bar, a number to indicate how many pages there are within each section, and a title of that section.

![A progress bar indicating that three of six parts of a form are completed](https://raw.githubusercontent.com/wiki/usds/us-forms-system/images/Progress-Bar.png)

#### What's available and where?

- https://github.com/usds/us-forms-system/blob/master/src/js/components/ProgressBar.jsx
- https://github.com/usds/us-forms-system/blob/master/src/js/components/SegmentedProgressBar.jsx

### Title

The name of the form. The form number should be specified in the Subtitle widget.

![A title and subtitle of a form with the title highlighted](https://raw.githubusercontent.com/wiki/usds/us-forms-system/images/Title.jpg)

#### What's available and where?

- https://github.com/usds/us-forms-system/blob/master/src/js/components/FormTitle.jsx

### Subtitle

In US Forms System, the subtitle represents the form number. It appears near the form title.

![A title and subtitle of a form with the subtitle highlighted](https://raw.githubusercontent.com/wiki/usds/us-forms-system/images/Subtitle.jpg)

#### What's available and where?

- https://github.com/usds/us-forms-system/blob/master/src/js/components/FormTitle.jsx

### Date

A date picker (with validations).

![A form date selector widget with June 8, 1995 selected](https://raw.githubusercontent.com/wiki/usds/us-forms-system/images/Date.jpg)

#### What's available and where?

- https://github.com/usds/us-forms-system/blob/master/src/js/definitions/date.js
- https://github.com/usds/us-forms-system/blob/master/src/js/definitions/dateRange.js
- https://github.com/usds/us-forms-system/blob/master/src/js/definitions/currentOrPastDate.js
- https://github.com/usds/us-forms-system/blob/master/src/js/definitions/monthYear.js
- https://github.com/usds/us-forms-system/blob/master/src/js/definitions/monthYearRange.js

### Alerts

This feature can be used in several color variations, with or without icons, to indicate a warning, an error, or contextual information.

#### What's available and where?

- ?

### Hidden contextual information

This feature hides contextual info so that the user can opt to see the information only if needed.

![Two questions, one with contextual information hidden and one with information shown](https://raw.githubusercontent.com/wiki/usds/us-forms-system/images/Contextual-info-hidden.jpg)

#### What's available and where?

- https://github.com/usds/us-forms-system/blob/master/src/js/components/ExpandingGroup.jsx

### Radio button group

A group of options where the user can only select a single item.

![A question with four radio button options and one selected](https://raw.githubusercontent.com/wiki/usds/us-forms-system/images/Boolean-radio.jpg)

#### What's available and where?

- https://github.com/usds/us-forms-system/blob/master/src/js/widgets/RadioWidget.jsx

### Checkbox group

A group of options where the user can select multiple items.

![A multiple choice question with two options selected](https://raw.githubusercontent.com/wiki/usds/us-forms-system/images/Boolean-checkbox.jpg)

#### What's available and where?

- https://github.com/usds/us-forms-system/blob/master/src/js/widgets/CheckboxWidget.jsx
- https://github.com/usds/us-forms-system/blob/master/src/js/components/ErrorableCheckbox.jsx

### Contextual error message

This indicates to the user that they have either not filled out a required field or they have not done so within the form's parameters. You can set a custom error message to help the user progress with the form.

![A question with no response and an error indicating a response is required](https://raw.githubusercontent.com/wiki/usds/us-forms-system/images/Error.jpg)

#### What's available and where?

- ?

### Required field

Require any field. Validation is included.

![A field with an error indicating a response is required](https://raw.githubusercontent.com/wiki/usds/us-forms-system/images/Required-field.jpg)

#### What's available and where?

- https://github.com/usds/us-forms-system/blob/master/src/js/components/PrivacyAgreement.jsx
- https://github.com/usds/us-forms-system/blob/master/src/js/fields/BasicArrayField.jsx
- https://github.com/usds/us-forms-system/blob/master/src/js/fields/ObjectField.jsx
- https://github.com/usds/us-forms-system/blob/master/src/js/widgets/CheckboxWidget.jsx
- https://github.com/usds/us-forms-system/blob/master/src/js/components/ErrorableCheckbox.jsx
- https://github.com/usds/us-forms-system/blob/master/src/js/definitions/address.js
- https://github.com/usds/us-forms-system/blob/master/src/js/widgets/DateWidget.jsx
- https://github.com/usds/us-forms-system/blob/master/src/js/components/ExpandingGroup.jsx
- https://github.com/usds/us-forms-system/blob/master/src/js/fields/ArrayField.jsx
- https://github.com/usds/us-forms-system/blob/master/src/js/fields/FileField.jsx

### Action buttons

You can use buttons to proceed to another form section, return to a previous form section, or submit the form.

#### What's available and where?

- https://github.com/usds/us-forms-system/blob/master/src/js/review/SubmitButtons.jsx
- https://github.com/usds/us-forms-system/blob/master/src/js/review/SubmitController.jsx

### Password

Description TBD

#### What's available and where?

- ?

### Duplicate field validation

User enters duplicate data in two field. Validation included.

![Two fields with an error indicating the value of the entries must match](https://raw.githubusercontent.com/wiki/usds/us-forms-system/images/Duplicate-Field-Validation.jpg)

#### What's available and where?

- ?

### Conditional form fields

You can set follow up questions to appear only if the user answers a form question a particular way.

![A question with a yes/no answer, and additional fields that displayed when the answer was Yes](https://raw.githubusercontent.com/wiki/usds/us-forms-system/images/Conditional-Fields.jpg)

#### What's available and where?

- https://github.com/usds/us-forms-system/blob/master/src/js/state/helpers.js ?

### Sequential duplicate form groups

Use this feature to collect multiple items with the same form questions, such as addresses in a time period, jobs in a time period, or employment in a time period.

![A form section showing basic information about multiple insurance policies](https://raw.githubusercontent.com/wiki/usds/us-forms-system/images/Sequential-Duplicate-Form-Groups.jpg)

#### What's available and where?

- https://github.com/usds/us-forms-system/blob/master/src/js/fields/ArrayField.jsx

### Linear form sections

When you have a long form, or a form that has a lot of conditional questions, you can break up your form into sections that make it less overwhelming for users. The sections you designate will automatically correspond to the [Progress Bar feature](#progress-bar).

![]() - :caution: Needs image

#### What's available and where?

- ?

### Review page

When you build a form with more than one section (shown by the segments in a progress bar), the review page lets users edit all of their entered form data without having to go back one page at a time.

![Multiple collapsed summaries of sections within a form](https://raw.githubusercontent.com/wiki/usds/us-forms-system/images/Review-Page.jpg)

#### What's available and where?

- https://github.com/usds/us-forms-system/tree/master/src/js/review (Whole folder?)

### Required checkbox before form submission

Use this feature to require a user to indicate they have read terms & conditions, a privacy policy, or any other text before submitting your form. This includes a checkbox and short-form text that can include relevant links to more verbose text on separate pages on your site.

![](https://raw.githubusercontent.com/wiki/usds/us-forms-system/images/Required-Checkbox.jpg)

#### What's available and where?

- https://github.com/usds/us-forms-system/blob/master/src/js/components/ErrorableCheckbox.jsx

### Document upload

User uploads a file from local server to cloud location.

![A file upload button with text explaining the desired format of the uploaded file](https://raw.githubusercontent.com/wiki/usds/us-forms-system/images/Doc-Upload.jpg)

#### What's available and where?

- https://github.com/usds/us-forms-system/blob/master/src/js/fields/FileField.jsx
- https://github.com/usds/us-forms-system/blob/master/src/js/definitions/file.js
