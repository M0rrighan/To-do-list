// eslint-disable-next-line import/no-cycle
import Storage from './storage.js';

export default class ListOfTasks {
  constructor(storageKey = 'ToDoList') {
    if (Storage.existInStorage(storageKey)) {
      this.tasksList = Storage.readFromStorage(storageKey);
    } else {
      this.tasksList = [];
    }
  }

  getList() {
    return this.tasksList;
  }

  getListSorted() {
    const sortedList = this.tasksList;
    return sortedList.sort((a, b) => (a.index > b.index ? 1 : -1));
  }

  changeStatusDone(index) {
    this.tasksList[index].done = !this.tasksList[index].done;
    return this.tasksList;
  }
}
