# Schemaform walkthrough

## Multi-page forms

The way we organize large forms is into chapters and pages. Each chapter is a collection of pages. Each page is rendered as a single rjsf form and has a schema and uiSchema. All of the chapter and page organization is described in a form config file. We generate a list of routes from the config file and a user can move through the list of pages until they reach the review page.

The review page also takes the config file and renders each chapter in an accordion panel. Inside each panel we render each page using rjsf with two sets of widgets, so that we can show a "read-only" view. The read-only view uses simplified widgets and different `FieldTemplate` to render each form field in a definition list. The rjsf `Form` component is still being used, but there are no input elements being used; widgets render text instead. When a user clicks Edit for a form page on the review page, the normal widgets are used and a normal form is rendered.

Array fields work slightly differently on the review page. Because we want to render each array item read only and allow individual items to be editing independently, the review `ArrayField` component renders each item in the array as it's own rjsf `Form`. Array fields are also pulled out of the read only view for the page they're on and shown separately.
