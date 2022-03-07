export function sortByPropInt(arr, prop) {
  return arr.sort((a, b) => {
    a = parseInt(a[prop]);
    b = parseInt(b[prop]);
    return b - a;
  })
}

export function sortByPropStr(arr, prop) {
  return arr.sort(function (a, b) {
    a = a[prop].toUpperCase();
    b = b[prop].toUpperCase();
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  });
}


export const capitalize = ([first, ...rest], lowerRest = false) =>
  first.toUpperCase() + rest.join('').toLowerCase();