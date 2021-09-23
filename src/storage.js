export default class Storage {
  static saveToStorage(name, objToStore) {
    localStorage.setItem(name, JSON.stringify(objToStore));
  }

  static readFromStorage(name) {
    return JSON.parse(localStorage.getItem(name));
  }

  static existInStorage(name) {
    return this.readFromStorage(name) != null;
  }
}
