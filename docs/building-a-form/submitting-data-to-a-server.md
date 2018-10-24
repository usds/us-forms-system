:book: [*US Forms System Documentation*](../README.md) :arrow_right: [*Building a Form*](./README.md)

# Submitting data to a server

The final page of the form contains a Submit button to send the form data to a server. USFS provides several configuration options to specify how and where the data is submitted.

By default, USFS encodes and sends form data as a JSON-encoded string to the server. If this default works for your server, just set the submit URL string using `formConfig.submitUrl`. You can also process the form data before it is sent using the function `formConfig.transformForSubmit(formConfig, formData)` which should return a string with the form data's JSON representation.

For cases where the server cannot accept JSON, use a custom submit function to convert the data into the form needed by the server. The function `formConfig.submit(formData, formConfig)` must return a JavaScript `Promise` that resolves when the form has been successfully transmitted to the server, or rejects if an error occurs.

For the implementation of these features that can be used as examples for building custom submit functions, see `/src/js/actions.js`.
