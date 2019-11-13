'use strict';

const intReg = /^-?\d+$/;

const proxyHandler = {
  get: (target, name) => {
    const isOwnProp = target.hasOwnProperty(name);
    if (intReg.test(name) && isOwnProp) {
      return target[name];
    }
    if (name === '$keys') {
      return target.$keys;
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
  enums.$keys = [];
  if (input instanceof Array) {
    input.forEach((el, index) => {
      Object.defineProperty(enums, el, {
        get: () => index,
        enumerable: true,
      });
      Object.defineProperty(enums, index, {
        get: () => el,
        enumerable: false,
      });
      enums.$keys.push({ id: index, key: el });
    });
  } else {
    Object.getOwnPropertyNames(input).forEach(el => {
      Object.defineProperty(enums, el, {
        get: () => input[el],
        enumerable: true,
      });

      if (typeof input[el] !== 'number' && (!input[el].hasOwnProperty('id') || typeof input[el].id !== 'number')) {
        throw new Error(`Enum ${el} should have a numeric type id`);
      }

      const id = input[el].hasOwnProperty('id') ? input[el].id : input[el];
      Object.defineProperty(enums, id, {
        get: () => input[el],
        enumerable: false,
      });

      if (input instanceof Object) {
        enums.$keys.push(Object.assign({ id, key: el }, input[el]));
      }
    });
  }

  return new Proxy(enums, proxyHandler);
};
