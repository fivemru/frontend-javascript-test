'use strict';

// Yor code here ...
function dscount(str, ...chunks) {
  const strLowered = str.toLowerCase();
  const search = chunks.map(s => s.toLowerCase()).join('');
  let offset = 0;
  let count = 0;
  while ((offset = strLowered.indexOf(search, offset)) !== -1) {
    count += 1;
    offset += 1;
  }
  return count;
}

// Для удобства можно использовать эти тесты:
try {
  test(dscount, ['ab___ab__', 'a', 'b'], 2);
  test(dscount, ['___cd____', 'c', 'd'], 1);
  test(dscount, ['de_______', 'd', 'e'], 1);
  test(dscount, ['12_12__12', '1', '2'], 3);
  test(dscount, ['_ba______', 'a', 'b'], 0);
  test(dscount, ['_a__b____', 'a', 'b'], 0);
  test(dscount, ['-ab-аb-ab', 'a', 'b'], 2);
  test(dscount, ['aAa', 'a', 'a'], 2);

  console.info('Congratulations! All tests passed.');
} catch (e) {
  console.error(e);
}

// Простая функция тестирования
function test(call, args, count, n) {
  let r = call.apply(n, args) === count;
  console.assert(r, `Found items count: ${count}`);
  if (!r) throw 'Test failed!';
}
