'use strict';
const proxyHandler = {
  get: (target, name) => {
    const isOwnProp = target.hasOwnProperty(name);
    const keys = name.split('.');
    let value;
    for (let i = 0; i < keys.length; i++) {
      value = target[keys[i]];
      target = value;
    }
    return value instanceof Object && isOwnProp ? value.id : value;
  },
};
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

  return new Proxy(enums, proxyHandler);
};
