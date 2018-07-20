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
- Usage: In the `uiSchema`, specify `'ui:widget': ArrayCountWidget` for the given field.

### `CheckboxWidget`

- File: [CheckboxWidget.jsx](src/js/widgets/CheckboxWidget.jsx)
- Usage: Default widget for a schema that specifies `type: 'boolean'`.

### `CurrencyWidget`

- File: [CurrencyWidget.jsx](src/js/widgets/CurrencyWidget.jsx)
- Usage: In the `uiSchema`, specify `'ui:widget': CurrencyWidget` for the given field.

### `DateWidget`

- File: [DateWidget.jsx](src/js/widgets/DateWidget.jsx)
- Usage: In the `uiSchema`, specify `'ui:widget': 'date'` for the given field.

### `EmailWidget`

- File: [EmailWidget.jsx](src/js/widgets/EmailWidget.jsx)
- Usage: In the `uiSchema`, specify `'ui:widget': 'email'` for the given field.

### `PhoneNumberWidget`

- File: [PhoneNumberWidget.jsx](src/js/widgets/PhoneNumberWidget.jsx)
- Usage: In the `uiSchema`, specify `'ui:widget': PhoneNumberWidget` for the given field.

### `RadioWidget`

- File: [RadioWidget.jsx](src/js/widgets/RadioWidget.jsx)
- Usage: In the `uiSchema`, specify `'ui:widget': 'radio'` for the given field.

### `SelectWidget`

- File: [SelectWidget.jsx](src/js/widgets/SelectWidget.jsx)
- Usage: Default widget for a schema that specifies `type: 'string'` with an `enum` property.

### `SSNWidget`

- File: [SSNWidget.jsx](src/js/widgets/SSNWidget.jsx)
- Usage: In the `uiSchema`, specify `'ui:widget': SSNWidget` for the given field.

### `TextWidget`

- File: [TextWidget.jsx](src/js/widgets/TextWidget.jsx)
- Usage: Default widget for a schema that specifies `type: 'string'`.

### `YesNoWidget`

- File: [YesNoWidget.jsx](src/js/widgets/YesNoWidget.jsx)
- Usage: In the `uiSchema`, specify `'ui:widget': 'yesNo'` for the given field.
