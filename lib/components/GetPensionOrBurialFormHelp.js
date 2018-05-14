import React from 'react';

function GetFormHelp() {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "p",
      { className: "help-talk" },
      "For benefit related questions please call:"
    ),
    React.createElement(
      "p",
      { className: "help-phone-number" },
      React.createElement(
        "a",
        { className: "help-phone-number-link", href: "tel:+1-800-827-1000" },
        "1-800-827-1000"
      ),
      React.createElement("br", null),
      "Telecommunications Relay Service (TRS): dial ",
      React.createElement(
        "a",
        { className: "help-phone-number-link", href: "tel:711" },
        "711"
      ),
      ", Monday \u2013 Friday, 8:00 a.m. \u2013 9:00 p.m. (ET)."
    )
  );
}

export default GetFormHelp;