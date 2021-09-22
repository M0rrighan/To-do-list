import './style.css';

require('webpack-icons-installer/google.js');

console.log('Hello');
const tasksList = document.querySelector('.tasks_list');

tasksList.innerHTML = '<li>First item in list</li>';
