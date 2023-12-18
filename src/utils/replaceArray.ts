String.prototype.replaceArray = function (find: string[], replace: string[]) {
  let replaceString = this;
  for (let i = 0; i < find.length; i++) {
    replaceString = replaceString.replaceAll(find[i], replace[i]);
  }
  return replaceString;
};
