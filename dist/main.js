/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../creamie/arrayobserver.js":
/*!***********************************!*\
  !*** ../creamie/arrayobserver.js ***!
  \***********************************/
/*! exports provided: ArrayObserverType, ArrayObserver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ArrayObserverType\", function() { return ArrayObserverType; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ArrayObserver\", function() { return ArrayObserver; });\nclass ArrayObserverType {}\n/**\n * This will observe array to capture element addition, removal and modification.\n */\n\n\nclass ArrayObserver {\n  constructor(actualArray, callback) {\n    this.actualArray = actualArray;\n\n    if (callback && typeof callback == 'function') {\n      this.callback = callback;\n      this.array = new Proxy(actualArray, {\n        getPrototypeOf: function () {\n          return ArrayObserverType.prototype;\n        },\n        // for existing element removal\n        deleteProperty: function (target, index) {\n          let value = target[Number(index)];\n          callback({\n            type: 'removed',\n            target: target,\n            index: Number(index),\n            value: value\n          });\n          return true;\n        },\n        set: function (target, index, value) {\n          let type; // for new element added\n\n          if (Number.isInteger(Number(index)) && actualArray.length == target.length && Number(index) > actualArray.length - 1) {\n            type = 'added';\n          } // for existing element modification at index\n          else if (Number.isInteger(Number(index)) && Number(index) < target.length) {\n              type = 'modified';\n            }\n\n          if (type) {\n            callback({\n              type: type,\n              target: target,\n              index: Number(index),\n              value: value\n            });\n          }\n\n          target[index] = value;\n          return true;\n        }\n      });\n    } else {\n      console.error('ArrayObserver: callback is missing.');\n    }\n  }\n\n  getActualArray() {\n    return this.actualArray;\n  }\n\n  getArray() {\n    return this.array;\n  }\n\n}\n\n\n\n//# sourceURL=webpack:///../creamie/arrayobserver.js?");

/***/ }),

/***/ "../creamie/binder.js":
/*!****************************!*\
  !*** ../creamie/binder.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Binder; });\n/* harmony import */ var _arrayobserver_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayobserver.js */ \"../creamie/arrayobserver.js\");\n/* harmony import */ var _pluginConnector_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pluginConnector.js */ \"../creamie/pluginConnector.js\");\n\n\nclass Binder {\n  constructor({\n    bindAttribute,\n    customElement,\n    getterMethods,\n    setterMethods,\n    destroyMethods,\n    excludePlugins\n  }) {\n    this.scopes = {}, this.domCache = [], this.dataCache = {}, this.uids = [], this.getterMethods = [], this.setterMethods = [], this.destroyMethods = [], this.bindAttribute = 'data', this.dom = customElement, this.pluginConnector = undefined;\n    this.getterMethods = Array.isArray(getterMethods) && getterMethods.length ? getterMethods : [];\n    this.setterMethods = Array.isArray(setterMethods) && setterMethods.length ? setterMethods : [];\n    this.destroyMethods = Array.isArray(destroyMethods) && destroyMethods.length ? destroyMethods : [];\n    this.pluginConnector = new _pluginConnector_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n      scopes: this.scopes,\n      dataCache: this.dataCache,\n      excludePlugins: excludePlugins\n    });\n\n    if (bindAttribute && bindAttribute.length > 2) {\n      this.bindAttribute = bindAttribute;\n      this.initListener(customElement);\n    } else if (bindAttribute) {\n      throw this.getError('BINDER_ATTRIBUTE_LENGTH', bindAttribute);\n    }\n  }\n\n  initListener(customElement, type) {\n    const _this = this;\n\n    let binderDoms = [];\n    [{\n      attribute: 'if',\n      elements: customElement.querySelectorAll('[if]')\n    }, {\n      attribute: 'loop',\n      elements: customElement.querySelectorAll('[loop]')\n    }, {\n      attribute: this.bindAttribute,\n      elements: customElement.querySelectorAll(`[${this.bindAttribute}]`)\n    }].forEach(data => {\n      data.elements.forEach(element => {\n        binderDoms.push(element);\n        let uid = (Date.now() + Math.random()).toString(36);\n\n        _this.uids.push(uid);\n\n        if (!Object.prototype.hasOwnProperty.call(element, 'creamie')) {\n          element.creamie = {\n            attributes: []\n          };\n        }\n\n        let property = element.getAttribute(data.attribute);\n        element.creamie.attributes.push({\n          name: data.attribute,\n          value: property\n        });\n        element.creamie[uid] = {\n          attribute: data.attribute,\n          property: property\n        };\n        element.removeAttribute(data.attribute);\n      });\n    });\n    this.domCache = [..._this.domCache, ...binderDoms];\n    let tempData = {};\n\n    if (type == 'reinit') {\n      tempData.domCache = binderDoms;\n      tempData.uidIndex = _this.uids.length - 1;\n    } else {\n      tempData.domCache = this.domCache;\n      tempData.uidIndex = 0;\n    }\n\n    tempData.domCache.forEach(element => {\n      let uid = _this.uids[tempData.uidIndex++];\n      let attribute = element.creamie[uid].attribute;\n      let property = element.creamie[uid].property;\n\n      if (_this.pluginConnector.isMatched({\n        element: element,\n        property: property,\n        type: 'getter',\n        attribute: attribute,\n        uid: uid\n      })) {\n        _this.pluginConnector.getter();\n      } else {\n        for (let i = 0; i < _this.getterMethods.length; i++) {\n          _this.dataCache[property] = {};\n\n          try {\n            let getterObj = _this.getterMethods[i]({\n              element: element,\n              data: _this.scopes,\n              property: property,\n              cache: _this.dataCache[property],\n              allCache: _this.dataCache,\n              uid: uid\n            });\n\n            if (getterObj.condition === true) {\n              getterObj.method();\n              break;\n            }\n          } catch (error) {\n            throw `[${property}] <= respective getterMethods[${i}] ` + error;\n          }\n        }\n      }\n\n      _this.addScopes(property);\n    });\n  }\n\n  addScopes(scopeProperty) {\n    let _this = this;\n\n    if (!Object.prototype.hasOwnProperty.call(_this.scopes, scopeProperty)) {\n      let currentValue;\n      Object.defineProperty(_this.scopes, scopeProperty, {\n        set: function (newValue) {\n          currentValue = newValue;\n\n          if (!(currentValue instanceof _arrayobserver_js__WEBPACK_IMPORTED_MODULE_0__[\"ArrayObserverType\"])) {\n            _this.domCache.forEach((element, index) => {\n              let uid = _this.uids[index];\n              let attribute = element.creamie[uid].attribute;\n              let property = element.creamie[uid].property;\n\n              if (property == scopeProperty) {\n                if (_this.pluginConnector.isMatched({\n                  element: element,\n                  property: scopeProperty,\n                  type: 'setter',\n                  currentValue: currentValue,\n                  oldValue: _this.scopes[scopeProperty],\n                  attribute: attribute,\n                  uid: uid\n                })) {\n                  _this.pluginConnector.setter();\n                } else {\n                  let passed = _this.ladderExecutor({\n                    currentValue: currentValue,\n                    element: element,\n                    data: _this.scopes,\n                    property: scopeProperty,\n                    cache: _this.dataCache[scopeProperty],\n                    allCache: _this.dataCache,\n                    uid: uid\n                  }, 'setterMethods');\n\n                  if (!passed && attribute != 'if' && attribute != 'loop') {\n                    element.innerText = newValue;\n                  }\n                }\n              }\n            });\n          }\n        },\n        get: function () {\n          return currentValue;\n        },\n        enumerable: true\n      });\n    }\n  }\n\n  setData(newScopes) {\n    let _this = this;\n\n    Object.keys(newScopes).forEach(property => {\n      if (Object.prototype.hasOwnProperty.call(_this.scopes, property)) {\n        _this.scopes[property] = newScopes[property];\n      }\n    });\n  }\n\n  ladderExecutor(dataObject, methodProperty) {\n    let passed = false;\n\n    for (let i = 0; i < this[methodProperty].length; i++) {\n      try {\n        let ladderObj = this[methodProperty][i](dataObject);\n\n        if (ladderObj.condition === true) {\n          ladderObj.method();\n          passed = true;\n          break;\n        }\n      } catch (error) {\n        throw `[${dataObject.property}] <= respective ${methodProperty}[${i}] :` + error;\n      }\n    }\n\n    return passed;\n  }\n\n  getCreamieNodes(element, attribute) {\n    const nodeIterator = document.createNodeIterator(element, NodeFilter.SHOW_ELEMENT, {\n      acceptNode(node) {\n        return node.creamie && node.creamie.attributes.find(data => {\n          return data.name == attribute;\n        }) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;\n      }\n\n    });\n    const nodes = [];\n    let currentNode;\n\n    while (currentNode = nodeIterator.nextNode()) {\n      nodes.push(currentNode);\n    }\n\n    return nodes;\n  }\n\n  free() {\n    let _this = this;\n\n    this.domCache.forEach((element, index) => {\n      let uid = _this.uids[index];\n      let property = element.creamie[uid].property;\n\n      if (_this.pluginConnector.isMatched({\n        element: element,\n        scopes: _this.scopes,\n        property: property,\n        dataCache: _this.dataCache,\n        type: 'getter'\n      })) {\n        _this.pluginConnector.destroyer();\n      } else if (Array.isArray(_this.destroyMethods) && _this.destroyMethods.length) {\n        _this.ladderExecutor({\n          element: element,\n          data: _this.scopes,\n          property: property,\n          cache: _this.dataCache[property],\n          allCache: _this.dataCache\n        }, 'destroyMethods');\n      }\n    });\n  }\n\n  get() {\n    return this.scopes;\n  }\n\n  getPluginMethods() {\n    return this.pluginConnector.pluginExtras;\n  }\n\n  getError(key, name) {\n    let errors = {\n      BINDER_ATTRIBUTE_LENGTH: `Keep the binder '${name}' attribute > 2 characters!`\n    };\n    return `Error[creamie]: ${errors[key]}`;\n  }\n\n}\n\n//# sourceURL=webpack:///../creamie/binder.js?");

/***/ }),

/***/ "../creamie/creamie.js":
/*!*****************************!*\
  !*** ../creamie/creamie.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Creamie; });\n/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./template.js */ \"../creamie/template.js\");\n/* harmony import */ var _binder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./binder.js */ \"../creamie/binder.js\");\n/* harmony import */ var _events_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./events.js */ \"../creamie/events.js\");\n\n\n\nclass Creamie extends HTMLElement {\n  constructor(component) {\n    super();\n    this.component = component;\n    this.dom = this.component.isShadowDom ? this._shadowRoot = this.attachShadow({\n      mode: this.component.shadowMode\n    }) : this;\n    let template = new _template_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.component.template, this.component.style, this.component.boot);\n    this.dom.appendChild(template.get());\n    this.binder = new _binder_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n      bindAttribute: this.component.binder,\n      customElement: this.dom.querySelector('body'),\n      getterMethods: component.getterMethods,\n      setterMethods: component.setterMethods,\n      destroyMethods: component.destroyMethods,\n      excludePlugins: component.excludePlugins\n    });\n    this.data = this.binder.get();\n    this.events = new _events_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.dom);\n\n    let _this = this;\n\n    let pluginMethods = this.binder.getPluginMethods();\n    Object.keys(pluginMethods).forEach(pluginName => {\n      _this[pluginName] = pluginMethods[pluginName];\n    });\n  }\n\n  disconnectedCallback() {\n    this.events.removeListeners();\n    this.binder.free();\n  }\n\n}\n\n//# sourceURL=webpack:///../creamie/creamie.js?");

/***/ }),

/***/ "../creamie/domrememberer.js":
/*!***********************************!*\
  !*** ../creamie/domrememberer.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return DOMRememberer; });\n/**\n * This class will remember the DOM.\n * It will disconnect the DOM and connect it back at the same position.\n */\nclass DOMRememberer {\n  constructor(current) {\n    this.current = current;\n    this.parent = this.current.parentNode;\n    this.next = this.current.nextSibling;\n  }\n\n  remove() {\n    this.current.remove();\n  }\n\n  insert() {\n    if (this.next) {\n      this.parent.insertBefore(this.current, this.next);\n    } else {\n      this.parent.appendChild(this.current);\n    }\n  }\n\n}\n\n//# sourceURL=webpack:///../creamie/domrememberer.js?");

/***/ }),

/***/ "../creamie/events.js":
/*!****************************!*\
  !*** ../creamie/events.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Events; });\nclass Events {\n  constructor(dom) {\n    this.dom = dom ? dom : document;\n    this.eventAttribute = 'e';\n    this.eventsCache = {};\n    this.methods = {};\n    this.evenConstants = {\n      NO_EVENT_FOUND: 'NO_EVENT_FOUND',\n      NO_METHOD_FOUND: 'NO_METHOD_FOUND'\n    };\n  }\n\n  init(methods) {\n    let _this = this;\n\n    this.methods = methods;\n\n    let elements = _this.dom.querySelectorAll(`[${_this.eventAttribute}]`);\n\n    elements.forEach(element => {\n      let values = element.getAttribute(_this.eventAttribute).split(':');\n      let eventName = values[0];\n      let methodName = values[1];\n\n      if (methods && methods[methodName]) {\n        _this.eventsCache[eventName] = true;\n      } else {\n        if (!methods[methodName]) {\n          throw _this.getError(this.evenConstants.NO_METHOD_FOUND, methodName);\n        }\n      }\n    });\n    let allEvents = Object.keys(_this.eventsCache);\n    allEvents.forEach(event => {\n      let eventController = e => {\n        let currentNode = e.target;\n        let parents = [];\n\n        while (currentNode.tagName != 'BODY') {\n          parents.push(currentNode);\n          currentNode = currentNode.parentNode;\n        }\n\n        let eventNodes = parents.filter(parent => parent.hasAttribute(_this.eventAttribute));\n        eventNodes.forEach(eventNode => {\n          let attrubuteValue = eventNode.getAttribute(_this.eventAttribute);\n          let values = attrubuteValue.split(':');\n          let methodName = values[1];\n          !e.cancelBubble && methodName && _this.methods[methodName] && _this.methods[methodName](e.target, e);\n        });\n      };\n\n      _this.eventsCache[event] = eventController;\n\n      _this.dom.addEventListener(event, eventController, true);\n    });\n  }\n\n  removeListeners() {\n    let _this = this;\n\n    Object.keys(_this.eventsCache).forEach(event => {\n      _this.dom.removeEventListener(event, _this.eventsCache[event]);\n    });\n  }\n\n  getError(key, name) {\n    let errors = {\n      NO_EVENT_FOUND: `There is no event called '${name}'`,\n      NO_METHOD_FOUND: `There is no method called '${name}'`\n    };\n    return `Error[creamie]: ${errors[key]}`;\n  }\n\n}\n\n//# sourceURL=webpack:///../creamie/events.js?");

/***/ }),

/***/ "../creamie/pluginConnector.js":
/*!*************************************!*\
  !*** ../creamie/pluginConnector.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _plugins_if_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./plugins/if.js */ \"../creamie/plugins/if.js\");\n/* harmony import */ var _plugins_loop_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plugins/loop.js */ \"../creamie/plugins/loop.js\");\n/* harmony import */ var _plugins_textfield_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./plugins/textfield.js */ \"../creamie/plugins/textfield.js\");\n/* harmony import */ var _plugins_select_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./plugins/select.js */ \"../creamie/plugins/select.js\");\n\n\n\n\n\nclass PluginConnector {\n  /**\n   * Constructor to initialize all required members\n   * @param {object} param0\n   * scopes, [refferenced object to map with DOM]\n   * dataCache, [extra data source to maintain operations and destroy in future]\n   * excludePlugins, [Default plugin classes to neglect while binding]\n   */\n  constructor({\n    scopes,\n    dataCache,\n    excludePlugins\n  }) {\n    this.scopes = scopes;\n    this.dataCache = dataCache;\n    this.excludePlugins = Array.isArray(excludePlugins) && excludePlugins.length ? excludePlugins : [];\n    this.plugins = [new _plugins_if_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](), new _plugins_loop_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](), new _plugins_textfield_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](), new _plugins_select_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]()];\n    this.pluginExtras = {};\n\n    let _this = this;\n\n    this.plugins.forEach(plugin => {\n      if (plugin.name && plugin.methods) {\n        _this.pluginExtras[plugin.name] = plugin.methods;\n      }\n    });\n    this.matchedCache = {\n      getter: {},\n      setter: {}\n    };\n  }\n  /**\n   * It will return a boolean if element match with plugin conditions\n   * @param {object} param0\n   * element, [current DOM element]\n   * property, [binded object's key]\n   * type, [string have getter, setter action]\n   * currentValue [assigned value with respect to the object's property],\n   * oldValue [value before currentValue]\n   */\n\n\n  isMatched({\n    element,\n    property,\n    type,\n    currentValue,\n    attribute,\n    oldValue,\n    uid\n  }) {\n    let matchUpObj = {\n      element: element,\n      scopes: this.scopes,\n      property: property,\n      dataCache: this.dataCache,\n      currentValue: currentValue,\n      oldValue: oldValue,\n      attribute: attribute,\n      uid: uid\n    }; // Exclude all given default plugins if anything have\n\n    let intersectedPlugins = this.pluginIntersector();\n\n    for (let i = 0; i < intersectedPlugins.length; i++) {\n      let plugin = intersectedPlugins[i];\n      let condition = plugin.isMatched(matchUpObj)[type];\n\n      if (typeof condition == 'boolean' && condition === true) {\n        matchUpObj.plugin = plugin;\n        this.matchedCache[type] = matchUpObj;\n        return true;\n      }\n    }\n\n    return false;\n  }\n  /**\n   * It will execute the matched plugin's getter method\n   */\n\n\n  getter() {\n    let elementGetter = this.matchedCache.getter;\n    elementGetter.plugin.get({\n      element: elementGetter.element,\n      scopes: elementGetter.scopes,\n      property: elementGetter.property,\n      dataCache: elementGetter.dataCache,\n      uid: elementGetter.uid\n    });\n  }\n  /**\n   * It will execute the matched plugin's setter method\n   */\n\n\n  setter() {\n    let elementSetter = this.matchedCache.setter;\n    elementSetter.plugin.set({\n      element: elementSetter.element,\n      currentValue: elementSetter.currentValue,\n      scopes: elementSetter.scopes,\n      property: elementSetter.property,\n      dataCache: elementSetter.dataCache,\n      oldValue: elementSetter.oldValue,\n      uid: elementSetter.uid\n    });\n  }\n  /**\n   * It will exclude the given default plugin from conditional ladder\n   */\n\n\n  pluginIntersector() {\n    let weakMap = new WeakMap();\n    let intersectedPlugins = [];\n\n    try {\n      this.excludePlugins.forEach((excludePlugin, index) => {\n        weakMap.set(excludePlugin, index);\n      });\n      this.plugins.forEach(plugin => {\n        if (!weakMap.has(plugin.constructor)) {\n          intersectedPlugins.push(plugin);\n        }\n      });\n    } catch (error) {\n      intersectedPlugins = this.plugins;\n      throw error;\n    }\n\n    return intersectedPlugins;\n  }\n  /**\n   * It will collect the methods to perform it at component's disconnected callback\n   */\n\n\n  destroyer() {\n    let elementDestroyer = this.matchedCache.getter;\n    elementDestroyer.plugin.destroy({\n      element: elementDestroyer.element,\n      scopes: elementDestroyer.scopes,\n      dataCache: elementDestroyer.dataCache,\n      property: elementDestroyer.property,\n      uid: elementDestroyer.uid\n    });\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (PluginConnector);\n\n//# sourceURL=webpack:///../creamie/pluginConnector.js?");

/***/ }),

/***/ "../creamie/plugins/if.js":
/*!********************************!*\
  !*** ../creamie/plugins/if.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return If; });\n/* harmony import */ var _domrememberer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../domrememberer.js */ \"../creamie/domrememberer.js\");\n\nclass If {\n  constructor() {\n    this.ifAttribute = 'if';\n  }\n\n  get({\n    element,\n    property,\n    dataCache\n  }) {\n    /**\n     * Register element to DOMRememberer to insert and remove\n     */\n    if (dataCache[property] == undefined) {\n      dataCache[property] = new Map();\n    }\n\n    let domRememberer = new _domrememberer_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](element);\n    dataCache[property].set(element, domRememberer);\n  }\n  /**\n   * It will get the new value from object and set it to the synced select\n   * @param {object} param0\n   * element, [current DOM element]\n   * currentValue, [assigned value with respect to the object's property]\n   * property, [Attribute value of if]\n   */\n\n\n  set({\n    element,\n    currentValue,\n    property,\n    dataCache\n  }) {\n    if (typeof currentValue == 'boolean') {\n      let domRemembererMap = dataCache[property];\n\n      if (currentValue && domRemembererMap) {\n        domRemembererMap.get(element).insert();\n      } else {\n        domRemembererMap.get(element).remove();\n      }\n    } else {\n      throw `${property} should be boolean type.`;\n    }\n  }\n  /**\n   * It will return object which contains the boolean value of getter, setter conditional statement\n   * @param {object} param0\n   * element [current DOM element]\n   */\n\n\n  isMatched({\n    element,\n    currentValue,\n    attribute,\n    uid\n  }) {\n    return {\n      getter: element.creamie[uid] && element.creamie[uid].attribute == this.ifAttribute && attribute == this.ifAttribute ? true : false,\n      setter: element.creamie[uid] && element.creamie[uid].attribute == this.ifAttribute && attribute == this.ifAttribute && typeof currentValue == 'boolean' ? true : false\n    };\n  }\n\n}\n\n//# sourceURL=webpack:///../creamie/plugins/if.js?");

/***/ }),

/***/ "../creamie/plugins/loop.js":
/*!**********************************!*\
  !*** ../creamie/plugins/loop.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Loop; });\n/* harmony import */ var _arrayobserver_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../arrayobserver.js */ \"../creamie/arrayobserver.js\");\n\nclass Loop {\n  constructor() {\n    this.name = 'loop';\n    this.loopAttribute = 'loop';\n    this.loopItemAttribute = 'el';\n    this.cloneCopy = {};\n    this.observeArray = {};\n    this.array = {};\n    this.elementList = {};\n    this.elementItemList = {};\n    this.methods = {};\n  }\n\n  get({\n    element,\n    property,\n    dataCache\n  }) {\n    if (dataCache[property] == undefined) {\n      dataCache[property] = new Map();\n    }\n\n    if (this.cloneCopy[property] == undefined) {\n      this.cloneCopy[property] = new Map();\n    }\n\n    let clonedElement = element.cloneNode(true);\n    this.cloneCopy[property].set(element, clonedElement);\n    dataCache[property].set(element, {\n      next: element.nextSibling,\n      parent: element.parentNode\n    });\n    this.observeArray[property] = new Map();\n    this.elementList[property] = new Map();\n    this.elementItemList[property] = new Map();\n    this.array[property] = new Map();\n    element.remove();\n    this.methods[property] = {};\n\n    this.methods[property].setPreprocessor = method => {\n      this.methods[property].preProcessor = method;\n    };\n  }\n  /**\n   * It will get the new value from object and set it to the synced select\n   * @param {object} param0\n   * element, [current DOM element]\n   * currentValue, [assigned value with respect to the object's property]\n   * property, [Attribute value of if]\n   */\n\n\n  set({\n    element,\n    currentValue,\n    scopes,\n    property,\n    dataCache\n  }) {\n    this.observeArray[property].set(element, currentValue);\n    let arrayObserver = new _arrayobserver_js__WEBPACK_IMPORTED_MODULE_0__[\"ArrayObserver\"](this.observeArray[property].get(element), ({\n      type,\n      index,\n      value\n    }) => {\n      // deleteProperty in Proxy is not widely call multiple instances.\n      // So we are manually iterating callbacks\n      if (type == 'removed') {\n        for (let keyElement of dataCache[property].keys()) {\n          this.observerCallback({\n            property: property,\n            type: type,\n            index: index,\n            value: value,\n            dataCache: dataCache,\n            element: keyElement\n          });\n        }\n      } else {\n        this.observerCallback({\n          property: property,\n          type: type,\n          index: index,\n          value: value,\n          dataCache: dataCache,\n          element: element\n        });\n      }\n    });\n    scopes[property] = arrayObserver.getArray();\n    this.array[property].set(element, arrayObserver.getActualArray());\n    let elementList = this.elementList[property].get(element);\n\n    for (let index = 0; elementList && index < elementList.length; index++) {\n      elementList[index].remove();\n    }\n\n    this.extend(property, currentValue, undefined, dataCache, element);\n  }\n  /**\n   *\n   * @param {string} property\n   * @param {Array} items\n   * passing indices indicates appending new items at bottom of listed items\n   * @param {Array} indices\n   * @param {object} dataCache\n   * Below method will append additional items\n   */\n\n\n  extend(property, items, indices, dataCache, element) {\n    /* Below block of code will refresh the items container if there is new set of data assigned */\n    let rootFragment = document.createDocumentFragment();\n    let elementList = this.elementList[property].get(element) || [];\n    let elementItemList = this.elementItemList[property].get(element) || [];\n\n    for (let index = 0; index < items.length; index++) {\n      let newElement = this.cloneCopy[property].get(element).cloneNode(true);\n\n      if (indices) {\n        elementList[indices[index]] = newElement;\n        elementItemList[indices[index]] = this.getLoopElements(newElement);\n      } else {\n        elementList[index] = newElement;\n        elementItemList[index] = this.getLoopElements(newElement);\n      }\n\n      newElement.removeAttribute(this.loopAttribute);\n      rootFragment.append(newElement);\n    }\n\n    this.elementList[property].set(element, elementList);\n    this.elementItemList[property].set(element, elementItemList);\n\n    for (let index = 0; index < items.length; index++) {\n      let item = items[index];\n\n      if (indices) {\n        this.insertData(item, property, indices[index], element);\n      } else {\n        this.insertData(item, property, index, element);\n      }\n    }\n\n    let localDataCache = dataCache[property].get(element);\n\n    if (localDataCache.next) {\n      localDataCache.parent.insertBefore(rootFragment, localDataCache.next);\n    } else {\n      localDataCache.parent.appendChild(rootFragment);\n    }\n  }\n  /**\n   * @param {HTMLElement} element\n   * @returns {object}\n   */\n\n\n  getLoopElements(element) {\n    let _this = this;\n\n    let elements = element.querySelectorAll(`[${this.loopItemAttribute}]`);\n    let array = [];\n    elements.forEach(el => {\n      let elProperty = el.getAttribute(_this.loopItemAttribute);\n\n      if (elProperty) {\n        array.push({\n          property: elProperty,\n          element: el\n        });\n        el.removeAttribute(_this.loopItemAttribute);\n      }\n    });\n    return array;\n  }\n  /**\n   * This method will insert `obj` data towards the cloned fragment\n   * @param {Object} obj\n   * @param {string} property\n   * @param {number} index\n   */\n\n\n  insertData(obj, property, index, element) {\n    this.methods[property] && this.methods[property].preProcessor && this.methods[property].preProcessor(obj, index);\n    let elementList = this.elementItemList[property].get(element);\n    elementList[index].forEach(elData => {\n      let data = obj[elData.property];\n\n      if (data) {\n        elData.element.innerText = data;\n      }\n    });\n  }\n\n  observerCallback({\n    property,\n    type,\n    index,\n    value,\n    dataCache,\n    element\n  }) {\n    let elementList = this.elementList[property].get(element);\n\n    switch (type) {\n      case 'added':\n        this.extend(property, [value], [index], dataCache, element);\n        break;\n\n      case 'removed':\n        elementList[index].remove();\n        elementList.splice(index, 1);\n        break;\n\n      case 'modified':\n        this.insertData(value, property, index, element);\n        break;\n    }\n  }\n  /**\n   * It will return object which contains the boolean value of getter, setter conditional statement\n   * @param {object} param0\n   * element [current DOM element]\n   */\n\n\n  isMatched({\n    element,\n    currentValue,\n    attribute,\n    uid\n  }) {\n    return {\n      getter: element.creamie[uid] && element.creamie[uid].attribute == this.loopAttribute && attribute == this.loopAttribute ? true : false,\n      setter: element.creamie[uid] && element.creamie[uid].attribute == this.loopAttribute && attribute == this.loopAttribute && Array.isArray(currentValue) ? true : false\n    };\n  }\n\n}\n\n//# sourceURL=webpack:///../creamie/plugins/loop.js?");

/***/ }),

/***/ "../creamie/plugins/select.js":
/*!************************************!*\
  !*** ../creamie/plugins/select.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Select; });\nclass Select {\n  /**\n   * It will register a listener to perform a data transfer from select to object\n   * @param {object} param0\n   * element, [current DOM element]\n   * scopes, [refferenced object to map with DOM]\n   * property, [binded object's key]\n   * dataCache, [extra data source to maintain operations and destroy in future]\n   */\n  get({\n    element,\n    scopes,\n    property,\n    dataCache\n  }) {\n    let eventController = () => {\n      scopes[property] = element.value;\n    };\n\n    element.addEventListener('change', eventController, true);\n    dataCache[property] = {\n      event: 'change',\n      method: eventController\n    };\n  }\n  /**\n   * It will get the new value from object and set it to the synced select\n   * @param {object} param0\n   * element, [current DOM element]\n   * currentValue, [assigned value with respect to the object's property]\n   */\n\n\n  set({\n    element,\n    currentValue\n  }) {\n    element.value = currentValue;\n  }\n  /**\n   * It will return object which contains the boolean value of getter, setter conditional statement\n   * @param {object} param0\n   * element [current DOM element]\n   */\n\n\n  isMatched({\n    element\n  }) {\n    return {\n      getter: element.type && element.type == 'select-one' ? true : false,\n      setter: element.type && element.type == 'select-one' ? true : false\n    };\n  }\n  /**\n   * It will remove the event listeners\n   * @param {object} param0\n   * element, [current DOM element]\n   * dataCache, [extra data source to maintain operations and destroy in future]\n   */\n\n\n  destroy({\n    element,\n    dataCache\n  }) {\n    element.removeEventListener(dataCache.event, dataCache.method);\n  }\n\n}\n\n//# sourceURL=webpack:///../creamie/plugins/select.js?");

/***/ }),

/***/ "../creamie/plugins/textfield.js":
/*!***************************************!*\
  !*** ../creamie/plugins/textfield.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return TextField; });\nclass TextField {\n  /**\n   * It will register a listener to perform a data transfer from textfield to object\n   * @param {object} param0\n   * element, [current DOM element]\n   * scopes, [refferenced object to map with DOM]\n   * property, [binded object's key]\n   * dataCache, [extra data source to maintain operations and destroy in future]\n   */\n  get({\n    element,\n    scopes,\n    property,\n    dataCache\n  }) {\n    let eventController = () => {\n      scopes[property] = element.value;\n    };\n\n    element.addEventListener('keyup', eventController, true); // assigning event details to remove it when component destroys\n\n    dataCache[property] = {\n      event: 'keyup',\n      method: eventController\n    };\n  }\n  /**\n   * It will get the new value from object and set it to the synced textfield\n   * @param {object} param0\n   * element, [current DOM element]\n   * currentValue, [assigned value with respect to the object's property]\n   */\n\n\n  set({\n    element,\n    currentValue\n  }) {\n    element.value = currentValue;\n  }\n  /**\n   * It will return object which contains the boolean value of getter, setter conditional statement\n   * @param {object} param0\n   * element [current DOM element]\n   */\n\n\n  isMatched({\n    element\n  }) {\n    return {\n      getter: element.type && (element.type === 'text' || element.type === 'textarea') ? true : false,\n      setter: element.type && (element.type === 'text' || element.type === 'textarea') ? true : false\n    };\n  }\n  /**\n   * It will remove the event listeners\n   * @param {object} param0\n   * element, [current DOM element]\n   * dataCache, [extra data source to maintain operations and destroy in future]\n   */\n\n\n  destroy({\n    element,\n    dataCache\n  }) {\n    element.removeEventListener(dataCache.event, dataCache.method);\n  }\n\n}\n\n//# sourceURL=webpack:///../creamie/plugins/textfield.js?");

/***/ }),

/***/ "../creamie/template.js":
/*!******************************!*\
  !*** ../creamie/template.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Template; });\nconst TemplateConstants = {\n  STYLE: 'style',\n  TYPE: 'text/html'\n};\nclass Template {\n  constructor(template, style, boot) {\n    this.template = template;\n    this.style = style;\n    this.boot = boot;\n  }\n\n  getHTML() {\n    return this.boot[this.template];\n  }\n\n  getCSS() {\n    return this.boot[this.style];\n  }\n\n  get() {\n    const template = document.createDocumentFragment();\n    const style = document.createElement(TemplateConstants.STYLE);\n    const styleContent = document.createTextNode(this.getCSS());\n    const parser = new DOMParser();\n    const templateContent = parser.parseFromString(this.getHTML(), TemplateConstants.TYPE);\n    style.appendChild(styleContent);\n    template.appendChild(style);\n    template.appendChild(templateContent.body);\n    return template;\n  }\n\n}\n\n//# sourceURL=webpack:///../creamie/template.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.css":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.css ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \"body {\\n  background-color: #e5d5bf; }\\n\\ninput {\\n  border: 1px solid #efefef;\\n  padding: 10px;\\n  margin: 10px; }\\n\\n.lobster {\\n  font-family: 'Lobster', cursive, sans-serif; }\\n\\nbody {\\n  background-color: #e5d5bf; }\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/styles/main.css?./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (useSourceMap) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item, useSourceMap);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \" {\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join('');\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery, dedupe) {\n    if (typeof modules === 'string') {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var i = 0; i < this.length; i++) {\n        // eslint-disable-next-line prefer-destructuring\n        var id = this[i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = [].concat(modules[_i]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        // eslint-disable-next-line no-continue\n        continue;\n      }\n\n      if (mediaQuery) {\n        if (!item[2]) {\n          item[2] = mediaQuery;\n        } else {\n          item[2] = \"\".concat(mediaQuery, \" and \").concat(item[2]);\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring\n\n  var cssMapping = item[3];\n\n  if (!cssMapping) {\n    return content;\n  }\n\n  if (useSourceMap && typeof btoa === 'function') {\n    var sourceMapping = toComment(cssMapping);\n    var sourceURLs = cssMapping.sources.map(function (source) {\n      return \"/*# sourceURL=\".concat(cssMapping.sourceRoot || '').concat(source, \" */\");\n    });\n    return [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n  }\n\n  return [content].join('\\n');\n} // Adapted from convert-source-map (MIT)\n\n\nfunction toComment(sourceMap) {\n  // eslint-disable-next-line no-undef\n  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n  var data = \"sourceMappingURL=data:application/json;charset=utf-8;base64,\".concat(base64);\n  return \"/*# \".concat(data, \" */\");\n}\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nvar stylesInDom = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDom.length; i++) {\n    if (stylesInDom[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var index = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3]\n    };\n\n    if (index !== -1) {\n      stylesInDom[index].references++;\n      stylesInDom[index].updater(obj);\n    } else {\n      stylesInDom.push({\n        identifier: identifier,\n        updater: addStyle(obj, options),\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n  var attributes = options.attributes || {};\n\n  if (typeof attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : undefined;\n\n    if (nonce) {\n      attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(attributes).forEach(function (key) {\n    style.setAttribute(key, attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.media ? \"@media \".concat(obj.media, \" {\").concat(obj.css, \"}\") : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  } else {\n    style.removeAttribute('media');\n  }\n\n  if (sourceMap && typeof btoa !== 'undefined') {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    if (Object.prototype.toString.call(newList) !== '[object Array]') {\n      return;\n    }\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDom[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDom[_index].references === 0) {\n        stylesInDom[_index].updater();\n\n        stylesInDom.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./src/app/app-boot.js":
/*!*****************************!*\
  !*** ./src/app/app-boot.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  \"app-component.html\": \"<board-component></board-component>\",\n  \"app-component.css\": \".sample {\\r  background: #fff;\\r  border: 1px solid #efefef;\\r  border-radius: 2px;\\r  padding: 10px;\\r  margin: auto;\\r  text-align: center;\\r  width: 20%;\\r  margin-top: 5%;\\r}\\r\\r.creamieFont {\\r  font-size: 24pt;\\r  font-weight: bold;\\r  color: #945f31;\\r  overflow: hidden;\\r  text-overflow: ellipsis;\\r  width: 100%;\\r}\\r\\r.version {\\r  padding: 3px;\\r  background: #e8e8e8;\\r  color: #6b6b6b;\\r  display: inline-block;\\r  text-align: center;\\r  width: 65px;\\r  margin-top: 10px;\\r  border-radius: 3px;\\r  font-family: monospace;\\r}\\r\\r.row {\\r  width: 100%;\\r  height: 100%;\\r}\\r\\r.col {\\r  width: 100px;\\r  height: 100px;\\r}\"\n});\n\n//# sourceURL=webpack:///./src/app/app-boot.js?");

/***/ }),

/***/ "./src/app/app-component.js":
/*!**********************************!*\
  !*** ./src/app/app-component.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return App; });\n/* harmony import */ var _creamie_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @creamie/core */ \"../creamie/creamie.js\");\n/* harmony import */ var _app_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-config */ \"./src/app/app-config.js\");\n\n\nclass App extends _creamie_core__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor() {\n    super(_app_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n    console.log('App constructor!');\n  }\n\n  connectedCallback() {\n    console.log('connected!');\n  }\n\n}\nwindow.customElements.define(_app_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].tag, App);\n\n//# sourceURL=webpack:///./src/app/app-component.js?");

/***/ }),

/***/ "./src/app/app-config.js":
/*!*******************************!*\
  !*** ./src/app/app-config.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _app_boot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-boot.js */ \"./src/app/app-boot.js\");\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  template: `app-component.html`,\n  style: `app-component.css`,\n  tag: 'app-component',\n  isShadowDom: false,\n  shadowMode: 'open',\n  binder: 'data',\n  boot: _app_boot_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n});\n\n//# sourceURL=webpack:///./src/app/app-config.js?");

/***/ }),

/***/ "./src/board/board-boot.js":
/*!*********************************!*\
  !*** ./src/board/board-boot.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  \"board-component.html\": \"<div>  <div class=\\\"header\\\">    <div class=\\\"large-text\\\">Snake Game</div>    <div class=\\\"small-text\\\">Built on <a href=\\\"https://creamie.io\\\">creamie.io</a></div>    <div>        Score : <span data=\\\"score\\\"></span>    </div>    <div>        <button e=\\\"click:reInit\\\">Reset</button>    </div>  </div>  <div id=\\\"board\\\">    <p loop=\\\"cells\\\"></p>  </div>  <div class=\\\"header\\\">    <table style=\\\"margin: auto;\\\">        <tr>            <td></td>            <td e=\\\"click:up\\\" class=\\\"arrow-key\\\">UP</td>            <td></td>        </tr>        <tr>            <td e=\\\"click:left\\\" class=\\\"arrow-key\\\">LEFT</td>            <td></td>            <td e=\\\"click:right\\\" class=\\\"arrow-key\\\">RIGHT</td>        </tr>        <tr>            <td></td>            <td e=\\\"click:down\\\" class=\\\"arrow-key\\\">DOWN</td>            <td></td>        </tr>    </table>  </div></div>\",\n  \"board-component.css\": \".header {    margin: auto;    width: 100%;    text-align: center;}.large-text {    font-size: larger;    font-weight: bold;}.medium-text {    font-size: medium;}.score {    font-size: 2rem;}#board {  background: #fff;  border: 1px solid #efefef;  border-radius: 2px;  margin: auto;  text-align: center;  width: 50%;  margin-top: 5%;  display: flex;  flex-wrap: wrap;}p {  width: 10px;  height: 10px;  margin: 0px;  border: 1px solid #efefef;}.arrow-key {    background-color: blue;    color: cornsilk;    border-radius: 3px;    padding: 5px;    width: 65px;    cursor: pointer;}\"\n});\n\n//# sourceURL=webpack:///./src/board/board-boot.js?");

/***/ }),

/***/ "./src/board/board-component.js":
/*!**************************************!*\
  !*** ./src/board/board-component.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Board; });\n/* harmony import */ var _creamie_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @creamie/core */ \"../creamie/creamie.js\");\n/* harmony import */ var _board_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./board-config */ \"./src/board/board-config.js\");\n\n\nconst Type = {\n  SPACE: 0,\n  FOOD: 1,\n  SNAKE: 2\n};\nconst BoardProps = {\n  WIDHT: 60,\n  HEIGHT: 60\n};\nconst Direction = {\n  TOP: -BoardProps.HEIGHT,\n  BOTTOM: BoardProps.HEIGHT,\n  LEFT: -1,\n  RIGHT: 1\n};\n\nclass Node {\n  constructor(data) {\n    this.data = data;\n    this.next = null;\n  }\n\n}\n\nclass Board extends _creamie_core__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor() {\n    super(_board_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n  }\n\n  connectedCallback() {\n    this.board = document.getElementById(\"board\");\n    this.board.style.width = `${BoardProps.WIDHT * 10 + 2 * BoardProps.WIDHT}px`;\n    this.board.style.height = `${BoardProps.HEIGHT * 10 + 2 * BoardProps.WIDHT}px`;\n    this.cells = this.board.children;\n    this.init();\n    this.events.init({\n      reInit: () => {\n        this.init();\n      },\n      up: () => {\n        this.setDirection(Direction.TOP);\n      },\n      left: () => {\n        this.setDirection(Direction.LEFT);\n      },\n      right: () => {\n        this.setDirection(Direction.RIGHT);\n      },\n      down: () => {\n        this.setDirection(Direction.BOTTOM);\n      }\n    });\n  }\n\n  play() {\n    this.snakeRunInterval = setInterval(() => {\n      this.moveSnake();\n    }, 100);\n  }\n\n  pause() {\n    clearInterval(this.snakeRunInterval);\n  }\n\n  init() {\n    this.data.score = 0;\n    let middleCell = BoardProps.HEIGHT * BoardProps.WIDHT / 2 + BoardProps.WIDHT / 2;\n    this.snakeHead = new Node(middleCell);\n    this.boundaryValue = {\n      LEFT: 0,\n      RIGHT: BoardProps.WIDHT - 1,\n      TOP: 0,\n      BOTTOM: BoardProps.WIDHT * BoardProps.HEIGHT - 1\n    };\n    this.currentDirection = Direction.LEFT;\n    this.snakeSet = new Set();\n    [...new Array(5)].forEach(() => this.growSnake());\n    this.data.cells = new Array(BoardProps.WIDHT * BoardProps.HEIGHT).fill({\n      type: Type.SPACE\n    });\n    this.loop.cells.setPreprocessor((data, index) => {\n      if (this.cells[index]) {\n        switch (data.type) {\n          case Type.SPACE:\n            this.cells[index].style.backgroundColor = \"\";\n            break;\n\n          case Type.FOOD:\n            this.cells[index].style.backgroundColor = \"chartreuse\";\n            break;\n\n          case Type.SNAKE:\n            this.cells[index].style.backgroundColor = \"blue\";\n            break;\n        }\n      }\n    });\n    this.drawFood();\n    this.drawSnake();\n    document.addEventListener(\"keydown\", e => {\n      let inputDirection = null;\n\n      switch (e.key) {\n        case \"ArrowLeft\":\n          inputDirection = Direction.LEFT;\n          break;\n\n        case \"ArrowUp\":\n          inputDirection = Direction.TOP;\n          break;\n\n        case \"ArrowRight\":\n          inputDirection = Direction.RIGHT;\n          break;\n\n        case \"ArrowDown\":\n          inputDirection = Direction.BOTTOM;\n          break;\n      }\n\n      this.setDirection(inputDirection);\n    });\n    this.play();\n  }\n\n  drawSnake() {\n    let tempSnake = this.snakeHead;\n\n    while (tempSnake != null) {\n      this.data.cells[tempSnake.data] = {\n        type: Type.SNAKE\n      };\n      tempSnake = tempSnake.next;\n    }\n\n    let row = Math.floor(this.snakeHead.data / BoardProps.WIDHT);\n    this.boundaryValue.LEFT = row * BoardProps.WIDHT;\n    this.boundaryValue.RIGHT = this.boundaryValue.LEFT + BoardProps.WIDHT - 1;\n  }\n\n  getRandomFoodCell() {\n    this.currentFoodCell = Math.ceil(Math.random() * (BoardProps.WIDHT * BoardProps.HEIGHT));\n    console.log(this.currentFoodCell);\n    return this.currentFoodCell;\n  }\n\n  drawFood() {\n    this.data.cells[this.getRandomFoodCell()] = {\n      type: Type.FOOD\n    };\n  }\n\n  setDirection(inputDirection) {\n    if (this.currentDirection == Direction.LEFT && inputDirection != Direction.RIGHT || this.currentDirection == Direction.RIGHT && inputDirection != Direction.LEFT || this.currentDirection == Direction.TOP && inputDirection != Direction.BOTTOM || this.currentDirection == Direction.BOTTOM && inputDirection != Direction.TOP) {\n      this.currentDirection = inputDirection;\n    }\n  }\n\n  moveSnake() {\n    let tempSnake = this.snakeHead;\n    let cellValue = tempSnake.data + this.currentDirection;\n\n    if (!this.isSnakeDead(cellValue)) {\n      let prevData = tempSnake.data;\n      this.snakeSet.add(prevData);\n      tempSnake.data = cellValue;\n      tempSnake = tempSnake.next;\n\n      while (tempSnake != null) {\n        let tempData = tempSnake.data;\n        tempSnake.data = prevData;\n        prevData = tempData;\n        tempSnake = tempSnake.next;\n      }\n\n      this.snakeSet.delete(prevData);\n      this.data.cells[prevData] = {\n        type: Type.SPACE\n      };\n      this.drawSnake();\n\n      if (cellValue == this.currentFoodCell) {\n        this.data.score = this.data.score + 1;\n        this.growSnake();\n        this.drawFood();\n      }\n    } else {\n      this.pause();\n    }\n  }\n\n  growSnake() {\n    let decidedCell = this.snakeHead.data + this.currentDirection;\n    let newHead = new Node(decidedCell);\n    this.snakeSet.add(decidedCell);\n    newHead.next = this.snakeHead;\n    this.snakeHead = newHead;\n  }\n\n  isSnakeDead(cellValue) {\n    if (this.isSnakeReachedEnd(cellValue)) {\n      alert(\"Game Over! Snake crashed on wall\");\n      return true;\n    } else if (this.snakeSet.has(cellValue)) {\n      alert(\"Game Over! Snake self-destructed\");\n      return true;\n    }\n\n    return false;\n  }\n\n  isSnakeReachedEnd(cellValue) {\n    switch (this.currentDirection) {\n      case Direction.TOP:\n        return cellValue < this.boundaryValue.TOP;\n\n      case Direction.BOTTOM:\n        return cellValue > this.boundaryValue.BOTTOM;\n\n      case Direction.LEFT:\n        return cellValue < this.boundaryValue.LEFT;\n\n      case Direction.RIGHT:\n        return cellValue > this.boundaryValue.RIGHT;\n    }\n  }\n\n}\nwindow.customElements.define(_board_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].tag, Board);\n\n//# sourceURL=webpack:///./src/board/board-component.js?");

/***/ }),

/***/ "./src/board/board-config.js":
/*!***********************************!*\
  !*** ./src/board/board-config.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _board_boot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board-boot.js */ \"./src/board/board-boot.js\");\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  template: 'board-component.html',\n  style: 'board-component.css',\n  tag: 'board-component',\n  isShadowDom: false,\n  shadowMode: 'open',\n  binder: 'data',\n  boot: _board_boot_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n});\n\n//# sourceURL=webpack:///./src/board/board-config.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_main_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/main.css */ \"./src/styles/main.css\");\n/* harmony import */ var _styles_main_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_main_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _app_app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/app-component */ \"./src/app/app-component.js\");\n/* harmony import */ var _board_board_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./board/board-component */ \"./src/board/board-component.js\");\n\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/styles/main.css":
/*!*****************************!*\
  !*** ./src/styles/main.css ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./main.css */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.css\");\n\n            content = content.__esModule ? content.default : content;\n\n            if (typeof content === 'string') {\n              content = [[module.i, content, '']];\n            }\n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = api(content, options);\n\n\n\nmodule.exports = content.locals || {};\n\n//# sourceURL=webpack:///./src/styles/main.css?");

/***/ })

/******/ });