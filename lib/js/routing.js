'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _findIndex2 = require('lodash/fp/findIndex');

var _findIndex3 = _interopRequireDefault(_findIndex2);

exports.getNextPagePath = getNextPagePath;
exports.getPreviousPagePath = getPreviousPagePath;

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Returns the page list without conditional pages that have not satisfied
 * their dependencies and therefore should be skipped.
 */
function getEligiblePages(pageList, data, pathname) {
  var eligiblePageList = (0, _helpers.getActiveExpandedPages)(pageList, data);
  var pageIndex = (0, _findIndex3.default)(function (item) {
    return item.path === pathname;
  }, eligiblePageList);
  return { pages: eligiblePageList, pageIndex: pageIndex };
}

function getNextPagePath(pageList, data, pathname) {
  var _getEligiblePages = getEligiblePages(pageList, data, pathname),
      pages = _getEligiblePages.pages,
      pageIndex = _getEligiblePages.pageIndex;

  return pages[pageIndex + 1].path;
}

function getPreviousPagePath(pageList, data, pathname) {
  var _getEligiblePages2 = getEligiblePages(pageList, data, pathname),
      pages = _getEligiblePages2.pages,
      pageIndex = _getEligiblePages2.pageIndex;
  // if we found the current page, go to previous one
  // if not, go back to the beginning because they shouldn’t be here


  var page = pageIndex >= 0 ? pageIndex - 1 : 0;
  return pages[page].path;
}
//# sourceMappingURL=routing.js.map