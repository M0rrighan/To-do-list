/* eslint-disable import/no-cycle */
import Storage from './storage.js';
import ListManipulation from './manipulateList.js';
import Interact from './interact.js';
// import getDragStartEnd, { listenDragOver } from './dragDrop.js';

export default class Elmnts {
  static createCkBox(taskIndex, taskStatusDone, listToUpdate) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
    checkbox.checked = taskStatusDone;
    checkbox.addEventListener('change', () => {
      const updatedList = listToUpdate.changeStatusDone(taskIndex);
      Storage.saveAndUpdate(updatedList);
    });
    return checkbox;
  }

  static createTaskDescr(taskIndex, taskDescription) {
    const description = document.createElement('p');
    description.contentEditable = true;
    description.style.outline = 'none';
    description.dataset.referTo = taskIndex;
    description.className = 'description';
    description.innerText = taskDescription;
    description.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const updatedList = new ListManipulation().editDescription(taskIndex, e.target.innerText);
        Storage.saveAndUpdate(updatedList);
        Interact.listenRemoveBtn();
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
    li.classList.add('draggable');
    li.setAttribute('draggable', true);
    const ckbox = this.createCkBox(this.task.index, this.task.done, listToUpdate);
    const descriptiveP = this.createTaskDescr(this.task.index, this.task.description);
    const icon = this.createIcon(this.task.index);
    li.appendChild(ckbox);
    li.appendChild(descriptiveP);
    li.appendChild(icon);
    return li;
  }
}
