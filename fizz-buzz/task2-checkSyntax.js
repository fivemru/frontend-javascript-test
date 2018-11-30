'use strict';

// Yor code here ...
const pairs = { '<': '>', '[': ']', '{': '}', '(': ')' };

function checkSyntax(str) {
  const stack = [];
  const opened = Object.keys(pairs);
  const closed = Object.values(pairs);
  // correct sequence
  const incorrectSequence = str.split('').some(c => {
    const lastOpened = stack[stack.length - 1];
    // closing symbol, correct pair
    if (lastOpened && c === pairs[lastOpened]) {
      stack.pop();
    }
    // closing symbol, incorrect pair
    else if (lastOpened && closed.includes(c)) {
      return true;
    }
    // opening symbol
    else if (opened.includes(c)) {
      stack.push(c);
    }
  });
  return stack.length > 0 || incorrectSequence ? 1 : 0;
}

// Для удобства можно использовать эти тесты:
try {
  test(checkSyntax, ['---(++++)----'], 0);
  test(checkSyntax, [''], 0);
  test(checkSyntax, ['before ( middle []) after '], 0);
  test(checkSyntax, [') ('], 1);
  test(checkSyntax, ['} {'], 1);
  test(checkSyntax, ['<(   >)'], 1);
  test(checkSyntax, ['(  [  <>  ()  ]  <>  )'], 0);
  test(checkSyntax, ['   (      [)'], 1);
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
