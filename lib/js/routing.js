import _findIndex from 'lodash/fp/findIndex';

import { expandArrayPages, getActivePages } from './helpers';

/*
 * Returns the page list without conditional pages that have not satisfied
 * their dependencies and therefore should be skipped.
 */
function getEligiblePages(pageList, data, pathname) {
  // Any `showPagePerItem` pages are expanded to create items for each array item.
  // We update the `path` for each of those pages to replace `:index` with the current item index.
  var expandedPageList = expandArrayPages(pageList, data);
  var eligiblePageList = getActivePages(expandedPageList, data);
  var pageIndex = _findIndex(function (item) {
    return item.path === pathname;
  }, eligiblePageList);
  return { pages: eligiblePageList, pageIndex: pageIndex };
}

export function getNextPagePath(pageList, data, pathname) {
  var _getEligiblePages = getEligiblePages(pageList, data, pathname),
      pages = _getEligiblePages.pages,
      pageIndex = _getEligiblePages.pageIndex;

  return pages[pageIndex + 1].path;
}

export function getPreviousPagePath(pageList, data, pathname) {
  var _getEligiblePages2 = getEligiblePages(pageList, data, pathname),
      pages = _getEligiblePages2.pages,
      pageIndex = _getEligiblePages2.pageIndex;
  // if we found the current page, go to previous one
  // if not, go back to the beginning because they shouldn’t be here


  var page = pageIndex >= 0 ? pageIndex - 1 : 0;
  return pages[page].path;
}