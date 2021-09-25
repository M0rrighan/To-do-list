// import ListOfTasks from './list.js';
import ListManipulation from './manipulateList.js';
import Interact from './interact.js';
import './style.css';

const tasks = new ListManipulation();
window.onload = () => {
  Interact.populateUlTasksList(tasks);
};
Interact.listenForNewItems();
Interact.listenClearBtn();
