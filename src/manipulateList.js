/* eslint-disable import/no-cycle */
import ListOfTasks from './list.js';
import Storage from './storage.js';
import Task from './task.js';

export default class ListManipulation extends ListOfTasks {
  constructor(storageKey = 'ToDoList') {
    super(storageKey);
  }

  addToList(descr, index = this.tasksList.length, done = false) {
    const newTask = new Task(descr, index, done);
    this.tasksList.push(newTask);
    Storage.saveAndUpdate(this.tasksList);

    return newTask;
  }

  editDescription(index, newDescription) {
    this.tasksList[index].description = newDescription;
    return this.tasksList;
  }

  overrideIndexes(list) {
    this.list = list;
    this.list.forEach((task, i) => {
      task.index = i;
    });
    return this.list;
  }

  removeByIndex(ind) {
    const filtered = this.tasksList.filter((task) => task.index !== ind);
    Storage.saveAndUpdate(this.overrideIndexes(filtered));
  }

  removeAllDone() {
    const filtered = this.tasksList.filter((task) => task.done === false);
    this.tasksList = filtered;
    Storage.saveAndUpdate(this.overrideIndexes(filtered));
  }

  changeItemIndex(list, oldIndex, newIndex) {
    const temp = list[newIndex];
    list[newIndex] = list[oldIndex];
    list[oldIndex] = temp;
    this.tasksList = list;
    return list;
  }
}
