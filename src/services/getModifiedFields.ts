function getModifiedFields<T extends Record<string, unknown>>(
  obj1: T,
  obj2: T,
): Partial<T> {
  const modifiedFields: Partial<T> = {};

  for (const key in obj2) {
    if (
      Object.prototype.hasOwnProperty.call(obj2, key) &&
      obj2[key] !== obj1[key]
    ) {
      modifiedFields[key] = obj2[key];
    }
  }

  return modifiedFields;
}

export { getModifiedFields };
