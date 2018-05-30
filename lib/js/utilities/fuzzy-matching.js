import fastLevenshtein from 'fast-levenshtein';

export default function sortListByFuzzyMatch(value, list) {
  var prop = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'label';

  return list.map(function (option) {
    var label = option[prop].toUpperCase().replace(/[^a-zA-Z ]/g, '');
    var val = value.toUpperCase().replace(/[^a-zA-Z ]/g, '');
    var score = label.includes(val) ? 0 : Infinity;

    // if the search term is just one word, split the
    // list into words and find the best match
    if (score > 0 && !val.includes(' ')) {
      score = Math.min.apply(null, label.split(/[ ,]/).map(function (word) {
        return fastLevenshtein.get(word, val);
      }).filter(function (wordScore) {
        return wordScore < val.length;
      }));
    } else if (score > 0) {
      score = fastLevenshtein.get(label, val);
    }

    return {
      score: score,
      original: option
    };
  }).sort(function (a, b) {
    var result = a.score - b.score;

    if (result === 0) {
      return a.original[prop].length - b.original[prop].length;
    }

    return result;
  }).map(function (sorted) {
    return sorted.original;
  });
}