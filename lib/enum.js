'use strict';

module.exports = input => {
  const enums = {};
  if (input instanceof Array) {
    input.forEach((el, index) => {
      Object.defineProperty(enums, el, { get: () => index });
    });
  } else {
    Object.getOwnPropertyNames(input).forEach(el => {
      Object.defineProperty(enums, el, { get: () => input[el] });
    });
  }

  return enums;
};
