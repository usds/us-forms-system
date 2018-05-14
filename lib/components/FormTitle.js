import React from 'react';

export default function FormTitle(_ref) {
  var title = _ref.title,
      subTitle = _ref.subTitle;

  return React.createElement(
    "div",
    { className: "schemaform-title" },
    React.createElement(
      "h1",
      null,
      title
    ),
    subTitle && React.createElement(
      "div",
      { className: "schemaform-subtitle" },
      subTitle
    )
  );
}