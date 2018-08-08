import PropTypes from 'prop-types';
import React from 'react';
import ErrorableCheckbox from './ErrorableCheckbox';

// formConfig.preSubmitInfo = {
//  fieldName: '',  // name of agreement field in form, e.g. 'privacyAgreementAccepted'
//  notice: '',     // HTML and/or React components placed above checkbox
//  label: '',      // Text used for checkbox label, e.g. 'I accept the privacy agreement'
//  error: '',      // Shown if they submit without checking the box
// }
//
export function PreSubmitSection({ onChange, checked, showError, preSubmitInfo }) {
  return (
    <div>
      {preSubmitInfo.notice || ''}
      {preSubmitInfo.label &&
        <ErrorableCheckbox required
          checked={checked}
          onValueChange={onChange}
          name={preSubmitInfo.fieldName}
          errorMessage={showError && !checked ? (preSubmitInfo.error || 'Please check before continuing') : undefined}
          label={preSubmitInfo.label}/>
      }
    </div>
  );
}

PreSubmitSection.propTypes = {
  preSubmitInfo: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired
};
