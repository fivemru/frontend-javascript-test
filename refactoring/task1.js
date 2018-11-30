'use strict';

// Yor code here ...
function refactored(str, ...rest) {
  const positions = rest.map(search => str.lastIndexOf(search));
  return Math.max(...positions);
}

function func(s, a, b) {
  if (s.match(/^$/)) {
    return -1;
  }

  var i = s.length - 1;
  var aIndex = -1;
  var bIndex = -1;

  while (aIndex == -1 && bIndex == -1 && i > 0) {
    if (s.substring(i, i + 1) == a) {
      aIndex = i;
    }
    if (s.substring(i, i + 1) == b) {
      bIndex = i;
    }
    i = i - 1;
  }

  if (aIndex != -1) {
    if (bIndex == -1) {
      return aIndex;
    } else {
      return Math.max(aIndex, bIndex);
    }
  }

  if (bIndex != -1) {
    return bIndex;
  } else {
    return -1;
  }
}

// Для удобства можно использовать эти тесты:
try {
  test(['ab___ab__', 'a', 'b'], func, refactored);
  test(['___cd____', 'c', 'd'], func, refactored);
  test(['de_______', 'd', 'e'], func, refactored);
  test(['', 'd', 'e'], func, refactored);
  test(['12_12__12', '1', '2'], func, refactored);
  test(['_ba______', 'a', 'b'], func, refactored);
  test(['_a__b____', 'a', 'b'], func, refactored);
  test(['-ab-аb-ab', 'a', 'b'], func, refactored);
  test(['aAa', 'a', 'a'], func, refactored);

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
