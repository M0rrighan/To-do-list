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
  test('if new Task is properly created', () => {
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

describe('#addToList is working properly, passing a fake Storage.key as attribute', () => {
  test('if new task is properly created', () => {
    // Arrange

    // the List constructor has a default attribute storageKey,
    // if a fake name is passed will return an empty array
    const currentList = new List('fakeStorageKeyName');

    // Act: call #addToList

    // currentList() returns the const newTask
    // (the Object being pushed into the array)
    const task = currentList.addToList(addItemField.value);

    // Assert
    expect(typeof task).toBe('object');
    expect(task.constructor.name).toBe('Task');
    expect(task).toEqual({ index: 0, description: 'New Task', done: false });
  });

  test('if list array contains only one Task object', () => {
    // Arrange
    const currentList = new List('fakeStorageKeyName'); // intialized list will equal to empty array

    // Act: call #addToList
    currentList.addToList(addItemField.value);

    // Assert
    expect(currentList.getList()).toHaveLength(1); // check if only one task was added

    // Arrange: store object from array to variable to check its properties
    const objectInArray = currentList.getList()[0];

    // Assert: properties of the newly added object
    expect(typeof objectInArray).toBe('object');
    expect(objectInArray.constructor.name).toEqual('Task');
    expect(objectInArray).toEqual({ index: 0, description: 'New Task', done: false });
  });

  test('if one <li> element is appended to list container', () => {
    // Arrange
    const currentList = new List('fakeStorageKeyName');

    // Act: call #addToList
    currentList.addToList(addItemField.value);

    // Assert
    expect(currentList.getList()).toHaveLength(1); // check if only one task was added

    // Act: get the newly added object after calling #addToList
    const lastAddedChild = tasksUL.children[0];

    // Assert
    expect(lastAddedChild.tagName).toBe('LI');
    expect(lastAddedChild.id).toEqual('0');
    expect(lastAddedChild.children[1].innerText).toBe('New Task');
    expect(lastAddedChild.children[0].checked).toBe(false);
  });
});

describe('#removeByIndex is working properly', () => {
  test('if only one <li> is deleted from html ul', () => {
    // Arrange
    const tasksUL = document.querySelector('.tasks_list');
    tasksUL.innerHTML = ''; // emties the tasksUL
    const currentList = new List('fakeStorageKey'); // emtpy array
    currentList.addToList('Task 0');
    currentList.addToList('Task 1');
    currentList.addToList('Task 2');
    currentList.addToList('Task 3');
    currentList.addToList('Task 4');
    const lengthBefore = tasksUL.children.length; // 5
    // Act: call #removeByIndex
    const target = 2;
    currentList.removeByIndex(target);
    // Arrange
    const lengthAfter = tasksUL.children.length; // 4
    // Assert
    expect(lengthBefore - lengthAfter).toEqual(1);
  });
  test('if the deleted <li> is the targeted one', () => {
    // Arrange
    const tasksUL = document.querySelector('.tasks_list');
    tasksUL.innerHTML = ''; // emties the tasksUL
    const currentList = new List('fakeStorageKey'); // emtpy array
    currentList.addToList('Task 0');
    currentList.addToList('Task 1');
    currentList.addToList('Task 2');
    currentList.addToList('Task 3');
    const fakeTarget = 2;
    const toDelete = tasksUL.querySelector(`li:nth-child(${fakeTarget})`);
    const fakeClickedBtn = toDelete.children[2]; // > li i
    // Act: call #removeByIndex
    currentList.removeByIndex(parseInt(fakeClickedBtn.dataset.referTo, 10));
    // Assert
    expect(
      // expect the deleted <li> to have id that equals to
      // the data-refer-to attribute of the 'clicked' button-like <i> tag
      toDelete.id,
    ).toEqual(`${fakeClickedBtn.dataset.referTo}`);
    // Arrange
    const paragraphs = Array.from(tasksUL.querySelectorAll('p'));
    // Assert
    // description of the deleted task should not be found in the updated UL
    expect(paragraphs).toEqual(expect.not.arrayContaining([`Task ${fakeTarget - 1}`]));
  });
});
