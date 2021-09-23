import Storage from './storage';
import DefaultDemoList from './demoList';

export default class ListOfTasks {
  constructor(storageKey = 'ToDoList') {
    if (Storage.existInStorage(storageKey)) {
      this.tasksList = Storage.readFromStorage(storageKey);
    } else {
      this.tasksList = DefaultDemoList.getExampleList();
    }
  }

  updateList(newReplacingList) {
    this.tasksList = newReplacingList;
  }

  getList() {
    return this.tasksList;
  }

  getListSorted() {
    const sortedList = this.tasksList;
    return sortedList.sort((a, b) => (a.index > b.index ? 1 : -1));
  }

  changeStatus(index) {
    this.tasksList[index].done = !this.tasksList[index].done;
  }
}
