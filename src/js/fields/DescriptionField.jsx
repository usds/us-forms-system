import React from 'react';
import PropTypes from 'prop-types';

function DescriptionField(props) {
  const { description, ...rest } = props;
  if (!description) {
    return null;
  }
  if (typeof description === 'string') {
    return (
      <p>
        {description}
      </p>
    );
  } else if (typeof description === 'function') {
    const Description = description;
    return (<Description {...rest}/>);
  }
  return (
    <div>
      {description}
    </div>
  );
}

DescriptionField.propTypes = {
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.element]).isRequired,
  formContext: PropTypes.object,
  formData: PropTypes.object,
  options: PropTypes.object,
};

export default DescriptionField;
