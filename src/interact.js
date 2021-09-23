// eslint-disable-next-line import/no-cycle
import Elmnts from './elements.js';

export default class Interact {
  static populateUlTasksList(list) {
    this.tasksList = document.querySelector('.tasks_list');
    this.tasksList.innerHTML = '';

    list.getListSorted().forEach((task) => {
      const listItem = Elmnts.createLi(task, list);
      if (task.done) {
        listItem.classList.add('done');
      } else {
        listItem.classList.remove('done');
      }
      this.tasksList.appendChild(listItem);
    });
  }
}
