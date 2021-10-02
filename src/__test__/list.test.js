/**
 * @jest-environment jsdom
 */
import Manipulation from '../manipulateList';
import Storage from '../storage';

describe('List', () => {
  document.body.innerHTML = `<div class="list_container">
  <div class="title">
    <p>Today's To Do</p>
    <i class="material-icons">autorenew</i>
  </div>
  <div class="oneMoreTask">
    <input type="text" name="add_item" id="add_item" class="add_item" placeholder="Add to your list...">
    <i class="material-icons">keyboard_return</i>
  </div>
  <ul class="tasks_list"></ul>
  <div class="clearBtn">Clear all completed</div>
</div>`;

  global.localStorage = {
    state: {},
    setItem(key, item) {
      this.state[key] = item;
    },
    getItem(key) {
      return this.state[key];
    },
  };
  let tasks;
  beforeAll(() => {
    tasks = new Manipulation('ToDoList');

    tasks.addToList('Test 1');
  });

  afterAll(() => {
    localStorage.removeItem('ToDoList');
  });

  describe('Change Status', () => {
    test('should change status to completed', () => {
      const editedTasks = tasks.changeStatusDone(0);
      Storage.saveAndUpdate(tasks.tasksList);
      expect(editedTasks[0].done).toBe(true);
    });

    test('should check checkbox ', () => {
      const { checked } = document.querySelector('ul li input');
      expect(checked).toBe(true);
    });
  });

  describe('Edit task', () => {
    test('should edit task description', () => {
      const editedTasks = tasks.editDescription(0, 'Updated Desc');
      expect(editedTasks[0].description).toBe('Updated Desc');
    });

    test('should update task description in the DOM', () => {
      Storage.saveAndUpdate(tasks.tasksList);
      const desc = document.querySelector('ul li p').innerText;
      expect(desc).toBe('Updated Desc');
    });
  });

  describe('Change Status', () => {
    test('should clear all completed tasks', () => {
      tasks.removeAllDone();
      expect(tasks.getList().length).toBe(0);
    });

    test('should clear all completed tasks from DOM', () => {
      const li = document.querySelectorAll('ul li');
      expect(li.length).toBe(0);
    });
  });

  describe('Update Index', () => {
    test('should update item index', () => {
      tasks.addToList('Test 2');
      tasks.addToList('Test 3');

      const reOrderedLists = tasks.changeItemIndex(tasks.tasksList, 0, 1);
      expect(reOrderedLists[0].description).toBe('Test 3');
      expect(reOrderedLists[0].index).toBe(1);
    });
  });
});