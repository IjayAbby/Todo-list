/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("//select elements\nconst clear = document.querySelector(\".clear\");\nconst dateElement = document.getElementById(\"date\");\nconst list = document.getElementById(\"list\");\nconst input = document.getElementById(\"input\");\n\n//classes names\nconst CHECK = \"fa-check-circle\";\nconst UNCHECK = \"fa-circle-thin\";\nconst LINE_THROUGH = \"lineThrough\";\n\n//varibles\nlet LIST, id;\n\n//get item from localstorage\nlet data = localStorage.getItem(\"TODO\");\n\n//check if dat is not empty\n\nif(data){\n    LIST = JSON.parse(data);\n    id = LIST.length //set the id to the last one on the list\n    loadList(LIST); //load the list to the user interface\n}else{\n    //if data isn't empty\n    LIST = [];\n    id = 0; \n}\n\n//load items to the user's interface\nfunction loadList(array){\n    array.forEach(function(item){\n        addToDo(item.name, item.id, item.done, item.trash);\n    });\n};\n\n//clear localstorage\n\nclear.addEventListener(\"click\", function(){\n    localStorage.clear();\n    location.reload();\n})\n\n\n//show present date\nconst options = {weekday: \"long\", month: \"short\",day: \"numeric\"};\nconst today = new Date();\n\ndateElement.innerHTML = today.toLocaleDateString(\"en-US\", options);\n\n//add to do function\n\nfunction addToDo(toDo, id, done, trash){\n\n    if(trash){ return; }\n\n    const DONE = done ? CHECK : UNCHECK;\n    const LINE = done ? LINE_THROUGH : \"\";\n\n    const item = ` <li class=\"item\">\n                        <i class=\"fa ${DONE} co\" job=\"complete\" id=\"${id}\"></i>\n                        <p class=\"text ${LINE}\">${toDo}</p>\n                        <i class=\"fa fa-trash-o de\" job=\"delete\" id=\"${id}\"></i> \n                    </li>\n    `;\n\n    const position = \"beforeend\";\n\n    list.insertAdjacentHTML(position, item);\n};\n\n//add n item to the list user the enter key\n\ndocument.addEventListener(\"keyup\", function(even){\n    if(event.keyCode == 13){\n        const toDo = input.value;\n\n        //if the input isnt empty\n        if(toDo){\n            addToDo(toDo, id, false, false);\n\n            LIST.push({\n                name: toDo,\n                id: id,\n                done: false,\n                trash: false\n            });\n\n            //add items to localstorage where the list is updated.\n            localStorage.setItem(\"TODO\", JSON.stringify(LIST));\n\n            id++;\n        }\n        input.value = \"\";\n    }\n});\n\n//complete to do \n\nfunction completeToDo(element){\n    element.classList.toggle(CHECK);\n    element.classList.toggle(UNCHECK);\n    element.parentNode.querySelector(\".text\").classList.toggle(LINE_THROUGH);\n\n    LIST[element.id].done = LIST[element.id].done ? false : true;\n}\n\n//remove to do \n\nfunction removeToDo(element){\n    element.parentNode.parentNode.removeChild(element.parentNode);\n\n    LIST[element.id].trash = true;\n}\n\n//target the items created dynamically\n\nlist.addEventListener(\"click\", function(event){\n    const element = event.target; // return the clicked element inside list\n    const elementJob = element.attributes.job.value; // complete or delete\n\n    if(elementJob == \"complete\"){\n        completeToDo(element);\n    }else if(elementJob == \"delete\"){\n        removeToDo(element);\n    }\n\n    //add items to localstorage where the list is updated.\n    localStorage.setItem(\"TODO\", JSON.stringify(LIST));\n}); \n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;