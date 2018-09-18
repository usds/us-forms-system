import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router';
import Scroll from 'react-scroll';
import _ from 'lodash/fp';
// import classNames from 'classnames';

// import ProgressButton from '../components/ProgressButton';
import SchemaForm from '../components/SchemaForm';
import { setData, uploadFile } from '../actions';
// import { getNextPagePath, getPreviousPagePath } from '../routing';
import { focusElement } from '../utilities/ui';

function focusForm() {
  focusElement('.nav-header');
}

const scroller = Scroll.scroller;
const scrollToTop = () => {
  scroller.scrollTo('topScrollElement', window.Forms.scroll || {
    duration: 500,
    delay: 0,
    smooth: true,
  });
};

class FormPage extends React.Component {
  componentDidMount() {
    if (!this.props.blockScrollOnMount) {
      scrollToTop();
      focusForm();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.route.pageConfig.pageKey !== this.props.route.pageConfig.pageKey ||
      _.get('params.index', prevProps) !== _.get('params.index', this.props)) {
      scrollToTop();
      focusForm();
    }
  }

  onChange = (formData) => {
    let newData = formData;
    if (this.props.route.pageConfig.showPagePerItem) {
      // If this is a per item page, the formData object will have data for a particular
      // row in an array, so we need to update the full form data object and then call setData
      newData = _.set([this.props.route.pageConfig.arrayPath, this.props.params.index], formData, this.props.form.data);
    }
    this.props.setData(newData);
    this.props.onPageChange(newData);
  }

  render() {
    const {
      route,
      params,
      form,
      // contentAfterButtons,
      formContext
    } = this.props;

    let {
      schema,
      uiSchema
    } = form.pages[route.pageConfig.pageKey];

    // const pageClasses = classNames('form-panel', route.pageConfig.pageClass);
    let data = form.data;

    if (route.pageConfig.showPagePerItem) {
      // Instead of passing through the schema/uiSchema to SchemaForm, the
      // current item schema for the array at arrayPath is pulled out of the page state and passed
      schema = schema.properties[route.pageConfig.arrayPath].items[params.index];
      // Similarly, the items uiSchema and the data for just that particular item are passed
      uiSchema = uiSchema[route.pageConfig.arrayPath].items;
      // And the data should be for just the item in the array
      data = _.get([route.pageConfig.arrayPath, params.index], data);
    }
    // It should be "safe" to check that this is the first page because it is
    // always eligible and enabled, no need to call getPreviousPagePath.
    // const isFirstRoutePage = route.pageList[0].path === this.props.location.pathname;

    return (
      <SchemaForm
        name={route.pageConfig.pageKey}
        title={route.pageConfig.title}
        data={data}
        schema={schema}
        uiSchema={uiSchema}
        pagePerItemIndex={params ? params.index : undefined}
        formContext={formContext}
        uploadFile={this.props.uploadFile}
        onChange={this.onChange}
        onSubmit={this.props.onSubmit}/>
    );
  }
}

function mapStateToProps(state) {
  return {
    form: state.form,
    user: state.user
  };
}

const mapDispatchToProps = {
  setData,
  uploadFile
};

FormPage.propTypes = {
  form: PropTypes.object.isRequired,
  route: PropTypes.shape({
    pageConfig: PropTypes.shape({
      pageKey: PropTypes.string.isRequired,
      schema: PropTypes.object.isRequired,
      uiSchema: PropTypes.object.isRequired
    }),
    pageList: PropTypes.arrayOf(PropTypes.shape({
      path: PropTypes.string.isRequired
    }))
  }),
  contentAfterButtons: PropTypes.element,
  setData: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(FormPage);

export { FormPage };
