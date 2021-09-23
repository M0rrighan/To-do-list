import './style.css';

const tasksList = document.querySelector('.tasks_list');
const TASKS = [
  {
    index: 0,
    description: 'First task',
    completed: false,
  },
  {
    index: 2,
    description: 'Third task',
    completed: false,
  },
  {
    index: 1,
    description: 'Second task',
    completed: false,
  },
];

function sortAscending(list, parametar = 'index') {
  const arrayToSort = [...list];
  return arrayToSort.sort((a, b) => (a[parametar] > b[parametar] ? 1 : -1));
}

function createLi(task) {
  const { index, description, completed } = task;
  const li = document.createElement('li');
  li.id = index;
  li.innerHTML = `
  <input data-done="${completed}" 
         data-referTo="${index}" 
         type="checkbox" 
         value="false" 
         name="TaskCompleted" 
         class="checkbox">
  <p data-referTo="${index}" class="description">${description}</p>
  <i data-referTo="${index}" class="material-icons">more_vert</i>
  `;
  return li;
}

window.onload = () => {
  sortAscending(TASKS).forEach((task) => {
    tasksList.appendChild(createLi(task));
  });
};
