/* eslint-disable import/no-cycle */
import Elmnts from './elements.js';
import ListOfTasks from './list.js';

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

  static listenForNewItems() {
    const addInput = document.getElementById('add_item');
    addInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        new ListOfTasks().addToList(addInput.value);
        addInput.value = '';
      }
    });

    const addIcon = document.querySelector('.oneMoreTask i');
    addIcon.addEventListener('click', () => {
      new ListOfTasks().addToList(addInput.value);
      addInput.value = '';
    });
  }

  static listenClearBtn() {
    const clearBtn = document.querySelector('.clearBtn');
    clearBtn.addEventListener('click', (e) => {
      console.log(e.target);
      new ListOfTasks().removeAllDone();
    });
  }
}
