/**
 * @jest-environment jsdom
 */

import List from '../src/manipulateList.js';

// jest.mock('../src/manipulateList.js');

const innerHtml = `
 <div class="oneMoreTask">
 <input type="text" value="Task 1" name="add_item" id="add_item" class="add_item" placeholder="Add to your list...">
 <i class="material-icons">keyboard_return</i>
 </div>
 <ul class="tasks_list">
 
 </ul>
 <div class="clearBtn">Clear all completed</div>`;
document.body.innerHTML = innerHtml;
// const TasksUL = document.querySelector('.tasks_list');
const addItemField = document.getElementById('add_item');

describe('#addToList is working properly', () => {
  test('if list gets populated with a Task object', () => {
    const currentList = new List();
    currentList.addToList(addItemField.value);
    // const listCurrently = currentList.getList();
    expect(currentList.getList()).toHaveLength(1);
    console.log(currentList);
  });
});
