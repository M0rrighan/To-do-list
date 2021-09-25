// eslint-disable-next-line import/no-cycle
import Storage from './storage.js';
// import Task from './task.js';

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

  // addToList(descr, index = this.tasksList.length, done = false) {
  //   this.tasksList.push(new Task(descr, index, done));
  //   Storage.saveAndUpdate(this.tasksList);
  // }

  changeStatusDone(index) {
    this.tasksList[index].done = !this.tasksList[index].done;
    return this.tasksList;
  }

  // editDescription(index, newDescription) {
  //   this.tasksList[index].description = newDescription;
  //   return this.tasksList;
  // }

  // overrideIndexes(list) {
  //   this.list = list;
  //   this.list.forEach((task, i) => {
  //     task.index = i;
  //   });
  //   return this.list;
  // }

  // removeByIndex(ind) {
  //   const filtered = this.tasksList.filter((task) => task.index !== ind);
  //   Storage.saveAndUpdate(this.overrideIndexes(filtered));
  // }

  // removeAllDone() {
  //   const filtered = this.tasksList.filter((task) => task.done === false);
  //   Storage.saveAndUpdate(this.overrideIndexes(filtered));
  // }
}
