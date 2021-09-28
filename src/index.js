// import ListOfTasks from './list.js';
import ListManipulation from './manipulateList.js';
import Interact from './interact.js';
import './style.css';

const tasks = new ListManipulation();

function start() {
  Interact.populateUlTasksList(tasks);
  Interact.changeStyleOnSelected();
  Interact.listenForNewItems();
  Interact.listenClearBtn();
  Interact.listenRemoveBtn();
  Interact.listenDragStartEnd();
  Interact.listenDragOver(document.querySelector('.tasks_list'));
}
start();
