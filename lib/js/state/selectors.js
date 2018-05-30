export var getFormData = function getFormData(state) {
  return state.form.data;
};
export var getFormPages = function getFormPages(state) {
  return state.form.pages;
};
export var getSubmission = function getSubmission(state) {
  return state.form.submission;
};
export var getReviewPageOpenChapters = function getReviewPageOpenChapters(state) {
  return state.form.reviewPageView.openChapters;
};
export var getViewedPages = function getViewedPages(state) {
  return state.form.reviewPageView.viewedPages;
};