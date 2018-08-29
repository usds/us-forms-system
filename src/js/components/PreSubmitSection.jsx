import PropTypes from 'prop-types';
import React from 'react';
import ErrorableCheckbox from './ErrorableCheckbox';

export function PreSubmitSection({ onChange, showError, preSubmitInfo, form }) {
  const info = preSubmitInfo || {};
  const field = info.field || 'AGREED';

  return (
    <div>
      {info.notice}
      {info.required &&
        <ErrorableCheckbox required
          checked={form.data[field]}
          onValueChange={onChange}
          name={field}
          errorMessage={showError && !form.data[field] ? (info.error || 'Please agree before continuing') : undefined}
          label={info.label}/>
      }
    </div>
  );
}

PreSubmitSection.propTypes = {
  form: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  preSubmitInfo: PropTypes.object,
  showError: PropTypes.bool
};
