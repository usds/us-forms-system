import PropTypes from 'prop-types';
import React from 'react';
import ErrorableCheckbox from './ErrorableCheckbox';

// formConfig.preSubmitInfo = {
//
//  notice: '',     // HTML and/or React components placed above checkbox (or Submit)
//  required: false,  // Show the checkbox
//  field: '',      // Name of agreement field in form, e.g. 'privacyAgreementAccepted'
//  label: '',      // Text used for checkbox label, e.g. 'I accept the privacy agreement'
//  error: '',      // Shown if they submit without checking the box
// }
//
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
