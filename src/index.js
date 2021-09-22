require('webpack-icons-installer/google');
import './style.css';

console.log('Hello');
const tasksList = document.querySelector('.tasks_list');

tasksList.innerHTML = `<li>First item in list</li>`;
