import React from 'react';

function AskVAQuestions(props) {
  return React.createElement(
    "div",
    { className: "row" },
    React.createElement(
      "div",
      { className: "usa-width-two-thirds medium-8 columns" },
      React.createElement(
        "div",
        { className: "help-footer-box" },
        React.createElement(
          "h2",
          { className: "help-heading" },
          "Need help?"
        ),
        props.children,
        React.createElement(
          "p",
          { className: "help-talk" },
          "To report a problem with this form,",
          React.createElement("br", null),
          "please call the Vets.gov Technical Help Desk:"
        ),
        React.createElement(
          "p",
          { className: "help-phone-number" },
          React.createElement(
            "a",
            { className: "help-phone-number-link", href: "tel:+1-855-574-7286" },
            "1-855-574-7286"
          ),
          React.createElement("br", null),
          "TTY: ",
          React.createElement(
            "a",
            { className: "help-phone-number-link", href: "tel:+18008778339" },
            "1-800-877-8339"
          ),
          React.createElement("br", null),
          "Monday \u2013 Friday, 8:00 a.m. \u2013 8:00 p.m. (ET)"
        )
      )
    )
  );
}

export default AskVAQuestions;