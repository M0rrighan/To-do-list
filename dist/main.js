/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ListManipulation)
/* harmony export */ });
/* harmony import */ var _list_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _task_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* eslint-disable import/no-cycle */




class ListManipulation extends _list_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(storageKey = 'ToDoList') {
    super(storageKey);
  }

  addToList(descr, index = this.tasksList.length, done = false) {
    const newTask = new _task_js__WEBPACK_IMPORTED_MODULE_2__["default"](descr, index, done);
    this.tasksList.push(newTask);
    _storage_js__WEBPACK_IMPORTED_MODULE_1__["default"].saveAndUpdate(this.tasksList);

    return newTask;
  }

  editDescription(index, newDescription) {
    this.tasksList[index].description = newDescription;
    return this.tasksList;
  }

  overrideIndexes(list) {
    this.list = list;
    this.list.forEach((task, i) => {
      task.index = i;
    });
    return this.list;
  }

  removeByIndex(ind) {
    const filtered = this.tasksList.filter((task) => task.index !== ind);
    _storage_js__WEBPACK_IMPORTED_MODULE_1__["default"].saveAndUpdate(this.overrideIndexes(filtered));
  }

  removeAllDone() {
    const filtered = this.tasksList.filter((task) => task.done === false);
    _storage_js__WEBPACK_IMPORTED_MODULE_1__["default"].saveAndUpdate(this.overrideIndexes(filtered));
  }
}


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ListOfTasks)
/* harmony export */ });
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
// eslint-disable-next-line import/no-cycle


class ListOfTasks {
  constructor(storageKey = 'ToDoList') {
    if (_storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].existInStorage(storageKey)) {
      this.tasksList = _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].readFromStorage(storageKey);
    } else {
      this.tasksList = [];
    }
  }

  getList() {
    return this.tasksList;
  }

  getListSorted() {
    const sortedList = this.tasksList;
    return sortedList.sort((a, b) => (a.index > b.index ? 1 : -1));
  }

  changeStatusDone(index) {
    this.tasksList[index].done = !this.tasksList[index].done;
    return this.tasksList;
  }
}


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Storage)
/* harmony export */ });
/* harmony import */ var _list_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _interact_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* eslint-disable import/no-cycle */



class Storage {
  static saveAndUpdate(objToStore, name = 'ToDoList') {
    localStorage.setItem(name, JSON.stringify(objToStore));
    _interact_js__WEBPACK_IMPORTED_MODULE_1__["default"].populateUlTasksList(new _list_js__WEBPACK_IMPORTED_MODULE_0__["default"]());
    _interact_js__WEBPACK_IMPORTED_MODULE_1__["default"].changeStyleOnSelected();
  }

  static readFromStorage(name = 'ToDoList') {
    return JSON.parse(localStorage.getItem(name));
  }

  static existInStorage(name = 'ToDoList') {
    return this.readFromStorage(name) != null;
  }
}


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Interact)
/* harmony export */ });
/* harmony import */ var _elements_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _manipulateList_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _task_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* eslint-disable import/no-cycle */




class Interact {
  static populateUlTasksList(list) {
    this.tasksList = document.querySelector('.tasks_list');
    this.tasksList.innerHTML = '';
    list.getListSorted().forEach((task) => {
      const listItem = _elements_js__WEBPACK_IMPORTED_MODULE_0__["default"].createLi(task, list);
      if (task.done) {
        listItem.classList.add('done');
      } else {
        listItem.classList.remove('done');
      }
      this.tasksList.appendChild(listItem);
    });
  }

  static listenForNewItems() {
    const addInput = document.getElementById('add_item');
    addInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.addTask(addInput);
      }
    });
    const addIcon = document.querySelector('.oneMoreTask i');
    addIcon.addEventListener('click', () => {
      this.addTask(addInput);
    });
  }

  static addTask(element) {
    if (element.value.length) {
      new _manipulateList_js__WEBPACK_IMPORTED_MODULE_1__["default"]().addToList(element.value);
      element.value = '';
      this.updateDomRemoveDrag();
    }
  }

  static listenClearBtn() {
    const clearBtn = document.querySelector('.clearBtn');
    clearBtn.addEventListener('click', () => {
      new _manipulateList_js__WEBPACK_IMPORTED_MODULE_1__["default"]().removeAllDone();
      this.updateDomRemoveDrag();
    });
  }

  static listenRemoveBtn() {
    const removeButtons = document.querySelectorAll('.tasks_list i');
    removeButtons.forEach((removeBtn) => {
      removeBtn.addEventListener('click', (e) => {
        if (e.target.textContent === 'delete_forever') {
          new _manipulateList_js__WEBPACK_IMPORTED_MODULE_1__["default"]().removeByIndex(parseInt(e.target.dataset.referTo, 10));
          this.updateDomRemoveDrag();
        }
      });
    });
  }

  static listenDragStartEnd() {
    const draggables = document.querySelectorAll('.draggable');
    draggables.forEach((draggable) => {
      draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
      });
      draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
        this.saveReorderedList();
        this.populateUlTasksList(new _manipulateList_js__WEBPACK_IMPORTED_MODULE_1__["default"]());
        this.changeStyleOnSelected();
        this.updateDomRemoveDrag();
      });
    });
  }

  static listenDragOver(container) {
    container.addEventListener('dragover', (e) => {
      e.preventDefault();
      const afterElement = this.getDragAfterElement(container, e.clientY);
      const draggable = document.querySelector('.dragging');
      if (afterElement == null) {
        container.appendChild(draggable);
      } else {
        container.insertBefore(draggable, afterElement);
      }
    });
  }

  static changeStyleOnSelected() {
    const allLis = document.querySelectorAll('.tasks_list > *');
    allLis.forEach((li) => {
      li.addEventListener('click', () => {
        // 1. reset style for all list items
        this.unselectAll(allLis);
        li.classList.add('selected');
        this.unselectedDefaultStyle();
        // 2. set style only for clicked
        li.style.backgroundColor = 'hsl(40deg 91% 75% / 75%)';
        li.children[2].textContent = 'delete_forever';
        li.children[2].style.cursor = 'pointer';
      });
    });
  }

  static getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      }
      return closest;
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }

  static saveReorderedList() {
    const newOrder = document.querySelectorAll('.tasks_list > *');
    const reOrderedArray = [];
    newOrder.forEach((item, i) => {
      reOrderedArray.push(new _task_js__WEBPACK_IMPORTED_MODULE_2__["default"](item.children[1].textContent, i, item.children[0].checked));
    });
    localStorage.setItem('ToDoList', JSON.stringify(reOrderedArray));
  }

  static unselectAll(nodeList) {
    nodeList.forEach((item) => {
      item.classList.remove('selected');
    });
  }

  static unselectedDefaultStyle() {
    const allOthers = document.querySelectorAll('.tasks_list > *:not(.selected)');
    allOthers.forEach((notSelected) => {
      notSelected.style.backgroundColor = 'white';
      notSelected.children[2].textContent = 'more_vert';
      notSelected.children[2].style.cursor = 'move';
    });
  }

  static updateDomRemoveDrag() {
    this.listenRemoveBtn();
    this.listenDragStartEnd();
  }
}


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Elmnts)
/* harmony export */ });
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _manipulateList_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _interact_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* eslint-disable import/no-cycle */




class Elmnts {
  static createCkBox(taskIndex, taskStatusDone, listToUpdate) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
    checkbox.checked = taskStatusDone;
    checkbox.addEventListener('change', () => {
      const updatedList = listToUpdate.changeStatusDone(taskIndex);
      _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].saveAndUpdate(updatedList);
      _interact_js__WEBPACK_IMPORTED_MODULE_2__["default"].updateDomRemoveDrag();
    });
    return checkbox;
  }

  static createTaskDescr(taskIndex, taskDescription) {
    const description = document.createElement('p');
    description.contentEditable = true;
    description.style.outline = 'none';
    description.dataset.referTo = taskIndex;
    description.className = 'description';
    description.innerText = taskDescription;
    description.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const updatedList = new _manipulateList_js__WEBPACK_IMPORTED_MODULE_1__["default"]().editDescription(taskIndex, e.target.innerText);
        _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].saveAndUpdate(updatedList);
        _interact_js__WEBPACK_IMPORTED_MODULE_2__["default"].updateDomRemoveDrag();
      }
    });
    return description;
  }

  static createIcon(taskIndex) {
    const icon = document.createElement('i');
    icon.dataset.referTo = taskIndex;
    icon.className = 'material-icons';
    icon.textContent = 'more_vert';
    return icon;
  }

  static createLi(task, listToUpdate) {
    this.task = task;
    const li = document.createElement('li');
    li.id = this.task.index;
    li.classList.add('draggable');
    li.setAttribute('draggable', true);
    const ckbox = this.createCkBox(this.task.index, this.task.done, listToUpdate);
    const descriptiveP = this.createTaskDescr(this.task.index, this.task.description);
    const icon = this.createIcon(this.task.index);
    li.appendChild(ckbox);
    li.appendChild(descriptiveP);
    li.appendChild(icon);
    return li;
  }
}


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Task)
/* harmony export */ });
class Task {
  constructor(description, index, done) {
    this.index = index;
    this.description = description;
    this.done = done;
  }
}


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(12);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(13);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(14);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 8 */
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 9 */
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),
/* 10 */
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),
/* 11 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),
/* 12 */
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),
/* 13 */
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),
/* 14 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n\r\n* ul li {\r\n  list-style-type: none;\r\n}\r\n\r\nbody {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  height: 100vh;\r\n  font-family: 'Open Sans', 'Lucida Grande', tahoma, verdana, arial, sans-serif;\r\n  font-size: 0.9375rem;\r\n  font-weight: 400;\r\n  line-height: 1.25rem;\r\n  color: #545862;\r\n  background-color: #f6f6f6;\r\n}\r\n\r\n.list_container {\r\n  width: 90%;\r\n  max-width: 30rem;\r\n  box-shadow:\r\n    0.25rem 0.25rem 1rem rgba(0, 0, 0, 0.08),\r\n    -0.25rem -0.05rem 1rem 0 rgba(0, 0, 0, 0.08);\r\n}\r\n\r\n.list_container > *,\r\n.tasks_list li {\r\n  padding: 1rem;\r\n  border-bottom: 1px solid rgba(0, 0, 0, 0.08);\r\n  background-color: #fff;\r\n}\r\n\r\n.list_container > *:last-child {\r\n  background-color: transparent;\r\n}\r\n\r\n.list_container i {\r\n  color: rgba(0, 0, 0, 0.3);\r\n  text-align: right;\r\n  cursor: pointer;\r\n}\r\n\r\n.title,\r\n.oneMoreTask {\r\n  display: grid;\r\n  grid-template-columns: 90% 10%;\r\n  align-items: center;\r\n}\r\n\r\n.title i {\r\n  color: rgba(0, 0, 0, 0.45);\r\n}\r\n\r\n.tasks_list i {\r\n  cursor: move;\r\n}\r\n\r\n.oneMoreTask input,\r\n.oneMoreTask input:focus {\r\n  border: none;\r\n  outline: none;\r\n  height: 100%;\r\n  font-size: inherit;\r\n}\r\n\r\n.oneMoreTask .add_item {\r\n  font-style: italic;\r\n}\r\n\r\n.oneMoreTask .add_item::placeholder {\r\n  font-style: italic;\r\n  color: rgba(0, 0, 0, 0.25);\r\n}\r\n\r\n.tasks_list {\r\n  display: flex;\r\n  flex-direction: column;\r\n  padding: 0;\r\n}\r\n\r\n.tasks_list li {\r\n  display: grid;\r\n  grid-template-columns: 5% 85% 10%;\r\n  align-items: center;\r\n}\r\n\r\n.tasks_list li .description {\r\n  margin-left: 0.25rem;\r\n}\r\n\r\n.tasks_list li.done .description {\r\n  color: rgba(0, 0, 0, 0.45);\r\n  text-decoration: line-through;\r\n}\r\n\r\n.clearBtn {\r\n  text-align: center;\r\n  opacity: 0.5;\r\n  background-color: rgba(0, 0, 0, 0.25);\r\n  cursor: pointer;\r\n}\r\n\r\n.clearBtn:hover {\r\n  opacity: 1;\r\n  text-decoration: underline;\r\n}\r\n\r\n.draggable.dragging {\r\n  border: 2px dashed hsl(40deg 91% 75%);\r\n  background-color: hsl(40deg 91% 75% / 35%);\r\n  opacity: 0.85;\r\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 15 */
/***/ ((module) => {



module.exports = function (i) {
  return i[1];
};

/***/ }),
/* 16 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var _i = 0; _i < this.length; _i++) {
        var id = this[_i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i2 = 0; _i2 < modules.length; _i2++) {
      var item = [].concat(modules[_i2]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _manipulateList_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _interact_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
// import ListOfTasks from './list.js';




const tasks = new _manipulateList_js__WEBPACK_IMPORTED_MODULE_0__["default"]();

function start() {
  _interact_js__WEBPACK_IMPORTED_MODULE_1__["default"].populateUlTasksList(tasks);
  _interact_js__WEBPACK_IMPORTED_MODULE_1__["default"].changeStyleOnSelected();
  _interact_js__WEBPACK_IMPORTED_MODULE_1__["default"].listenForNewItems();
  _interact_js__WEBPACK_IMPORTED_MODULE_1__["default"].listenClearBtn();
  _interact_js__WEBPACK_IMPORTED_MODULE_1__["default"].listenRemoveBtn();
  _interact_js__WEBPACK_IMPORTED_MODULE_1__["default"].listenDragStartEnd();
  _interact_js__WEBPACK_IMPORTED_MODULE_1__["default"].listenDragOver(document.querySelector('.tasks_list'));
}

start();

})();

/******/ })()
;