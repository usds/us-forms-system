import _assign from 'lodash/assign';


export default function nonRequiredFullName(fullName) {
  return _assign({}, fullName, {
    required: []
  });
}