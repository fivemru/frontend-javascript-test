'use strict';

// Yor code here ...
function refactored(vote, maxStar = 5) {
  const filled = '★';
  const blank = '☆';
  const showStar = Math.ceil((vote * maxStar) / 100) || 1;
  return `${filled.repeat(showStar)}${blank.repeat(maxStar - showStar)}`;
}

function drawRating(vote) {
  if (vote >= 0 && vote <= 20) {
    return '★☆☆☆☆';
  } else if (vote > 20 && vote <= 40) {
    return '★★☆☆☆';
  } else if (vote > 40 && vote <= 60) {
    return '★★★☆☆';
  } else if (vote > 60 && vote <= 80) {
    return '★★★★☆';
  } else if (vote > 80 && vote <= 100) {
    return '★★★★★';
  }
}

// Для удобства можно использовать эти тесты:
try {
  test([0], drawRating, refactored);
  test([1], drawRating, refactored);
  test([20], drawRating, refactored);
  test([21], drawRating, refactored);
  test([50], drawRating, refactored);
  test([59], drawRating, refactored);
  test([60], drawRating, refactored);
  test([61], drawRating, refactored);
  test([99], drawRating, refactored);
  test([100], drawRating, refactored);

  console.info('Congratulations! All tests passed.');
} catch (e) {
  console.error(e);
}

// Простая функция тестирования
function test(args, ...fns) {
  const results = fns.map(fn => fn.apply(null, args));
  const r = results.every((v, i, a) => v === a[0]);
  console.assert(r, `compare with args: ${args}, results: ${results}!`);
  if (!r) throw 'Test failed!';
}
