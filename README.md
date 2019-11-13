# egg-enums

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-enums.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-enums
[travis-image]: https://img.shields.io/travis/LzxHahaha/egg-enums.svg?style=flat-square
[travis-url]: https://travis-ci.org/LzxHahaha/egg-enums
[codecov-image]: https://img.shields.io/codecov/c/github/LzxHahaha/egg-enums.svg?style=flat-square
[codecov-url]: https://codecov.io/github/LzxHahaha/egg-enums?branch=master
[david-image]: https://img.shields.io/david/LzxHahaha/egg-enums.svg?style=flat-square
[david-url]: https://david-dm.org/LzxHahaha/egg-enums
[snyk-image]: https://snyk.io/test/npm/egg-enums/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-enums
[download-image]: https://img.shields.io/npm/dm/egg-enums.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-enums

<!--
Description here.
-->

## Install

```bash
$ npm i egg-enums --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.enums = {
  enable: true,
  package: 'egg-enums',
};
```

## Configuration

**There is nothing you need to config.**

## Example

```js
// {app_root}/app/enums/letters.js
// use array to init enum
// each item's index can be used to find the item
module.exports = app => app.Enum([
  'A',
  'B',
  'C'
]);

// or

// {app_root}/app/enums/colors.js
// use object to set the values
// item can be an object, but MUST have an `id` field at the top level
module.exports = app => app.Enum({
  RED: 1,
  GREEN: 4,
  BLUE: {
    id: 5,
    name: 'blue',
    // other...
  },
});

// then you can use like this
console.log(app.enums.Letters.B === 1);       // true
console.log(app.enums.Letters[2] === 'C');    // true

console.log(app.enums.Colors.GREEN === 4);    // true
console.log(app.enums.Colors[5].name === 'blue');    // true
```

You can get all keys by use `.$keys` to get all enums.

```js
// app.enums.Letters.$keys
[
  {
    "id": 0,
    "key": "A"
  },
  {
    "id": 1,
    "key": "B"
  },
  {
    "id": 2,
    "key": "C"
  }
]

// app.enums.Colors.$keys
[
  {
    "id": 1,
    "key": "RED"
  },
  {
    "id": 4,
    "key": "GREEN"
  },
  {
    "id": 5,
    "key": "BLUE",
    "name": "blue"
  }
]
```

So make sure that DO NOT use `$keys` to named an enum or use field `key` in enum items top level when you config.

## Questions & Suggestions

Please open an issue [here](https://github.com/LzxHahaha/egg-enums/issues).

## License

[MIT](LICENSE)
