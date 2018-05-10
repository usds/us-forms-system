import React from 'react';

export default function ProgressBar(_ref) {
  var percent = _ref.percent;

  return React.createElement(
    "div",
    { className: "progress-bar", role: "progressbar", "aria-valuenow": percent, "aria-valuemin": "0", "aria-valuemax": "100", tabIndex: "0" },
    React.createElement("div", { className: "progress-bar-inner", style: { width: percent + "%" } })
  );
}