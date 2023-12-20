// assign the method to the object prototype.
Object.prototype.log = function (): void {
  console.log(this);
};
