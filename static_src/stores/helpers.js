
export function addUpdate(updated, store) {
  var existing = store.get(updated.guid);

  if (existing) {
    Object.assign(existing, updated);
  } else {
    store._data.push(updated);
  }
}
