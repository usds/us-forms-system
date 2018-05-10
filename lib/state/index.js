import { createInitialState } from '../state/helpers';
import reducers from '../state/reducers';

export default function createSchemaFormReducer(formConfig) {
  var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : createInitialState(formConfig);
  var formReducers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : reducers;

  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    var reducer = formReducers[action.type];

    if (reducer) {
      return reducer(state, action);
    }

    return state;
  };
}