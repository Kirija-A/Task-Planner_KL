// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"taskclass.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Task = //constructor for Task
function Task(id, name, details, assignee, dueDate, status) {
  _classCallCheck(this, Task);

  this.id = id;
  this.name = name;
  this.details = details;
  this.assignee = assignee;
  this.dueDate = dueDate;
  this.status = status;
};

exports.default = Task;
},{}],"taskmanager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _taskclass = _interopRequireDefault(require("./taskclass.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Taskmanager = /*#__PURE__*/function (_Task) {
  _inherits(Taskmanager, _Task);

  var _super = _createSuper(Taskmanager);

  function Taskmanager(id, name, details, assignee, dueDate, status) {
    _classCallCheck(this, Taskmanager);

    return _super.call(this, id, name, details, assignee, dueDate, status);
  } //show and store task works together like display and store in the local storage


  _createClass(Taskmanager, [{
    key: "addTask",
    value: function addTask(id, name, details, assignee, dueDate, status) {
      this.id = id;
      this.name = name;
      this.details = details;
      this.assignee = assignee;
      this.dueDate = dueDate;
      this.status = status;
      this.displayHtml(this.id, this.name, this.details, this.assignee, this.dueDate, this.status);
      return this;
    } //refresh fields after display or edit

  }, {
    key: "clearFields",
    value: function clearFields() {
      document.getElementById("name").value = "";
      document.getElementById("details").value = "";
      document.getElementById("dueDate").value = new Date().toISOString().slice(0, 10);
      ;
      document.getElementById("status").value = "To Do";
    } //store the tasks in the local storage

  }, {
    key: "storeTask",
    value: function storeTask() {
      var _JSON$parse;

      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_nullish_assignment for ??
      var allData = (_JSON$parse = JSON.parse(localStorage.getItem("tasks"))) !== null && _JSON$parse !== void 0 ? _JSON$parse : [];
      allData.push({
        id: this.id,
        name: this.name,
        details: this.details,
        assignee: this.assignee,
        dueDate: this.dueDate,
        status: this.status
      });
      localStorage.setItem("tasks", JSON.stringify(allData));
    } //show the tasks if it in the local storage in the webpage

  }, {
    key: "displayTask",
    value: function displayTask() {
      var _this = this;

      if (localStorage.getItem("tasks")) {
        JSON.parse(localStorage.getItem("tasks")).forEach(function (item) {
          _this.displayHtml(item.id, item.name, item.details, item.assignee, item.dueDate, item.status);
        });
      }
    } //display in the webpage

  }, {
    key: "displayHtml",
    value: function displayHtml(id, name, details, assignee, dueDate, status) {
      //card display
      var taskRow = document.createElement("col");
      taskRow.innerHTML = "\n        <div class=\"card mt-4 mr-4\" style=\"width:18rem;\">\n        <div class=\"card-header bg-info text-white\">Due Date: ".concat(dueDate, "</div>\n            <div class=\"card-body\">\n            <h5 class=\"card-title\">").concat(name, "</h5>\n            <p class=\"card-text text-wrap\">Description: ").concat(details, "</p>\n            <hr>\n            <p class=\"card-text\"><strong>Assigned to:</strong> ").concat(assignee, "</p>\n            <p class=\"card-text\"><strong>Status:</strong> ").concat(status, "</p>\n            <hr>\n            <button id=\"edit\" class=\"btn btn-info edit mx-4 far fa-edit\" data-id=\"").concat(id, "\"></button>\n            <button id=\"delete\" class=\"btn btn-danger delete fas fa-trash-alt\" data-id=\"").concat(id, "\"></button>\n            </div> \n            </div>\n      </div>");
      document.querySelector("#example").appendChild(taskRow);
    } //pass the id from the call function while submitting the update and check for id in the local storage and the editing id and store it in the local storage. if no checking it will append

  }, {
    key: "updateTask",
    value: function updateTask(id) {
      var newItem = {
        id: this.id,
        name: this.name,
        details: this.details,
        assignee: this.assignee,
        dueDate: this.dueDate,
        status: this.status
      };
      var taskStorage = JSON.parse(localStorage.getItem("tasks"));
      var updatedData = taskStorage.map(function (item) {
        if (item.id == id) {
          return newItem;
        }

        return item;
      });
      localStorage.setItem("tasks", JSON.stringify(updatedData)); // this.refresh();
    } //delete from the localstorage

  }, {
    key: "deleteTask",
    value: function deleteTask(id) {
      var emps = JSON.parse(localStorage.getItem("tasks"));
      var newData = emps.filter(function (item) {
        return item.id != id;
      });
      localStorage.setItem("tasks", JSON.stringify(newData));
    } //display as per the status

  }, {
    key: "displayFilter",
    value: function displayFilter(status) {
      var _this2 = this;

      var emps = JSON.parse(localStorage.getItem("tasks"));

      if (emps != []) {
        document.querySelector("#example").innerHTML = "";
        var newData = emps.filter(function (item) {
          return item.status == status;
        });
        newData.forEach(function (item) {
          _this2.addTask(item.id, item.name, item.details, item.assignee, item.dueDate, item.status);
        });
      }
    } // refresh(){
    //     window.location.reload();   
    // }

  }]);

  return Taskmanager;
}(_taskclass.default);

exports.default = Taskmanager;
},{"./taskclass.js":"taskclass.js"}],"task.js":[function(require,module,exports) {
"use strict";

var _taskclass = _interopRequireDefault(require("./taskclass.js"));

var _taskmanager = _interopRequireDefault(require("./taskmanager.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//show todays date
var formTask = document.getElementById("formTask");
var name = document.getElementById("name");
var details = document.getElementById("details");
var assignee = document.getElementById("assignee");
var dueDate = document.getElementById("dueDate");
var status = document.getElementById("status");
var tableBody = document.querySelector("#example");
var submit = document.getElementById("submit");
var formModal = document.getElementById("formModal");
var modalName = document.getElementById("modalName");
var contIdEdit = document.getElementById("contIdEdit");
var errormsg = document.getElementById("errormsg");
var errorMsg1 = document.querySelector("#errorMsg1");
var errorMsg2 = document.querySelector("#errorMsg2");
var errorMsg3 = document.querySelector("#errorMsg3");
var errorMsg4 = document.querySelector("#errorMsg4");
var dateElement = document.getElementById("#date");
var todo = document.querySelector("#todo");
var progress = document.querySelector("#progress");
var review = document.querySelector("#review");
var done = document.querySelector("#done");
var overdue = document.querySelector("#overdue");
var allDisplay = document.querySelector("#alldisplay");
var formCancel = document.querySelector("#formCancel");
var d = new Date();
var today = [d.getFullYear(), ('0' + (d.getMonth() + 1)).slice(-2), ('0' + d.getDate()).slice(-2)].join('-');
dueDate.value = today; // const options = {weekday : "long", month:"short", day:"numeric"};
// const today = new Date();
// dateElement.innerHTML = today.toLocaleDateString("en-US", options);
//declaration for form, three inpue fields,table display,submit button for store this item and hidden field for id - check for the class and id in the HTML
//console.log used for value verfication
// //contIdEdit is the hidden value generated by random function while  editing inspect the edit button and store this item button (gets changed when you edit to edit this button) - it will show the id value in the value attribute in chrome console

var newTask = new _taskmanager.default();
newTask.displayTask();
name.addEventListener("input", function (event) {
  event.preventDefault();

  if (event.target.value && event.target.value.length <= 8 || event.target.value.length == 0) {
    errorMsg1.innerHTML = "Mandatory must enter 8 characters of length";
    errorMsg1.style.color = "red";
    name.focus();
    submit.disabled = true;
  } else {
    errorMsg1.innerHTML = "Looks Good!";
    errorMsg1.style.color = "purple";
    submit.disabled = false;
  }
});
details.addEventListener("input", function (event) {
  event.preventDefault();

  if (event.target.value && event.target.value.length <= 15 || event.target.value.length == 0) {
    errorMsg2.innerHTML = "Mandatory must enter 15 characters of length";
    errorMsg2.style.color = "red";
    details.focus();
    submit.disabled = true;
  } else {
    errorMsg2.innerHTML = "Looks Good!";
    errorMsg2.style.color = "purple";
    submit.disabled = false;
  }
});
dueDate.addEventListener("change", function (event) {
  event.preventDefault();
  errorMsg3.innerHTML = "Looks Good!";
  errorMsg3.style.color = "green";
  dueDate.focus();
  statusValue();
});

function statusValue() {
  if (dueDate.value < today) {
    errorMsg4.innerHTML = "Status changed to overdue";
    errorMsg4.style.color = "green";
    status.value = "overdue";
  } else {
    errorMsg4.innerHTML = "";
    status.value = "To Do";
  }
}

status.addEventListener("change", function (event) {
  statusValue();
});

function clearError() {
  errorMsg1.innerHTML = "";
  errorMsg2.innerHTML = "";
  errorMsg3.innerHTML = "";
  errorMsg4.innerHTML = "";
}

formCancel.addEventListener("click", function (e) {
  e.preventDefault();
  newTask.clearFields();
  clearError();
});
submit.addEventListener("click", function (e) {
  e.preventDefault(); //update id checking if new id display it in the new row

  if (!contIdEdit.value) {
    var id = Math.floor(Math.random() * 1000000);
    newTask.addTask(id, name.value, details.value, assignee.value, dueDate.value, status.value);
    newTask.storeTask();
    newTask.clearFields();
    clearError(); // }
  } //else call the update function and append the item in the html and local storage
  else {
      var _id = contIdEdit.value;
      newTask.addTask(_id, name.value, details.value, assignee.value, dueDate.value, status.value);
      newTask.updateTask(_id);
      contIdEdit.value = ""; // newTask.refresh();

      submit.innerHTML = "Save";
      tableBody.innerHTML = "";
      newTask.displayTask();
      newTask.clearFields();
      clearError();
    }
}); //since delete and edit are dynamically generated so it is targeted with the class method 

tableBody.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("delete")) {
    var id = e.target.getAttribute("data-id");
    newTask.deleteTask(id);
    e.target.parentElement.parentElement.parentElement.remove();
  } else if (e.target.classList.contains("edit")) {
    var _id2 = e.target.getAttribute("data-id");

    var items = JSON.parse(localStorage.getItem("tasks"));
    var newItem = items.find(function (item) {
      return item.id == _id2;
    });
    modalName.innerHTML = "Update task";
    modalName.disabled = true;
    $("#formTask").modal("show");
    name.value = newItem.name;
    details.value = newItem.details;
    assignee.value = newItem.assignee;
    dueDate.value = newItem.dueDate;
    status.value = newItem.status;
    contIdEdit.value = _id2;
    submit.innerHTML = "Update";
  }
});
allDisplay.addEventListener("click", function (e) {
  e.preventDefault();
  tableBody.innerHTML = "";
  newTask.displayTask();
});
todo.addEventListener("click", function (e) {
  e.preventDefault();
  newTask.displayFilter("To Do");
});
progress.addEventListener("click", function (e) {
  e.preventDefault();
  newTask.displayFilter("In progress");
});
review.addEventListener("click", function (e) {
  e.preventDefault();
  newTask.displayFilter("review");
});
done.addEventListener("click", function (e) {
  e.preventDefault();
  newTask.displayFilter("Done");
});
overdue.addEventListener("click", function (e) {
  e.preventDefault();
  newTask.displayFilter("overdue");
});
},{"./taskclass.js":"taskclass.js","./taskmanager.js":"taskmanager.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50460" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","task.js"], null)
//# sourceMappingURL=/task.e233fba9.js.map