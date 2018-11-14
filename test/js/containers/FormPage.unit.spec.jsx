import React from 'react';
import { expect } from 'chai';
import SkinDeep from 'skin-deep';
import sinon from 'sinon';

import { FormPage } from '../../../src/js/containers/FormPage';

// Build our mock objects
function makeRoute(obj) {
  return Object.assign({
    pageConfig: {
      pageKey: 'testPage',
      schema: {},
      uiSchema: {},
      errorMessages: {},
      title: ''
    },
    pageList: [
      {
        path: '/first-page',
        pageKey: 'firstPage'
      },
      {
        path: '/testing',
        pageKey: 'testPage'
      },
      {
        path: '/next-page',
        pageKey: 'nextPage'
      }
    ]
  }, obj);
}
function makeForm(obj) {
  return Object.assign({
    pages: {
      firstPage: { schema: {}, uiSchema: {} },
      testPage: { schema: {}, uiSchema: {} },
      lastPage: { schema: {}, uiSchema: {} }
    },
    data: {}
  }, obj);
}
function makeArrayForm(obj) {
  return Object.assign({
    pages: {
      testPage: {
        schema: {
          properties: {
            arrayProp: {
              items: [{}]
            }
          }
        },
        uiSchema: {
          arrayProp: {
            items: {}
          }
        }
      }
    },
    data: {
      arrayProp: [{}]
    }
  }, obj);
}

describe('Schemaform <FormPage>', () => {
  // Defaults for most tests; overridden where needed below
  const location = {
    pathname: '/testing'
  };

  it('should render', () => {
    const tree = SkinDeep.shallowRender(
      <FormPage form={makeForm()} route={makeRoute()} location={location}/>
    );

    expect(tree.everySubTree('SchemaForm')).not.to.be.empty;
    expect(tree.everySubTree('ProgressButton').length).to.equal(2);
  });
  describe('should handle', () => {
    let tree;
    let setData;
    let history;
    let onSubmit;
    beforeEach(() => {
      setData = sinon.spy();
      onSubmit = sinon.spy();
      history = {
        push: sinon.spy()
      };

      tree = SkinDeep.shallowRender(
        <FormPage
          history={history}
          setData={setData}
          form={makeForm()}
          onSubmit={onSubmit}
          location={location}
          route={makeRoute()}/>
      );
    });
    it('change', () => {
      const newData = {};
      const instance = tree.getMountedInstance();
      instance.onChange(newData);

      expect(setData.calledWith(newData)).to.be.true;
    });
    it('submit', () => {
      tree.getMountedInstance().onSubmit({});

      expect(history.push.calledWith('/next-page')).to.be.true;
    });
    it('back', () => {
      tree.getMountedInstance().goBack();

      expect(history.push.calledWith('/first-page')).to.be.true;
    });
  });
  it('should go back to the beginning if current page isn\'t found', () => {
    const history = {
      push: sinon.spy()
    };

    const tree = SkinDeep.shallowRender(
      <FormPage
        history={history}
        form={makeForm()}
        route={makeRoute()}
        location={{ pathname: '/missing-page' }}/>
    );

    tree.getMountedInstance().goBack();

    expect(history.push.calledWith('/first-page')).to.be.true;
  });
  it('should not show a Back button on the first page', () => {
    const tree = SkinDeep.shallowRender(
      <FormPage
        form={makeForm()}
        route={makeRoute()}
        location={{ pathname: '/first-page' }}/>
    );

    expect(tree.subTree('ProgressButton').props.buttonText).to.equal('Continue');
  });
  it('should render array page', () => {
    const route = makeRoute({
      pageConfig: {
        pageKey: 'testPage',
        showPagePerItem: true,
        arrayPath: 'arrayProp'
      }
    });
    const form = makeArrayForm();

    const tree = SkinDeep.shallowRender(
      <FormPage
        form={form}
        route={route}
        params={{ index: 0 }}
        location={{ pathname: '/testing/0' }}/>
    );

    expect(tree.subTree('SchemaForm').props.schema).to.equal(form.pages.testPage.schema.properties.arrayProp.items[0]);
    expect(tree.subTree('SchemaForm').props.uiSchema).to.equal(form.pages.testPage.uiSchema.arrayProp.items);
    expect(tree.subTree('SchemaForm').props.data).to.equal(form.data.arrayProp[0]);
  });
  it('should handle change in array page', () => {
    const setData = sinon.spy();
    const route = makeRoute({
      pageConfig: {
        pageKey: 'testPage',
        showPagePerItem: true,
        arrayPath: 'arrayProp'
      }
    });

    const tree = SkinDeep.shallowRender(
      <FormPage
        setData={setData}
        form={makeArrayForm()}
        route={route}
        params={{ index: 0 }}
        location={location}/>
    );

    tree.getMountedInstance().onChange({ test: 2 });

    expect(setData.firstCall.args[0]).to.eql({
      arrayProp: [{ test: 2 }]
    });
  });
  it('should update data when submitting on array page', () => {
    const setData = sinon.spy();
    const route = makeRoute({
      pageConfig: {
        pageKey: 'testPage',
        showPagePerItem: true,
        arrayPath: 'arrayProp'
      }
    });
    const history = {
      push: sinon.spy()
    };

    const tree = SkinDeep.shallowRender(
      <FormPage
        setData={setData}
        history={history}
        form={makeArrayForm()}
        route={route}
        location={{ pathname: '/testing/0' }}
        params={{ index: 0 }}/>
    );

    tree.getMountedInstance().onSubmit({ formData: { test: 2 } });

    expect(setData.firstCall.args[0]).to.eql({
      arrayProp: [{ test: 2 }]
    });
  });
});
