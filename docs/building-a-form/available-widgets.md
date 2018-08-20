:book: [*US Forms System Documentation*](../README.md) :arrow_right: [*Building a Form*](./README.md)

# Available widgets

Widgets are React components that return specific HTML form elements. Set these widgets in a config file while building your form.

Some widgets are associated with particular schema types or formats. There are additional widgets available, but the us-forms-system uses definitions they're included in, rather than just the field.

Widgets from the [react-jsonschema-form library](./about-the-schema-and-uischema-objects.md#understanding-the-uischema-object) include string mappings. Widgets created specifically for US Forms System do not have mappings, and therefore must be specified by passing the component for the widget directly to the config. To include such widgets, import the widget at the top of the file:

```js
import CurrencyWidget from 'us-forms-system/lib/js/widgets/CurrencyWidget';
```

Then, set the `ui:widget` field to the imported widget name:

```js
uiSchema: {
  ...
  'ui:widget': CurrencyWidget,
  ...
}
```

Available widgets are:

- [`ArrayCountWidget`](#arraycountwidget)
- [`CheckboxWidget`](#checkboxwidget)
- [`CurrencyWidget`](#currencywidget)
- [`DateWidget`](#datewidget)
- [`EmailWidget`](#emailwidget)
- [`PhoneNumberWidget`](#phonenumberwidget)
- [`RadioWidget`](#radiowidget)
- [`SelectWidget`](#selectwidget)
- [`SSNWidget`](#ssnwidget)
- [`TextWidget`](#textwidget)
- [`YesNoWidget`](#yesnowidget)

### `ArrayCountWidget`

Renders a `<input type="number">` HTML element, and is used when determining how many times a group of questions should be rendered. For more information about grouping common questions, see "[Sequential duplicate form groups](./available-form-features-and-usage-guidelines.md#sequential-duplicate-form-groups)."

- **File:** [ArrayCountWidget.jsx](../../src/js/widgets/ArrayCountWidget.jsx)
- **Usage:** In the `uiSchema`, specify `'ui:widget': ArrayCountWidget` for the given field.

### `CheckboxWidget`

Renders a single `<input type="checkbox">` HTML element. For information about rendering multiple checkboxes together, see "[Checkbox Group](./available-form-features-and-usage-guidelines.md#checkbox-group)."

- **File:** [CheckboxWidget.jsx](../../src/js/widgets/CheckboxWidget.jsx)
- **Usage:** Usually the `CheckboxWidget` is not specified directly in the `uiSchema` because it renders by default for a schema that specifies `type: 'boolean'`.

### `CurrencyWidget`

Renders a `<input>` HTML element with some additional logic to handle parsing currency inputs.

- **File:** [CurrencyWidget.jsx](../../src/js/widgets/CurrencyWidget.jsx)
- **Usage:** In the `uiSchema`, specify `'ui:widget': CurrencyWidget` for the given field.

### `DateWidget`

Renders three separate fields for dates, two `<select>` elements for month and day and one `<input>` element for the year.

- **File:** [DateWidget.jsx](../../src/js/widgets/DateWidget.jsx)
- **Usage:** In the `uiSchema`, specify `'ui:widget': 'date'` for the given field.

### `EmailWidget`

Renders a `TextWidget` with the `type: "email"` passed to the `<input>` element.

- **File:** [EmailWidget.jsx](../../src/js/widgets/EmailWidget.jsx)
- **Usage:** In the `uiSchema`, specify `'ui:widget': 'email'` for the given field.

### `PhoneNumberWidget`

Renders a `TextWidget` with additional logic to strip non-numeric characters from the input before saving the input.

- **File:** [PhoneNumberWidget.jsx](../../src/js/widgets/PhoneNumberWidget.jsx)
- **Usage:** In the `uiSchema`, specify `'ui:widget': PhoneNumberWidget` for the given field.

### `RadioWidget`

Renders a single radio button for each `enum` value. This overrides the default `SelectWidget` that is normally rendered where `enum` exists.

- **File:** [RadioWidget.jsx](../../src/js/widgets/RadioWidget.jsx)
- **Usage:** In the `uiSchema`, specify `'ui:widget': 'radio'` for the given field. Usually used with `'ui:options': { labels: {}}` so you can specify the label for each radio button. To see a code example, refer to [radio button group in form features](./available-form-features-and-usage-guidelines.md#radio-button-group).

### `SelectWidget`

Renders a `<select>` HTML element. This is the default widget for data of `type: 'string'` with an `enum` property.

- **File:** [SelectWidget.jsx](../../src/js/widgets/SelectWidget.jsx)
- **Usage:** Usually the `SelectWidget` is not specified directly in the `uiSchema` because it renders by default for a schema that specifies `type: 'string'` with an `enum` property.

### `SSNWidget`

Renders a `TextWidget` with additional logic to strip the dashes before saving the input.

- **File:** [SSNWidget.jsx](../../src/js/widgets/SSNWidget.jsx)
- **Usage:** In the `uiSchema`, specify `'ui:widget': SSNWidget` for the given field.

### `TextWidget`

Renders a `<input>` HTML element, and is the default widget for data of `type: 'string'`.

- **File:** [TextWidget.jsx](../../src/js/widgets/TextWidget.jsx)
- **Usage:** Usually the `TextWidget` is not specified directly in the `uiSchema` because it renders by default for a schema that specifies `type: 'string'`.

### `YesNoWidget`

Renders two radio buttons, one with a value of "Yes" and one with a value of "No".

- **File:** [YesNoWidget.jsx](../../src/js/widgets/YesNoWidget.jsx)
- **Usage:** In the `uiSchema`, specify `'ui:widget': 'yesNo'` for the given field.

[Back to *Building a Form*](./README.md)
