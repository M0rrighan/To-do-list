export default class Storage {
  static saveToStorage(objToStore, name = 'ToDoList') {
    localStorage.setItem(name, JSON.stringify(objToStore));
  }

  static readFromStorage(name = 'ToDoList') {
    return JSON.parse(localStorage.getItem(name));
  }

  static existInStorage(name = 'ToDoList') {
    return this.readFromStorage(name) != null;
  }
}
