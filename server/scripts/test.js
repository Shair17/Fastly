const { customAlphabet } = require('nanoid');

const nanoid = customAlphabet('1234567890ABCDEFGHIJ');

console.log(nanoid(10));
