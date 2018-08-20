:book: [*US Forms System Documentation*](../README.md) :arrow_right: [*Building a Form*](./README.md)

# Common definitions

Definitions are pieces of the form config that can be dropped in to represent specific types of questions. Most often used in `uiSchema`, definitions include features such as label text, validation functions, error messages, and rules for which widget to render.

There are common types of definitions: `schema`/`uiSchema` objects and functions that return `schema`/`uiSchema` objects. For the function versions, there is documentation within the fields for the parameters. Definitions are located in [/src/js/definitions](../../src/js/definitions).

- Simple definitions are provided as `schema` and `uiSchema` objects that you can import and overwrite to customize.
- More complex definitions are functions that require certain parameters.

### Using definitions

To use a definition, import it near the top of the file you want to reference it in:

```js
import currencyUI from 'us-forms-system/lib/js/definitions/currency';
```

Then, call it to add all the `uiSchema` definitions. In this example, the definition is a function that takes the title for that field, which is used to populate the 'ui:title' property in uiSchema:

```js
uiSchema: {
  ...
  monthlyWages: currencyUI('Monthly wages')
  ...
}
```

Available definitions are:

- [Address](#address)
- [Autosuggest](#autosuggest)
- [Bank account](#bank-account)
- [Currency](#currency)
- [Current or past dates](#current-or-past-dates)
- [Current or past month/year](#current-or-past-monthyear)
- [Date](#date)
- [Date range](#date-range)
- [File upload](#file-upload)
- [Full name](#full-name)
- [Month/year](#monthyear)
- [Month/year range](#monthyear-range)
- [Non-required full name](#non-required-full-name)
- [Person ID](#person-id)
- [Phone](#phone)
- [Social Security Number](#social-security-number)
- [Year](#year)

### Address

Validates a complete street address that a user types.

- File: [/src/js/definitions/address.js](../../src/js/definitions/address.js)
- `uiSchema`: Yes
- `schema`: Yes
- Function or object: Functions

### Autosuggest

A common type-ahead widget that lets a user type in values and narrow down a longer list of options. It is most commonly used with an `enum` of the available options as shown here. Define the uiSchema by calling the function that you import. You can pass an object with additional uiSchema properties.
```js
import { uiSchema as autosuggestUI } from 'us-forms-system/lib/js/definitions/autosuggest';

schema: {
  type: 'object',
  properties: {
    officeLocation: {
      type: 'string',
      enum: [
        'LA', 'NY', 'CH'
      ],
      enumNames: [
        'Los Angeles',
        'New York',
        'Chicago'
      ]
    }
  }
},
uiSchema: {
  officeLocation: autosuggestUI(
    'Preferred Office Location',  // field title
    null,         // Promise to get options (optional)
    {             // Additional uiSchema options
      'ui:options': {
        // When labels are not provided, it uses enumNames
        labels: { }
      }
    }
  )
}
```
Source: [/src/js/definitions/autosuggest.js](../../src/js/definitions/autosuggest.js)

### Bank account

The common electronic funds transfer (EFT) account information field that collects account type (checking or savings), bank account number, and bank routing number. Use these definitions as the uiSchema for the field that represents the account number.

```js
import bankAccountUI from 'us-forms-system/lib/js/definitions/bankAccount';

uiSchema: {
  eftinfo: bankAccountUI
}
```
Source: [/src/js/definitions/bankAccount.js](../../src/js/definitions/bankAccount.js)

### Currency

Formats and validates a US currency field. The display includes a leading `$` character. Call this exported function and pass it the label to be used on the field.

```js
import currencyUI from 'us-forms-system/lib/js/definitions/currency';

uiSchema: {
  payments: currencyUI('Total Payments')
}
```
Source: [/src/js/definitions/currency.js](../../src/js/definitions/currency.js)

### Current or past dates

The common date field with current or past validation set (i.e., dates in the future are not valid). Call this exported function and pass it the label to be used on the field.

```js
import currentOrPastDateUI from 'us-forms-system/lib/js/definitions/currentOrPastDate';

uiSchema: {
  birthdate: currentOrPastDate('Date of Birth')
}
```
Source: [/src/js/definitions/currentOrPastDate.js](../../src/js/definitions/currentOrPastDate.js)

### Current or past month/year

The common date field without the day field and with current or past validation set (i.e., dates in the future are not valid). Call this exported function and pass it the label to be used on the field.

```js
import currentOrPastMonthYear from 'us-forms-system/lib/js/definitions/currentOrPastMonthYear';

uiSchema: {
  lastContact: currentOrPastMonthYear('Last Contact')
}
```
Source:  [/src/js/definitions/currentOrPastMonthYear.js](../../src/js/definitions/currentOrPastMonthYear.js)

### Date

The common date field with basic date validation. Call this exported function and pass it the label to be used on the field.
```js
import dateUI from 'us-forms-system/lib/js/definitions/date';

uiSchema: {
  startDate: dateUI('startDate')
}
```
Source: [/src/js/definitions/date.js](../../src/js/definitions/date.js)

### Date range

Two common date fields with validation to ensure they form a valid range. Call this exported function.
```js
import dateRangeUI from 'us-forms-system/lib/js/definitions/dateRange';

uiSchema: {
  servicePeriod: dateRangeUI('servicePeriod')
}
```
Source: [/src/js/definitions/dateRange.js](../../src/js/definitions/dateRange.js)

### File upload

*Note: This is currently not functional. The file upload field requires a specified endpoint for the upload. Documentation will be updated later.*

Source: [/src/js/definitions/file.js](../../src/js/definitions/file.js)

### Full name

The normal name field, including first, middle, last, and suffix.
```js
import fullNameUI from 'us-forms-system/lib/js/definitions/fullName';

uiSchema: {
  fullName: fullNameUI
}
```
Source: [/src/js/definitions/fullName.js](../../src/js/definitions/fullName.js)

### Month/year

The common date field, excluding day field, with basic validation. Call this exported function with the label to be displayed on the field.
```js
import monthYearUI from 'us-forms-system/lib/js/definitions/monthYear';

uiSchema: {
  serviceStart: monthYearUI('Month/Year Service Started')
}
```
Source: [/src/js/definitions/monthYear.js](../../src/js/definitions/monthYear.js)

### Month/year range

Two common date fields, excluding day field, with validation to ensure the dates form a valid range. Similar to the `Date range` above but without the days. Call this exported function.
```js
import monthYearRangeUI from 'us-forms-system/lib/js/definitions/monthYearRange';

uiSchema: {
  serviceStart: monthYearRangeUI()
}
```
Source: [/src/js/definitions/monthYearRange.js](../../src/js/definitions/monthYearRange.js)

### Non-required full name

A function that takes a full name `schema` and sets its required field list to `empty`.

- File: [/src/js/definitions/nonRequiredFullName.js](../../src/js/definitions/nonRequiredFullName.js)
- `uiSchema`: No
- `schema`: Yes
- Function or object: Function

### Person ID

A function that allows the user to specify a form of personal identification. For example, the form can ask for a social security number and include a checkbox to specify that the user doesn't have one, allowing them to instead specify a Veterans Affairs file number.

- File: [/src/js/definitions/personId.js](../../src/js/definitions/personId.js)
- `uiSchema`: Yes
- `schema`: Yes
- Function or object: Function

### Phone

A phone number with basic validation. Call this exported function, optionally passing it the label for the field (the default is "Phone").
```js
import phoneUI from 'us-forms-system/lib/js/definitions/phone';

uiSchema: {
  homePhone: phoneUI('Home Phone')
}
```
Source: [/src/js/definitions/phone.js](../../src/js/definitions/phone.js)

### Social Security Number

A social security number with default label text and validation. This is an object.
```js
import ssnUI from 'us-forms-system/lib/js/definitions/ssn';

uiSchema: {
  ssn: ssnUI
}
```
Source: [/src/js/definitions/ssn.js](../../src/js/definitions/ssn.js)

### Year

A text field that validates the current or a past year. This is an object.
```js
import yearUI from 'us-forms-system/lib/js/definitions/year';

uiSchema: {
  yearBorn: yearUI
}
```
Source: [/src/js/definitions/year.js](../../src/js/definitions/year.js)


[Back to *Building a Form*](./README.md)
