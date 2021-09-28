/* eslint-disable import/no-cycle */
import Elmnts from './elements.js';
import ListManipulation from './manipulateList.js';
import Task from './task.js';

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

  static addTask(element) {
    if (element.value.length) {
      new ListManipulation().addToList(element.value);
      element.value = '';
      this.listenRemoveBtn();
      // this.listenDragStartEnd();
      // this.listenDragOver();
    }
  }

  static listenForNewItems() {
    const addInput = document.getElementById('add_item');
    addInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.addTask(addInput);
      }
    });
    const addIcon = document.querySelector('.oneMoreTask i');
    addIcon.addEventListener('click', () => {
      this.addTask(addInput);
    });
  }

  static listenClearBtn() {
    const clearBtn = document.querySelector('.clearBtn');
    clearBtn.addEventListener('click', () => {
      new ListManipulation().removeAllDone();
      this.listenRemoveBtn();
      // this.listenDragStartEnd();
      // this.listenDragOver();
    });
  }

  static changeStyleOnSelected() {
    const allLis = document.querySelectorAll('.tasks_list > *');
    allLis.forEach((li) => {
      li.addEventListener('click', () => {
        // 1. reset style for all list items
        this.unselectAll(allLis);
        li.classList.add('selected');
        this.unselectedDefaultStyle();
        // 2. set style only for clicked
        li.style.backgroundColor = 'hsl(40deg 91% 75% / 75%)';
        li.children[2].textContent = 'delete_forever';
        li.children[2].style.cursor = 'pointer';
      });
    });
  }

  static listenRemoveBtn() {
    const removeButtons = document.querySelectorAll('.tasks_list i');
    removeButtons.forEach((removeBtn) => {
      console.log(removeBtn);
      removeBtn.addEventListener('click', (e) => {
        console.log(e.target.textContent);
        if (e.target.textContent === 'delete_forever') {
          new ListManipulation().removeByIndex(parseInt(e.target.dataset.referTo, 10));
          // this.listenRemoveBtn();
          // this.listenDragStartEnd();
        }
      });
    });
  }

  static listenDragStartEnd() {
    const draggables = document.querySelectorAll('.draggable');
    draggables.forEach((draggable) => {
      draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
      });
      draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
        this.saveReorderedList();
        this.populateUlTasksList(new ListManipulation());
        this.changeStyleOnSelected();
        this.listenRemoveBtn();
        // this.listenDragStartEnd();
        // this.listenDragOver();
      });
    });
  }

  static listenDragOver(container) {
    container.addEventListener('dragover', (e) => {
      e.preventDefault();
      const afterElement = this.getDragAfterElement(container, e.clientY);
      const draggable = document.querySelector('.dragging');
      if (afterElement == null) {
        container.appendChild(draggable);
      } else {
        container.insertBefore(draggable, afterElement);
      }
    });
  }

  static getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      }
      return closest;
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }

  static saveReorderedList() {
    const newOrder = document.querySelectorAll('.tasks_list > *');
    const reOrderedArray = [];
    newOrder.forEach((item, i) => {
      reOrderedArray.push(new Task(item.children[1].textContent, i, item.children[0].checked));
    });
    localStorage.setItem('ToDoList', JSON.stringify(reOrderedArray));
    console.log(reOrderedArray);
  }

  static unselectAll(nodeList) {
    nodeList.forEach((item) => {
      item.classList.remove('selected');
    });
  }

  static unselectedDefaultStyle() {
    const allOthers = document.querySelectorAll('.tasks_list > *:not(.selected)');
    allOthers.forEach((notSelected) => {
      notSelected.style.backgroundColor = 'white';
      notSelected.children[2].textContent = 'more_vert';
      notSelected.children[2].style.cursor = 'move';
    });
  }
}
