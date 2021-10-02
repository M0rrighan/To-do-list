import Manipulation from '../manipulateList';
import Storage from '../storage';

describe('List', () => {
  const todos = [{ id: 1, description: 'Description', done: false }];
  beforeAll(() => {
    Storage.existInStorage = jest.fn().mockReturnValue(false);
    Storage.saveAndUpdate = jest.fn().mockReturnValue(todos);
    Storage.readFromStorage = jest.fn().mockReturnValue(todos);
  });

  afterAll(() => {
    Storage.existInStorage.mockRestore();
    Storage.saveAndUpdate.mockRestore();
    Storage.readFromStorage.mockRestore();
  });
  describe('Change Status', () => {
    test('should change status to completed', () => {
      const tasks = new Manipulation();
      tasks.tasksList = todos;

      const editedTasks = tasks.changeStatusDone(0);
      expect(editedTasks[0].done).toBe(true);
    });
  });

  describe('Edit task', () => {
    test('should edit task description', () => {
      const tasks = new Manipulation();
      tasks.tasksList = todos;

      const editedTasks = tasks.editDescription(0, 'Updated Desc');
      expect(editedTasks[0].description).toBe('Updated Desc');
    });
  });

  describe('Change Status', () => {
    test('should clear all completed tasks', () => {
      const tasks = new Manipulation();
      const customTodos = [{ id: 1, description: 'Description', done: true }];
      tasks.tasksList = customTodos;

      tasks.removeAllDone();
      expect(tasks.getList().length).toBe(0);
    });
  });
});