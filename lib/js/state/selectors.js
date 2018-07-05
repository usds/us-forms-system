"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getFormData = exports.getFormData = function getFormData(state) {
  return state.form.data;
};
var getFormPages = exports.getFormPages = function getFormPages(state) {
  return state.form.pages;
};
var getSubmission = exports.getSubmission = function getSubmission(state) {
  return state.form.submission;
};
var getReviewPageOpenChapters = exports.getReviewPageOpenChapters = function getReviewPageOpenChapters(state) {
  return state.form.reviewPageView.openChapters;
};
var getViewedPages = exports.getViewedPages = function getViewedPages(state) {
  return state.form.reviewPageView.viewedPages;
};
//# sourceMappingURL=selectors.js.map