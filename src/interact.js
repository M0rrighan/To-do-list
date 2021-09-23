export default class Interact {
  static createLi(task) {
    this.task = task;
    this.li = document.createElement('li');
    this.li.id = this.task.index;
    this.li.innerHTML = `
    <input data-done="${this.task.done}" 
           data-referTo="${this.task.index}" 
           type="checkbox" 
           value="false" 
           name="this.TaskCompleted" 
           class="checkbox">
    <p data-referTo="${this.task.index}" class="description">${this.task.description}</p>
    <i data-referTo="${this.task.index}" class="material-icons">more_vert</i>
    `;
    return this.li;
  }

  static populateUlTasksList(list) {
    this.tasksList = document.querySelector('.tasks_list');
    window.onload = () => {
      list.getListSorted().forEach((task) => {
        this.tasksList.appendChild(this.createLi(task));
      });
    };
  }
}
