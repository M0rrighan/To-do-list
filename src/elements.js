/* eslint-disable import/no-cycle */
import Interact from './interact.js';
import ListOfTasks from './list.js';
import Storage from './storage.js';

export default class Elmnts {
  static createCkBox(taskIndex, taskStatusDone, listToUpdate) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
    checkbox.checked = taskStatusDone;
    checkbox.addEventListener('change', () => {
      const updatedList = listToUpdate.changeStatusDone(taskIndex);
      Storage.saveToStorage(updatedList);
      Interact.populateUlTasksList(new ListOfTasks());
    });
    return checkbox;
  }

  static createTaskDescr(taskIndex, taskDescription, listToUpdate) {
    const description = document.createElement('p');
    description.contentEditable = true;
    description.style.outline = 'none';
    description.dataset.referTo = taskIndex;
    description.className = 'description';
    description.innerText = taskDescription;
    description.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const updatedList = listToUpdate.editDescription(taskIndex, e.target.innerText);
        Storage.saveToStorage(updatedList);
        Interact.populateUlTasksList(new ListOfTasks());
      }
    });
    return description;
  }

  static createIcon(taskIndex) {
    const icon = document.createElement('i');
    icon.dataset.referTo = taskIndex;
    icon.className = 'material-icons';
    icon.textContent = 'more_vert';
    return icon;
  }

  static createLi(task, listToUpdate) {
    this.task = task;
    const li = document.createElement('li');
    li.id = this.task.index;
    const ckbox = this.createCkBox(this.task.index, this.task.done, listToUpdate);
    const descriptiveP = this.createTaskDescr(this.task.index, this.task.description, listToUpdate);
    const icon = this.createIcon(this.task.index);
    li.appendChild(ckbox);
    li.appendChild(descriptiveP);
    li.appendChild(icon);
    li.addEventListener('click', () => {
      // reset style for all list items
      const allLis = document.querySelectorAll('.tasks_list > *');
      allLis.forEach((li) => {
        li.style.backgroundColor = 'white';
        li.children[2].textContent = 'more_vert';
        li.children[2].style.cursor = 'move';
      });

      // set style only for clicked
      li.style.backgroundColor = 'hsl(40deg 91% 75% / 75%)';
      icon.textContent = 'delete_forever';
      icon.style.cursor = 'pointer';

      icon.addEventListener('click', () => {
        if (icon.textContent === 'delete_forever') {
          listToUpdate.removeByIndex(parseInt(icon.dataset.referTo, 10));
        }
      });
    });
    return li;
  }
}
