# Common widgets

These common widgets are included in the us-forms-system by default. Set these widgets in a config file while building your form.

Some widgets are associated with particular schema types or formats. There are additional widgets available, but the us-forms-system uses definitions they're included in, rather than just the field. To use a widget, set `ui:widget` for a field to the name of the widget. Widgets are located in [/src/js/widgets](../../src/js/widgets).

Some widgets are passed as a string (e.g., `'ui: widget': 'date'`), while others are passed as the component itself (e.g., `'ui:widget': CurrencyWidget`).
- Widgets from the [react-jsonschema-form library](./about-the-us-forms-system-library#understanding-react-jsonschema-form-rjsf) include string mappings.
- Widgets created specifically for US Forms System do not have these mappings, and therefore must be specified by passing the component for the widget directly to the config.

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

- File: [ArrayCountWidget.jsx](src/js/widgets/ArrayCountWidget.jsx)
- Description: Renders a `<input type="number">` HTML element, and is used when determining how many times a group of questions should be rendered. For more information on when you might have groups of common questions, see [Sequential duplicate form groups](./available-form-features-and-usage-guidelines#radio-button-group#sequential-duplicate-form-groups).
- Usage: In the `uiSchema`, specify `'ui:widget': ArrayCountWidget` for the given field.

### `CheckboxWidget`

- File: [CheckboxWidget.jsx](src/js/widgets/CheckboxWidget.jsx)
- Description: Renders a single `<input type="checkbox">` HTML element. Refer to this description of [checkbox groups](./available-form-features-and-usage-guidelines#radio-button-group#checkbox-group) for information on how to render multiple checkboxes together for a single question.
- Usage: Usually the `CheckboxWidget` is not specified directly in the `uiSchema` because it renders by default for a schema that specifies `type: 'boolean'`.

### `CurrencyWidget`

- File: [CurrencyWidget.jsx](src/js/widgets/CurrencyWidget.jsx)
- Description: Renders a `<input>` HTML element with some additional logic to handle parsing currency inputs.
- Usage: In the `uiSchema`, specify `'ui:widget': CurrencyWidget` for the given field.

### `DateWidget`

- File: [DateWidget.jsx](src/js/widgets/DateWidget.jsx)
- Description:  Renders 3 separate fields for dates, 2 `<select>` elements for month and day and 1 `<input>` element for the year.
- Usage: In the `uiSchema`, specify `'ui:widget': 'date'` for the given field.

### `EmailWidget`

- File: [EmailWidget.jsx](src/js/widgets/EmailWidget.jsx)
- Description: Renders a `TextWidget` with the `type: "email"` passed to the `<input>` element.
- Usage: In the `uiSchema`, specify `'ui:widget': 'email'` for the given field.

### `PhoneNumberWidget`

- File: [PhoneNumberWidget.jsx](src/js/widgets/PhoneNumberWidget.jsx)
- Description: Renders a `TextWidget` with some additional logic to strip non-numeric characters from the input before saving the input.
- Usage: In the `uiSchema`, specify `'ui:widget': PhoneNumberWidget` for the given field.

### `RadioWidget`

- File: [RadioWidget.jsx](src/js/widgets/RadioWidget.jsx)
- Description: Renders a single radio button for each `enum` value. This will override the default `SelectWidget` that is normally rendered where `enum` exists.
- Usage: In the `uiSchema`, specify `'ui:widget': 'radio'` for the given field. Usually used with `'ui:options': { labels: {}}` so you can specify the label for each radio button. To see a code example, refer to [radio button group in form features](./available-form-features-and-usage-guidelines#radio-button-group).

### `SelectWidget`

- File: [SelectWidget.jsx](src/js/widgets/SelectWidget.jsx)
- Description: Renders a `<select>` HTML element, and is the default widget for data of `type: 'string'` with an `enum` property.
- Usage: Usually the `SelectWidget` is not specified directly in the `uiSchema` because it renders by default for a schema that specifies `type: 'string'` with an `enum` property.

### `SSNWidget`

- File: [SSNWidget.jsx](src/js/widgets/SSNWidget.jsx)
- Description: Renders a `TextWidget` with some additional logic to strip the dashes from the input before saving the input.
- Usage: In the `uiSchema`, specify `'ui:widget': SSNWidget` for the given field.

### `TextWidget`

- File: [TextWidget.jsx](src/js/widgets/TextWidget.jsx)
- Description: Renders a `<input>` HTML element, and is the default widget for data of `type: 'string'`.
- Usage: Usually the `TextWidget` is not specified directly in the `uiSchema` because it renders by default for a schema that specifies `type: 'string'`.

### `YesNoWidget`

- File: [YesNoWidget.jsx](src/js/widgets/YesNoWidget.jsx)
- Description: Renders two radio buttons, one with a value of "Yes" and one with a value of "No".
- Usage: In the `uiSchema`, specify `'ui:widget': 'yesNo'` for the given field.
