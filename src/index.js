import ListOfTasks from './list.js';
import Interact from './interact.js';
import './style.css';

const tasks = new ListOfTasks();
window.onload = () => {
  Interact.populateUlTasksList(tasks);
};
Interact.listenForNewItems();
Interact.listenClearBtn();
