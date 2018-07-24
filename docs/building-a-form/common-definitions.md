# Common definitions

Definitions are pieces of the form config that can be dropped in to represent specific types of questions. Most often used in `uiSchema`, definitions include features such as label text, validation functions, error messages, and rules for which widget to render.

There are common types of definitions: `schema`/`uiSchema` objects and functions that return `schema`/`uiSchema` objects. For the function versions, there is documentation within the fields for the parameters. Definitions are located in [/src/js/definitions](../src/js/definitions).

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

A common type-ahead widget that lets a user type in values and narrow down a longer list of options.

- File: [/src/js/definitions/autosuggest.js](../../src/js/definitions/autosuggest.js)
- `uiSchema`: Yes
- `schema`: Yes (for use when you are not using an `enum` in the schema)
- Function or object: Function for `uiSchema`, object for `schema`

### Bank account

The common electronic funds transfer (EFT) account information field that collects account type (checking or savings), bank account number, and bank routing number. Use these definitions as the uiSchema for the field that represents the account number.

```js
import { uiSchema as bankAccountUI }
  from 'us-forms-system/lib/js/definitions/bankAccount'

uiSchema: {
  eftinfo: bankAccountUI;
}
```
Source: [/src/js/definitions/bankAccount.js](../../src/js/definitions/bankAccount.js)

### Currency

Formats and validates a US currency field. The display includes a leading `$` character. Call this exported function and pass it the label to be used on the field.

```js
import { uiSchema as currencyUI }
  from 'us-forms-system/lib/js/definitions/currency'

uiSchema: {
  payments: currencyUI('Total Payments');
}
```
Source: [/src/js/definitions/currency.js](../../src/js/definitions/currency.js)

### Current or past dates

The common date field with current or past validation set (i.e., dates in the future are not valid). Call this exported function and pass it the label to be used on the field.

```js
import { uiSchema as currentOrPastDateUI }
  from 'us-forms-system/lib/js/definitions/currentOrPastDate'

uiSchema: {
  birthdate: currentOrPastDate('Date of Birth');
}
```
Source: [/src/js/definitions/currentOrPastDate.js](../../src/js/definitions/currentOrPastDate.js)

### Current or past month/year

The common date field without the day field and with current or past validation set (i.e., dates in the future are not valid). Call this exported function and pass it the label to be used on the field.

```js
import { uiSchema as currentOrPastMonthYear }
  from 'us-forms-system/lib/js/definitions/currentOrPastMonthYear'

uiSchema: {
  lastContact: currentOrPastMonthYear('Last Contact');
}
```
Source:  [/src/js/definitions/currentOrPastMonthYear.js](../../src/js/definitions/currentOrPastMonthYear.js)

### Date

The common date field with basic date validation.

- File: [/src/js/definitions/date.js](../../src/js/definitions/date.js)
- `uiSchema`: Yes
- `schema`: No
- Function or object: Function

### Date range

Two common date fields with validation to ensure they form a valid range.

- File: [/src/js/definitions/dateRange.js](../../src/js/definitions/dateRange.js)
- `uiSchema`: Yes
- `schema`: No
- Function or object: Function

### File upload

The file upload field. Requires a specified endpoint for the upload.

- File: [/src/js/definitions/file.js](../../src/js/definitions/file.js)
- `uiSchema`: Yes
- `schema`: Yes (the same as in vets-json-schema)
- Function or object: Function for `uiSchema`, object for `schema`

### Full name

The normal name field, including first, middle, last, and suffix.

- File: [/src/js/definitions/fullName.js](../../src/js/definitions/fullName.js)
- `uiSchema`: Yes
- `schema`: No
- Function or object: Object

### Month/year

The common date field, excluding day field, with basic validation.

- File: [/src/js/definitions/monthYear.js](../../src/js/definitions/monthYear.js)
- `uiSchema`: Yes
- `schema`: No
- Function or object: Function

### Month/year range

Two common date fields, excluding day field, with validation to ensure the dates form a valid range.

- File: [/src/js/definitions/monthYearRange.js](../../src/js/definitions/monthYearRange.js)
- `uiSchema`: Yes
- `schema`: No
- Function or object: Function

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

A phone number with basic validation.

- File: [/src/js/definitions/phone.js](../../src/js/definitions/phone.js)
- `uiSchema`: Yes
- `schema`: No
- Function or object: Function

### Social Security Number

A social security number with default label text and validation.

- File: [/src/js/definitions/ssn.js](../../src/js/definitions/ssn.js)
- `uiSchema`: Yes
- `schema`: No
- Function or object: Object

### Year

A text field that validates the current or a past year.

- File: [/src/js/definitions/year.js](../../src/js/definitions/year.js)
- `uiSchema`: Yes
- `schema`: No
- Function or object: Object

[Back to *Building a Form*](README.md)
