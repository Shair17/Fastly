// because Object.keys(new Date()).length === 0;
// we have to do some additional check
// 👈 null and undefined check
export const objectIsEmpty = (obj: Object) =>
  obj &&
  Object.keys(obj).length === 0 &&
  Object.getPrototypeOf(obj) === Object.prototype;
