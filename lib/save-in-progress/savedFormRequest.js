import merge from 'lodash/fp/merge';

import environment from '../../helpers/environment';

function isJson(response) {
  var contentType = response.headers.get('content-type');
  return contentType && contentType.indexOf('application/json') !== -1;
}

// TODO: Remove this and replace with apiRequest once olive leaf issue is resolved on back end.
export function savedFormRequest(resource, success, error) {
  var optionalSettings = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var baseUrl = environment.API_URL + '/v0';
  var url = resource[0] === '/' ? [baseUrl, resource].join('') : resource;

  var defaultSettings = {
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + sessionStorage.userToken
    }
  };

  var settings = merge(defaultSettings, optionalSettings);
  return fetch(url, settings).then(function (response) {
    var data = isJson(response) ? response.json() : Promise.resolve(response);

    if (!response.ok) {
      // Refresh to show login view when requests are unauthorized.
      if (response.status === 401) {
        return window.location.reload();
      }
      return data.then(Promise.reject.bind(Promise));
    }

    return data;
  }).then(success, error);
}