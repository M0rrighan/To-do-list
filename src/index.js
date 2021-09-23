import ListOfTasks from './list';
import Interact from './interact';
import './style.css';

const tasks = new ListOfTasks();
Interact.populateUlTasksList(tasks);
