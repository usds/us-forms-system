## Form config

## I want to skip / conditionally include a page based on some information

We use the `depends` property on the page to determine whether the page is active or not. For example, your chapter config might look like this:
```js
chapterName: {
  title: 'Chapter Title',
  pages: {
    pageName: {
      ...
      schema: {
        type: 'object',
        properties: {
          passPhrase: { type: 'string' }
        }
      }
    }
    otherPageName: {
      title: 'Page title',
      path: 'path/to/page',
      initialData: {},
      depends: {
        passPhrase: 'open sesame'
      },
      uiSchema: {},
      schema: {}
    }
  }
}
```
If you then enter 'open sesame' for the `passPhrase` on the first page, `otherPageName` will be active. If you enter anything else (or nothing), `otherPageName` won't be active, and the page will be skipped.

`depends` can work in a few ways:
```js
// With an object
depends: {
  passPhrase: 'open sesame'
}

// With an array
// This will activate the page if any of the items in the array are true. Think || not &&.
depends: [
  { passPhrase: 'open sesame' },
  { passPhrase: 'open up!' }
]

// With a function
depends: (formData) => {
  // return bool, true if page is active, false if page should be skipped
  return formData.passPhrase === 'open sesame' && formData.codeWord === 'chicken';
}
```
