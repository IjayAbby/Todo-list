/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"lists\": () => (/* binding */ lists),\n/* harmony export */   \"selectedListId\": () => (/* binding */ selectedListId),\n/* harmony export */   \"clearElement\": () => (/* binding */ clearElement),\n/* harmony export */   \"listsContainer\": () => (/* binding */ listsContainer),\n/* harmony export */   \"renderLists\": () => (/* binding */ renderLists),\n/* harmony export */   \"listDisplayContainer\": () => (/* binding */ listDisplayContainer),\n/* harmony export */   \"listTitleElement\": () => (/* binding */ listTitleElement),\n/* harmony export */   \"tasksContainer\": () => (/* binding */ tasksContainer),\n/* harmony export */   \"taskTemplate\": () => (/* binding */ taskTemplate),\n/* harmony export */   \"editTask\": () => (/* binding */ editTask)\n/* harmony export */ });\n/* harmony import */ var _searchbar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./searchbar */ \"./src/searchbar.js\");\n\n\nconst listsContainer = document.querySelector(\"[data-lists]\");\nconst newListForm = document.querySelector(\"[data-new-list-form]\");\nconst newListInput = document.querySelector(\"[data-new-list-input]\");\nconst deleteListButton = document.querySelector(\"[data-delete-list-button]\");\nconst listDisplayContainer = document.querySelector(\n  \"[data-list-display-container]\"\n);\nconst listTitleElement = document.querySelector(\"[data-list-title\");\nconst listCountElement = document.querySelector(\"[data-list-count\");\nconst tasksContainer = document.querySelector(\"[data-tasks\");\nconst taskTemplate = document.querySelector(\"#task-template\");\nconst newTaskForm = document.querySelector(\"[data-new-task-form]\");\nconst newTaskInput = document.querySelector(\"[data-new-task-input]\");\nconst newTaskDate = document.querySelector(\"#due-date\");\nconst newTaskPriority = document.querySelector(\"#priority\");\nconst newTaskDescription = document.querySelector(\"#description\");\nconst clearCompleteTasksButton = document.querySelector(\n  \"[data-clear-complete-tasks-button]\"\n);\nlet lists = JSON.parse(localStorage.getItem(\"task.lists\")) || [];\nlet selectedListId = localStorage.getItem(\"task.selectedListId\");\nconst overlay = document.querySelector(\"#overlay\");\nconst formContainer = document.querySelector(\".container\");\nconst closeButton = document.querySelector(\".close\");\nconst addButton = document.querySelector(\".add-btn\");\nconst hamburger = document.querySelector(\".hamburger\");\nlet modalOpen = false;\n\nfunction renderAndSave() {\n  render();\n  localStorage.setItem(\"task.lists\", JSON.stringify(lists));\n  localStorage.setItem(\"task.selectedListId\", selectedListId);\n}\n\n//clear lists\nfunction clearElement(element) {\n  while (element.firstChild) {\n    element.removeChild(element.firstChild);\n  }\n}\n\nfunction renderTaskCount(selectedList) {\n  const incompleteTaskCount = selectedList.tasks.filter(\n    (task) => !task.complete\n  ).length;\n  const taskString = incompleteTaskCount === 1 ? \"task\" : \"tasks\";\n  listCountElement.innerText = `${incompleteTaskCount} ${taskString} remaining`;\n}\n\nfunction colorTasks(selectedList) {\n  const todos = [...document.querySelectorAll(\".todo\")];\n  const checkbox = [...document.querySelectorAll(\".checkbox\")];\n  for (let i = 0; i < todos.length; i++) {\n    for (let i = 0; i < selectedList.tasks.length; i++) {\n      if (selectedList.tasks[i].priority === \"High\") {\n        checkbox[i].style.border = \"2px solid #ed1250\";\n      } else if (selectedList.tasks[i].priority === \"Medium\") {\n        checkbox[i].style.border = \"2px solid #d3d00f\";\n      } else {\n        checkbox[i].style.border = \"2px solid #0fc53d\";\n      }\n    }\n  }\n}\n\nfunction render() {\n  clearElement(listsContainer);\n  renderLists();\n  const selectedList = lists.find((list) => list.id === selectedListId);\n\n  if (selectedListId === null) {\n    listDisplayContainer.style.display = \"none\";\n  } else {\n    listDisplayContainer.style.display = \"\";\n    listTitleElement.innerHTML = `<i class=\"fas fa-tasks\"></i> ${selectedList.name}`;\n    renderTaskCount(selectedList);\n    clearElement(tasksContainer);\n    renderTasks(selectedList);\n    colorTasks(selectedList);\n  }\n}\n\nfunction renderLists() {\n  lists.forEach((list) => {\n    const listElement = document.createElement(\"li\");\n    listElement.innerText = list.name;\n    listElement.dataset.listId = list.id;\n    if (list.id === selectedListId) {\n      listElement.classList.add(\"active-list\");\n    }\n    listsContainer.appendChild(listElement);\n  });\n}\n\nfunction renderTasks(selectedList) {\n  if (selectedList.tasks.length === 0) {\n    listDisplayContainer.style.background =\n      \"url(./images/tasks.svg) center no-repeat\";\n    listDisplayContainer.style.backgroundSize = \"35%\";\n  } else {\n    listDisplayContainer.style.background = \"\";\n  }\n\n  selectedList.tasks.forEach((task) => {\n    const taskElement = document.importNode(taskTemplate.content, true);\n    const checkbox = taskElement.querySelector(\"input\");\n    checkbox.id = task.id;\n    checkbox.checked = task.complete;\n    const label = taskElement.querySelector(\"label\");\n    label.htmlFor = task.id;\n\n    const lineBreak = document.createElement(\"br\");\n    label.append(task.name, \", \", task.date, lineBreak, task.description);\n    const editButton = document.createElement(\"p\");\n    editButton.innerHTML = `<i class=\"far fa-edit\"></i>`;\n    editButton.classList.add(\"edit\");\n    editButton.addEventListener(\"click\", () => editTask(task, label));\n    const todoTask = taskElement.querySelector(\".task\");\n    todoTask.append(editButton);\n    tasksContainer.appendChild(taskElement);\n  });\n}\n\nfunction editTask(task, label) {\n  openOrCloseUpdateTaskForm();\n  newTaskInput.value = task.name;\n  newTaskDate.value = task.date;\n  newTaskPriority.value = task.priority;\n  newTaskDescription.value = task.description;\n\n  newTaskForm.addEventListener(\"submit\", () => {\n    console.log(\"daw\");\n    task.name = newTaskInput.value;\n    task.date = newTaskDate.value;\n    task.priority = newTaskPriority.value;\n    task.description = newTaskDescription.value;\n    label.innerHTML = `<span class=\"checkbox\"></span>${task.name}<br>${task.date}<br>${task.description}`;\n    renderAndSave();\n    // location.reload();\n  });\n}\n\n//make new list\nnewListForm.addEventListener(\"submit\", (e) => {\n  e.preventDefault();\n  const listName = newListInput.value;\n  if (listName === null || listName === \"\") return;\n  const list = createList();\n  newListInput.value = null;\n  lists.push(list);\n  renderAndSave();\n});\n\nfunction createList() {\n  return { id: Date.now().toString(), name: newListInput.value, tasks: [] };\n}\n\n//make new task\nnewTaskForm.addEventListener(\"submit\", (e) => {\n  e.preventDefault();\n  const taskName = newTaskInput.value;\n  const h2 = document.querySelector(\".container h2\");\n  if (h2.textContent === \"Update Task\") return;\n  if (taskName === null || taskName === \"\") return;\n  const task = createTask();\n  newTaskInput.value = null;\n  const selectedList = lists.find((list) => list.id === selectedListId);\n  selectedList.tasks.push(task);\n  renderAndSave();\n});\n\nfunction createTask() {\n  return {\n    id: Date.now().toString(),\n    name: newTaskInput.value,\n    date: newTaskDate.value,\n    priority: newTaskPriority.value,\n    description: newTaskDescription.value,\n    complete: false,\n  };\n}\n\n//delete a selected list\ndeleteListButton.addEventListener(\"click\", (e) => {\n  lists = lists.filter((list) => list.id !== selectedListId);\n  selectedListId = null;\n  renderAndSave();\n});\n\n//clear all checked tasks\nclearCompleteTasksButton.addEventListener(\"click\", (e) => {\n  const selectedList = lists.find((list) => list.id === selectedListId);\n  selectedList.tasks = selectedList.tasks.filter((task) => !task.complete);\n  renderAndSave();\n});\n\n//when user wants to add a new task\nfunction openOrCloseAddTaskForm() {\n  const h2 = document.querySelector(\".container h2\");\n  const submitInput = document.querySelector(`input[type=\"submit\"]`);\n\n  if (modalOpen) {\n    formContainer.style.pointerEvents = \"none\";\n    formContainer.style.transform = \"scale(0)\";\n    overlay.style.opacity = 0;\n    modalOpen = false;\n  } else {\n    h2.textContent = \"New Task\";\n    submitInput.value = \"Submit\";\n    formContainer.style.pointerEvents = \"auto\";\n    formContainer.style.transform = \"scale(1)\";\n    overlay.style.opacity = 1;\n    modalOpen = true;\n  }\n}\n\n//for when user wants to update task\nfunction openOrCloseUpdateTaskForm() {\n  const h2 = document.querySelector(\".container h2\");\n  const submitInput = document.querySelector(`input[type=\"submit\"]`);\n\n  if (modalOpen) {\n    formContainer.style.pointerEvents = \"none\";\n    formContainer.style.transform = \"scale(0)\";\n    overlay.style.opacity = 0;\n    modalOpen = false;\n  } else {\n    h2.textContent = \"Update Task\";\n    submitInput.value = \"Update\";\n    formContainer.style.pointerEvents = \"auto\";\n    formContainer.style.transform = \"scale(1)\";\n    overlay.style.opacity = 1;\n    modalOpen = true;\n  }\n}\n\n//close modal\nfunction closeModal() {\n  formContainer.style.transform = \"scale(0)\";\n  overlay.style.opacity = 0;\n  modalOpen = false;\n}\n\n//display list tasks\nlistsContainer.addEventListener(\"click\", (e) => {\n  if (e.target.tagName.toLowerCase() === \"li\") {\n    selectedListId = e.target.dataset.listId;\n    renderAndSave();\n  }\n});\n\n//saves whether task is checked or unchecked\ntasksContainer.addEventListener(\"click\", (e) => {\n  if (e.target.tagName.toLowerCase() === \"input\") {\n    const selectedList = lists.find((list) => list.id === selectedListId);\n    const selectedTask = selectedList.tasks.find(\n      (task) => task.id === e.target.id\n    );\n    selectedTask.complete = e.target.checked;\n    renderAndSave();\n  }\n});\n\n//open form when user clicks on + button\naddButton.addEventListener(\"click\", () => {\n  newTaskForm.reset();\n  openOrCloseAddTaskForm();\n\n  if (modalOpen) {\n    addButton.style.background = \"#2185d5\";\n    addButton.style.transform = \"rotate(45deg)\";\n  } else {\n    addButton.style.background = \"transparent\";\n    addButton.style.transform = \"rotate(0)\";\n  }\n});\n\n//close form when user clicks on X\ncloseButton.addEventListener(\"click\", () => {\n  closeModal();\n  addButton.style.background = \"transparent\";\n  addButton.style.transform = \"rotate(0)\";\n});\n\n//close form after it's submitted\nformContainer.addEventListener(\"submit\", (e) => {\n  e.preventDefault();\n  openOrCloseAddTaskForm();\n  addButton.style.background = \"transparent\";\n  addButton.style.transform = \"rotate(0)\";\n  modalOpen = false;\n});\n\n//toggle slide-in of sidebar when user clicks on hamburger menu\nhamburger.addEventListener(\"click\", () => {\n  const sidebar = document.querySelector(\"#sidebar\");\n  sidebar.classList.toggle(\"active\");\n  hamburger.classList.toggle(\"clicked\");\n});\n\nrender();\n\n\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ }),

/***/ "./src/searchbar.js":
/*!**************************!*\
  !*** ./src/searchbar.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"searchTasks\": () => (/* binding */ searchTasks)\n/* harmony export */ });\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ \"./src/index.js\");\n\n\nconst searchTasks = (() => {\n  const searchBar = document.querySelector(\"#searchBar\");\n\n  searchBar.addEventListener(\"keyup\", (e) => {\n    const selectedList = _index__WEBPACK_IMPORTED_MODULE_0__.lists.find((list) => list.id === _index__WEBPACK_IMPORTED_MODULE_0__.selectedListId);\n    const searchString = e.target.value.toLowerCase();\n\n    const searchedTasks = selectedList.tasks.filter((task) => {\n      return (\n        task.name.toLowerCase().includes(searchString) ||\n        task.description.toLowerCase().includes(searchString)\n      );\n    });\n    renderSearch(searchedTasks);\n  });\n\n  function renderSearch(searchedTasks) {\n    (0,_index__WEBPACK_IMPORTED_MODULE_0__.clearElement)(_index__WEBPACK_IMPORTED_MODULE_0__.listsContainer);\n    (0,_index__WEBPACK_IMPORTED_MODULE_0__.renderLists)();\n    const selectedList = _index__WEBPACK_IMPORTED_MODULE_0__.lists.find((list) => list.id === _index__WEBPACK_IMPORTED_MODULE_0__.selectedListId);\n\n    if (_index__WEBPACK_IMPORTED_MODULE_0__.selectedListId === null) {\n      const todoLister = document.querySelector(\".todo-lister\");\n      todoLister.style.display = \"none\";\n      _index__WEBPACK_IMPORTED_MODULE_0__.listDisplayContainer.style.background = \"red\";\n    } else {\n      _index__WEBPACK_IMPORTED_MODULE_0__.listDisplayContainer.style.display = \"\";\n      _index__WEBPACK_IMPORTED_MODULE_0__.listTitleElement.innerHTML = `<i class=\"fas fa-tasks\"></i> ${selectedList.name}`;\n      (0,_index__WEBPACK_IMPORTED_MODULE_0__.clearElement)(_index__WEBPACK_IMPORTED_MODULE_0__.tasksContainer);\n      renderSearchedTasks(searchedTasks);\n      colorSearchedTasks(searchedTasks);\n    }\n  }\n\n  function colorSearchedTasks(searchedTasks) {\n    const todos = [...document.querySelectorAll(\".todo\")];\n    const checkbox = [...document.querySelectorAll(\".checkbox\")];\n    for (let i = 0; i < todos.length; i++) {\n      for (let i = 0; i < searchedTasks.length; i++) {\n        if (searchedTasks[i].priority === \"High\") {\n          checkbox[i].style.border = \"2px solid #ed1250\";\n        } else if (searchedTasks[i].priority === \"Medium\") {\n          checkbox[i].style.border = \"2px solid #d3d00f\";\n        } else {\n          checkbox[i].style.border = \"2px solid #0fc53d\";\n        }\n      }\n    }\n  }\n\n  function renderSearchedTasks(searchedTasks) {\n    searchedTasks.forEach((task) => {\n      const taskElement = document.importNode(_index__WEBPACK_IMPORTED_MODULE_0__.taskTemplate.content, true);\n      const checkbox = taskElement.querySelector(\"input\");\n      checkbox.id = task.id;\n      checkbox.checked = task.complete;\n      const label = taskElement.querySelector(\"label\");\n      label.htmlFor = task.id;\n\n      const lineBreak = document.createElement(\"br\");\n      label.append(task.name, \", \", task.date, lineBreak, task.description);\n      const editButton = document.createElement(\"p\");\n      editButton.innerHTML = `<i class=\"far fa-edit\"></i>`;\n      editButton.classList.add(\"edit\");\n      editButton.addEventListener(\"click\", () => (0,_index__WEBPACK_IMPORTED_MODULE_0__.editTask)(task, label));\n      const todoTask = taskElement.querySelector(\".task\");\n      todoTask.append(editButton);\n      _index__WEBPACK_IMPORTED_MODULE_0__.tasksContainer.appendChild(taskElement);\n    });\n  }\n})();\n\n\n\n//# sourceURL=webpack://todo-list/./src/searchbar.js?");

/***/ })

/******/ 	});
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
/******/ 			// no module.id needed
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;