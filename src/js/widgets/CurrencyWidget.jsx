import React from 'react';
import classnames from 'classnames';

export default class CurrencyWidget extends React.Component {
  constructor(props) {
    super(props);
    let value = props.value;
    if (typeof value === 'number') {
      value = value.toFixed(2);
    }
    this.state = {
      value
    };
  }

  onBlur = () => {
    this.props.onBlur(this.props.id);
  }

  handleChange = (event) => {
    const val = event.target.value;
    if (val === '' || typeof val === 'undefined') {
      this.props.onChange();
    } else {
      // Needs to look like a currency
      if (!/^\${0,1}[0-9,]*(\.\d{1,2})?$/.test(val)) {
        this.props.onChange(val);
      } else {
        // Needs to parse as a number
        const parsed = parseFloat(val.replace(/[^0-9.]/g, ''));
        if (!isNaN(parsed)) {
          this.props.onChange(parsed);
        } else {
          this.props.onChange(val);
        }
      }
    }
    this.setState({ value: val });
  }

  render() {
    const { id, disabled, options } = this.props;
    const value = this.state.value;

    return (
      <input
        autoComplete={options.autocomplete || null}
        type="text"
        id={id}
        name={id}
        disabled={disabled}
        autoComplete={options.autocomplete || null}
        className={classnames(this.props.options.widgetClassNames)}
        value={typeof value === 'undefined' ? '' : value}
        onBlur={this.onBlur}
        onChange={this.handleChange}/>
    );
  }
}
