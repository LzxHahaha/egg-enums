'use strict';

const intReg = /^-?\d+$/;

const proxyHandler = {
  get: (target, name) => {
    const isOwnProp = target.hasOwnProperty(name);
    if (intReg.test(name) && isOwnProp) {
      return target[name];
    }
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
      Object.defineProperty(enums, index, { get: () => el });
    });
  } else {
    Object.getOwnPropertyNames(input).forEach(el => {
      Object.defineProperty(enums, el, { get: () => input[el] });
      if (typeof input[el] === 'number' || typeof input[el].id === 'number') {
        const id = input[el].hasOwnProperty('id') ? input[el].id : input[el];
        Object.defineProperty(enums, id, { get: () => input[el] });
      }
    });
  }

  return new Proxy(enums, proxyHandler);
};
