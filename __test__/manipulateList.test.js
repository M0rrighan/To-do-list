/**
 * @jest-environment jsdom
 */

import List from '../src/manipulateList.js';

const innerHtml = `
 <div class="oneMoreTask">
 <input type="text" value="New Task" name="add_item" id="add_item" class="add_item" placeholder="Add to your list...">
 <i class="material-icons">keyboard_return</i>
 </div>
 <ul class="tasks_list">
 </ul>
 <div class="clearBtn">Clear all completed</div>`;
document.body.innerHTML = innerHtml;
const tasksUL = document.querySelector('.tasks_list');
const addItemField = document.getElementById('add_item');

describe('#addToList is working properly', () => {
  test('if new task is properly created', () => {
    // Arrange
    const currentList = new List();

    // Act: call #addToList
    const task = currentList.addToList(addItemField.value);

    // Assert
    expect(typeof task).toBe('object');
    expect(task.constructor.name).toBe('Task');
    expect(task).toEqual({ index: 0, description: 'New Task', done: false });
  });

  test('if list array gets populated with one Task object', () => {
    // Arrange
    const currentList = new List(); // intialized list will equal to list in local storage, or empty
    const oldLenght = currentList.getList().length; // length before adding new item

    // Act: call #addToList
    currentList.addToList(addItemField.value);
    const newLength = currentList.getList().length; // length after adding a task

    // Assert
    expect(newLength - oldLenght).toBe(1); // check if only one task was added

    // Act: get the newly added object after calling #addToList
    const taskObj = currentList.getList()[(newLength - 1)];

    // Assert: properties of the newly added object
    expect(typeof taskObj).toBe('object');
    expect(taskObj.constructor.name).toEqual('Task');
    expect(taskObj).toEqual({ index: (newLength - 1), description: 'New Task', done: false });
  });

  test('if one <li> element is appended to list container', () => {
    // Arrange
    const currentList = new List();
    const UlPreviousLenght = tasksUL.childNodes.length;

    // Act: call #addToList
    currentList.addToList(addItemField.value);
    const UlCurrentLenght = tasksUL.childNodes.length;

    // Assert
    expect(UlCurrentLenght - UlPreviousLenght).toBe(1);

    // Act: get the newly added object after calling #addToList
    const lastAddedChild = tasksUL.children[(UlCurrentLenght - 1)];

    // Assert
    expect(lastAddedChild.tagName).toBe('LI');
    expect(lastAddedChild.id).toBe(`${UlPreviousLenght}`);
    expect(lastAddedChild.children[1].innerText).toBe('New Task');
    expect(lastAddedChild.children[0].checked).toBe(false);
  });
});
