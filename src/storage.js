/* eslint-disable import/no-cycle */
import ListOfTasks from './list.js';
import Interact from './interact.js';

export default class Storage {
  static saveAndUpdate(objToStore, name = 'ToDoList') {
    localStorage.setItem(name, JSON.stringify(objToStore));
    Interact.populateUlTasksList(new ListOfTasks());
    Interact.changeStyleOnSelected();
  }

  static readFromStorage(name = 'ToDoList') {
    return JSON.parse(localStorage.getItem(name));
  }

  static existInStorage(name = 'ToDoList') {
    return this.readFromStorage(name) != null;
  }
}
