import React from 'react';
import classNames from 'classnames';

export default function TitleField(_ref) {
  var id = _ref.id,
      title = _ref.title;

  var isRoot = id === 'root__title';

  var classes = classNames('schemaform-block-title', {
    'schemaform-block-subtitle': !isRoot
  });

  return React.createElement(
    'legend',
    { className: classes, id: id },
    title
  );
}