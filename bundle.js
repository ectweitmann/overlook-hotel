/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_base_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_base_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_base_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
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
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
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
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _images_overlook_view_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
// Imports




var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_images_overlook_view_png__WEBPACK_IMPORTED_MODULE_3__.default);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* http://meyerweb.com/eric/tools/css/reset/\n  v2.0 | 20110126\n  License: none (public domain)\n*/\nhtml, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p,\nblockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em,\nimg, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u,\ni, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,\ncaption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details,\nembed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby,\nsection, summary, time, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block;\n}\n\nbody {\n  line-height: 1;\n}\n\nol, ul {\n  list-style: none;\n}\n\nblockquote, q {\n  quotes: none;\n}\n\nblockquote:before, blockquote:after, q:before, q:after {\n  content: \"\";\n  content: none;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\nbutton {\n  margin: 0px;\n  padding: 0px;\n  border: none;\n  cursor: pointer;\n}\n\n* {\n  font-family: \"Prompt\", sans-serif !important;\n}\n\nbody {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-around;\n  align-items: center;\n  height: 100vh;\n  width: 100%;\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-size: 100% 100%;\n}\n\nh1 {\n  font-size: xxx-large;\n  transform: translateY(10px);\n}\n\nh1,\nh2,\n.link {\n  color: white;\n}\n\nh2,\n.link,\n.book-now,\n.confirm-booking,\n.decline-booking,\n.login-text {\n  font-size: xx-large;\n}\n\nmain {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-evenly;\n  align-items: center;\n  height: 90%;\n  width: 90%;\n}\n\n.login {\n  height: 100vh;\n  width: 50%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n.login h1 {\n  transform: translateY(-10px);\n}\n\n.login-container {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  height: 50%;\n  width: 70%;\n  border-radius: 4px;\n  outline-color: #FFA726;\n  outline-offset: -6px;\n  outline-width: medium;\n  outline-style: solid;\n  background-color: white;\n  box-sizing: border-box;\n  border: 2px solid black;\n  box-shadow: 0px 0px 10px black;\n}\n\n.login-wrapper {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-around;\n  align-items: center;\n  height: 80%;\n  width: 80%;\n}\n\n.login-text {\n  color: black;\n  font-weight: 400;\n  transform: translateY(-10px);\n}\n\n.login-input-wrapper {\n  transform: scale(1.4);\n}\n\n.button-submit {\n  border: 1px solid black;\n}\n\n.main-column-left {\n  height: 80%;\n  width: 45%;\n}\n\n.your-bookings-container {\n  display: flex;\n  flex-direction: column;\n  justify-content: none;\n  align-items: center;\n  height: 92%;\n  width: 100%;\n  position: relative;\n  overflow-y: scroll;\n  transform: translateY(6px);\n  padding-top: 4px;\n}\n\n.panel {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  height: 30%;\n  width: 98%;\n  border-radius: 4px;\n  background: white;\n  margin-bottom: 3%;\n}\n\n.no-results {\n  justify-content: center;\n}\n\n.booked-rooms {\n  cursor: default;\n  pointer-events: none;\n}\n.booked-rooms:focus {\n  outline-color: #FFA726;\n  outline-offset: 1px;\n  outline-width: 3px;\n  outline-style: solid;\n}\n\n.booking-image {\n  height: 95%;\n  width: 220px;\n  border-radius: 4px;\n  margin-left: 1%;\n}\n\n.booking-info {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  align-items: flex-start;\n  height: 30%;\n  width: 95%;\n  font-size: medium;\n}\n\n.panel-right-side {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-around;\n  align-items: flex-start;\n  height: 100%;\n  width: 58%;\n}\n\n.panel-title,\n.section-title {\n  font-size: x-large;\n}\n\n.panel-right-bottom {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: flex-end;\n  height: none;\n  width: 95%;\n}\n\n.available-room:hover, .available-room:focus {\n  outline-color: #FFA726;\n  outline-offset: 1px;\n  outline-width: 3px;\n  outline-style: solid;\n}\n\n.room-amenities {\n  text-align: left;\n}\n\nli::before {\n  content: \"+ \";\n}\n\n.price {\n  font-size: xx-large;\n  margin-bottom: -10px;\n}\n\n.price-label {\n  text-align: right;\n}\n\n.main-column-right {\n  display: flex;\n  flex-direction: column;\n  justify-content: none;\n  align-items: none;\n  height: 80%;\n  width: 45%;\n}\n\nnav {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-end;\n  align-items: center;\n  height: 34px;\n  width: none;\n}\nnav .link {\n  background-color: transparent;\n  text-align: right;\n  cursor: pointer;\n}\nnav .link:focus {\n  text-decoration: underline;\n  text-decoration-color: #FFA726;\n  outline: none;\n}\nnav .separator {\n  color: #FFA726;\n  padding: 0px 15px;\n  cursor: default;\n}\n\n.current-view {\n  color: #999999;\n  cursor: default;\n  pointer-events: none;\n}\n\n.main-column-right-sections-container {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  align-items: none;\n  height: 100%;\n  width: none;\n  padding-top: 8px;\n}\n\n.cost-info-container {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  align-items: none;\n  height: 33%;\n  width: none;\n  border-radius: 4px;\n  box-sizing: border-box;\n  padding: 4%;\n  background: white;\n}\n\n.cost-wrapper {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: none;\n}\n\n.input-wrapper {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-around;\n  align-items: none;\n}\n\n.cost-label {\n  align-self: flex-end;\n}\n\n.cost {\n  font-size: xxx-large;\n  color: black;\n}\n\n.date-wrapper,\n.dropdown-wrapper,\n.login-input-wrapper {\n  display: flex;\n  flex-direction: column;\n  justify-content: none;\n  align-items: none;\n}\n\nlabel {\n  font-size: small;\n  padding-left: 3px;\n  padding-bottom: 3px;\n}\n\n.input-date,\n.input-room-type,\n.search-rooms {\n  border-radius: 4px;\n  border: 1px solid black;\n  text-align: center;\n  font-size: medium;\n  cursor: pointer;\n}\n.input-date:hover,\n.input-room-type:hover,\n.search-rooms:hover {\n  border: 1px solid #FFA726;\n}\n.input-date:focus,\n.input-room-type:focus,\n.search-rooms:focus {\n  outline-color: #FFA726;\n  outline-offset: 0px;\n  outline-width: 1px;\n  outline-style: solid;\n  border: none;\n}\n\n.input-date {\n  height: 41px;\n  width: 155px;\n}\n\n.input-room-type {\n  height: 44px;\n  width: 200px;\n}\n\n.search-rooms,\n.button-submit {\n  height: 44px;\n  width: 150px;\n  border-radius: 4px;\n  transform: translateY(16px);\n  background: white;\n  color: black;\n}\n.search-rooms:hover,\n.button-submit:hover {\n  background-color: #FFA726;\n  border: 1px solid black;\n  color: white;\n  text-shadow: 0px 0px 5px black;\n}\n\n.prompt-button-container {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  height: 65%;\n  width: 100%;\n}\n\n.prompt-button-wrapper {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-evenly;\n  align-items: center;\n  height: 100%;\n  width: 100%;\n}\n\n.prompt-background {\n  box-sizing: border-box;\n  border: 5px dotted #FFA726;\n  border-radius: 4px;\n}\n\n.greeting,\n.prompt {\n  color: white;\n  text-shadow: -3px -2px 0px black;\n  text-align: center;\n  font-size: 50px;\n}\n\n.prompt {\n  padding: 0px 10px;\n}\n\n.greeting {\n  margin: 0px;\n}\n\nspan {\n  text-decoration: underline;\n  text-decoration-color: #FFA726;\n}\n\n.button-wrapper {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-evenly;\n  align-items: center;\n  height: 80px;\n  width: 100%;\n}\n\n.book-now,\n.confirm-booking,\n.decline-booking {\n  height: 80px;\n  width: 280px;\n  border-radius: 4px;\n  background: #FFA726;\n  border: none;\n  color: white;\n  font-weight: 500;\n  text-shadow: 0px 0px 5px black;\n}\n.book-now:hover, .book-now:focus,\n.confirm-booking:hover,\n.confirm-booking:focus,\n.decline-booking:hover,\n.decline-booking:focus {\n  outline-color: white;\n  outline-offset: 1px;\n  outline-width: 3px;\n  outline-style: solid;\n}\n\n.confirm-booking,\n.decline-booking {\n  height: 80px;\n  width: 200px;\n}\n\n.invalid {\n  border: 3px solid red;\n}\n.invalid:hover {\n  border: 3px solid red;\n}\n\n.not-clickable {\n  pointer-events: none;\n}\n\n.disabled {\n  pointer-events: none;\n  color: #696969;\n  border-color: #696969;\n}\n.disabled:hover {\n  border-color: #696969;\n}\n\n.required::after {\n  content: \"*\";\n  color: red;\n}\n\n.hidden {\n  display: none;\n}", "",{"version":3,"sources":["webpack://./src/css/_reset.scss","webpack://./src/css/base.scss","webpack://./src/css/_variables.scss","webpack://./src/css/_mixins.scss"],"names":[],"mappings":"AAAA;;;CAAA;AAKA;;;;;;;EAOE,SAAA;EACA,UAAA;EACA,SAAA;EACA,eAAA;EACA,aAAA;EACA,wBAAA;ACAF;;ADGA;;EAEE,cAAA;ACAF;;ADGA;EACE,cAAA;ACAF;;ADGA;EACE,gBAAA;ACAF;;ADGA;EACE,YAAA;ACAF;;ADGA;EACE,WAAA;EACA,aAAA;ACAF;;ADGA;EACE,yBAAA;EACA,iBAAA;ACAF;;AAxCA;EACE,WAAA;EACA,YAAA;EACA,YAAA;EACA,eAAA;AA2CF;;AAxCA;EACE,4CCLK;ADgDP;;AAxCA;EEdE,aAAA;EACA,sBFciB;EEbjB,6BFayB;EEZzB,mBFYuC;EERvC,aFSoB;EERpB,WFQ2B;EAC3B,yDAAA;EACA,0BAAA;AA+CF;;AA5CA;EACE,oBAAA;EACA,2BAAA;AA+CF;;AA5CA;;;EAGE,YC3BgB;AD0ElB;;AA5CA;;;;;;EAME,mBAAA;AA+CF;;AA5CA;EEzCE,aAAA;EACA,mBFyCiB;EExCjB,6BFwCsB;EEvCtB,mBFuCoC;EEnCpC,WFoCoB;EEnCpB,UFmCyB;AAmD3B;;AAhDA;EEvCE,aFwCoB;EEvCpB,UFuC2B;EE/C3B,aAAA;EACA,sBF+CiB;EE9CjB,uBF8CyB;EE7CzB,mBF6CiC;AAuDnC;AArDE;EACE,4BAAA;AAuDJ;;AAnDA;EEvDE,aAAA;EACA,mBFuDiB;EEtDjB,uBFsDsB;EErDtB,mBFqD8B;EEjD9B,WFkDoB;EEjDpB,UFiDyB;EE7CzB,kBDHc;ECOd,sBDfa;ECgBb,oBF0CuC;EEzCvC,qBFyC6C;EExC7C,oBFwCqD;EACrD,uBC5DyB;ED6DzB,sBAAA;EACA,uBAAA;EACA,8BAAA;AA6DF;;AA1DA;EElEE,aAAA;EACA,sBFkEiB;EEjEjB,6BFiEyB;EEhEzB,mBFgEuC;EE5DvC,WF6DoB;EE5DpB,UF4DyB;AAiE3B;;AA9DA;EACE,YCrEqB;EDsErB,gBAAA;EACA,4BAAA;AAiEF;;AA9DA;EACE,qBAAA;AAiEF;;AA9DA;EACE,uBAAA;AAiEF;;AA9DA;EE9EE,WF+EoB;EE9EpB,UF8EyB;AAkE3B;;AA/DA;EEzFE,aAAA;EACA,sBFyFiB;EExFjB,qBFwFyB;EEvFzB,mBFuF+B;EEnF/B,WFoFoB;EEnFpB,WFmFyB;EACzB,kBAAA;EACA,kBAAA;EACA,0BAAA;EACA,gBAAA;AAsEF;;AAnEA;EElGE,aAAA;EACA,mBFkGiB;EEjGjB,8BFiGsB;EEhGtB,mBFgGqC;EE5FrC,WF6FoB;EE5FpB,UF4FyB;EExFzB,kBDHc;ED6Fd,iBCtGyB;EDuGzB,iBAAA;AA0EF;;AAvEA;EACE,uBAAA;AA0EF;;AAvEA;EACE,eAAA;EACA,oBAAA;AA0EF;AAxEE;EElGA,sBDfa;ECgBb,mBFkGyC;EEjGzC,kBFiG8C;EEhG9C,oBFgGmD;AA6ErD;;AAzEA;EEhHE,WFiHoB;EEhHpB,YFgHyB;EE5GzB,kBDHc;EDiHd,eAAA;AA6EF;;AA1EA;EE7HE,aAAA;EACA,sBF6HiB;EE5HjB,8BF4HyB;EE3HzB,uBF2HwC;EEvHxC,WFwHoB;EEvHpB,UFuHyB;EACzB,iBAAA;AAiFF;;AA9EA;EEnIE,aAAA;EACA,sBFmIiB;EElIjB,6BFkIyB;EEjIzB,uBFiIuC;EE7HvC,YF8HoB;EE7HpB,UF6H0B;AAqF5B;;AAlFA;;EAEE,kBAAA;AAqFF;;AAlFA;EE7IE,aAAA;EACA,mBF6IiB;EE5IjB,8BF4IsB;EE3ItB,qBF2IqC;EEvIrC,YFwIoB;EEvIpB,UFuI0B;AAyF5B;;AApFE;EEpIA,sBDfa;ECgBb,mBFqIyC;EEpIzC,kBFoI8C;EEnI9C,oBFmImD;AAyFrD;;AArFA;EACE,gBAAA;AAwFF;;AArFA;EACE,aAAA;AAwFF;;AArFA;EACE,mBAAA;EACA,oBAAA;AAwFF;;AArFA;EACE,iBAAA;AAwFF;;AArFA;EE3KE,aAAA;EACA,sBF2KiB;EE1KjB,qBF0KyB;EEzKzB,iBFyK+B;EErK/B,WFsKoB;EErKpB,UFqKyB;AA4F3B;;AAzFA;EEhLE,aAAA;EACA,mBFgLiB;EE/KjB,yBF+KsB;EE9KtB,mBF8KgC;EE1KhC,YF2KoB;EE1KpB,WF0K0B;AAgG5B;AA9FE;EACE,6BAAA;EACA,iBAAA;EACA,eAAA;AAgGJ;AA9FI;EElKF,0BAAA;EACA,8BDvBa;ED0LT,aAAA;AAiGN;AA7FE;EACE,cC/LW;EDgMX,iBAAA;EACA,eAAA;AA+FJ;;AA3FA;EACE,cAAA;EACA,eAAA;EACA,oBAAA;AA8FF;;AA3FA;EE5ME,aAAA;EACA,sBF4MiB;EE3MjB,8BF2MyB;EE1MzB,iBF0MwC;EEtMxC,YFuMoB;EEtMpB,WFsM0B;EAC1B,gBAAA;AAkGF;;AA/FA;EElNE,aAAA;EACA,sBFkNiB;EEjNjB,8BFiNyB;EEhNzB,iBFgNwC;EE5MxC,WF6MoB;EE5MpB,WF4MyB;EExMzB,kBDHc;ED6Md,sBAAA;EACA,WAAA;EACA,iBCxNyB;AD8T3B;;AAnGA;EE3NE,aAAA;EACA,mBF2NiB;EE1NjB,8BF0NsB;EEzNtB,iBFyNqC;AAyGvC;;AAtGA;EE/NE,aAAA;EACA,mBF+NiB;EE9NjB,6BF8NsB;EE7NtB,iBF6NoC;AA4GtC;;AAzGA;EACE,oBAAA;AA4GF;;AAzGA;EACE,oBAAA;EACA,YCtOqB;ADkVvB;;AAzGA;;;EE5OE,aAAA;EACA,sBF8OiB;EE7OjB,qBF6OyB;EE5OzB,iBF4O+B;AA+GjC;;AA5GA;EACE,gBAAA;EACA,iBAAA;EACA,mBAAA;AA+GF;;AA5GA;;;EE5OE,kBDHc;EDmPd,uBAAA;EACA,kBAAA;EACA,iBAAA;EACA,eAAA;AA+GF;AA7GE;;;EACE,yBAAA;AAiHJ;AA9GE;;;EErPA,sBDfa;ECgBb,mBFqPyC;EEpPzC,kBFoP8C;EEnP9C,oBFmPmD;EACjD,YAAA;AAqHJ;;AAjHA;EEpQE,YFqQoB;EEpQpB,YFoQ0B;AAqH5B;;AAlHA;EExQE,YFyQoB;EExQpB,YFwQ0B;AAsH5B;;AAnHA;;EE5QE,YF8QoB;EE7QpB,YF6Q0B;EEzQ1B,kBDHc;ED8Qd,2BAAA;EACA,iBCxRyB;EDyRzB,YCtRqB;AD6YvB;AArHE;;EACE,yBC3RW;ED4RX,uBAAA;EACA,YC5Rc;ED6Rd,8BCrRiB;AD6YrB;;AApHA;EEnSE,aAAA;EACA,sBFmSiB;EElSjB,uBFkSyB;EEjSzB,mBFiSiC;EE7RjC,WF8RoB;EE7RpB,WF6RyB;AA2H3B;;AAxHA;EExSE,aAAA;EACA,sBFwSiB;EEvSjB,6BFuSyB;EEtSzB,mBFsSuC;EElSvC,YFmSoB;EElSpB,WFkS0B;AA+H5B;;AA5HA;EACE,sBAAA;EACA,0BAAA;EEnSA,kBDHc;ADsahB;;AA5HA;;EAEE,YCnTgB;EDoThB,gCAAA;EACA,kBAAA;EACA,eAAA;AA+HF;;AA5HA;EACE,iBAAA;AA+HF;;AA5HA;EACE,WAAA;AA+HF;;AA5HA;EE5SE,0BAAA;EACA,8BDvBa;ADmcf;;AA7HA;EEvUE,aAAA;EACA,mBFuUiB;EEtUjB,6BFsUsB;EErUtB,mBFqUoC;EEjUpC,YFkUoB;EEjUpB,WFiU0B;AAoI5B;;AAjIA;;;EErUE,YFwUoB;EEvUpB,YFuU0B;EEnU1B,kBDHc;EDwUd,mBChVa;EDiVb,YAAA;EACA,YCjVgB;EDkVhB,gBAAA;EACA,8BC3UmB;ADgdrB;AAnIE;;;;;EEvUA,oBFyU0B;EExU1B,mBFwUiC;EEvUjC,kBFuUsC;EEtUtC,oBFsU2C;AA2I7C;;AAvIA;;EEtVE,YFwVoB;EEvVpB,YFuV0B;AA2I5B;;AAxIA;EACE,qBAAA;AA2IF;AAzIE;EACE,qBAAA;AA2IJ;;AAvIA;EACE,oBAAA;AA0IF;;AAvIA;EACE,oBAAA;EACA,cAAA;EACA,qBAAA;AA0IF;AAxIE;EACE,qBAAA;AA0IJ;;AAtIA;EACE,YAAA;EACA,UAAA;AAyIF;;AAtIA;EACE,aAAA;AAyIF","sourcesContent":["/* http://meyerweb.com/eric/tools/css/reset/\n  v2.0 | 20110126\n  License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p,\nblockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em,\nimg, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u,\ni, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,\ncaption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details,\nembed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby,\nsection, summary, time, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block;\n}\n\nbody {\n  line-height: 1;\n}\n\nol, ul {\n  list-style: none;\n}\n\nblockquote, q {\n  quotes: none;\n}\n\nblockquote:before, blockquote:after, q:before, q:after {\n  content: '';\n  content: none;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n","@import './_reset';\n@import './_variables';\n@import './_mixins';\n\nbutton {\n  margin: 0px;\n  padding: 0px;\n  border: none;\n  cursor: pointer;\n}\n\n* {\n  font-family: $font;\n}\n\nbody {\n  @include flexBox(column, space-around, center);\n  @include dimensions(100vh, 100%);\n  background-image: url('../images/overlook-view.png');\n  background-size: 100% 100%;\n}\n\nh1 {\n  font-size: xxx-large;\n  transform: translateY(10px);\n}\n\nh1,\nh2,\n.link {\n  color: $main-font-color;\n}\n\nh2,\n.link,\n.book-now,\n.confirm-booking,\n.decline-booking,\n.login-text {\n  font-size: xx-large;\n}\n\nmain {\n  @include flexBox(row, space-evenly, center);\n  @include dimensions(90%, 90%);\n}\n\n.login {\n  @include dimensions(100vh, 50%);\n  @include flexBox(column, center, center);\n\n  h1 {\n    transform: translateY(-10px);\n  }\n}\n\n.login-container {\n  @include flexBox(row, center, center);\n  @include dimensions(50%, 70%);\n  @include borderRadius($radius-pixels);\n  @include outlineStyling($accent-color, -6px, medium, solid);\n  background-color: $section-background-color;\n  box-sizing: border-box;\n  border: 2px solid black;\n  box-shadow: 0px 0px 10px black;\n}\n\n.login-wrapper {\n  @include flexBox(column, space-around, center);\n  @include dimensions(80%, 80%);\n}\n\n.login-text {\n  color: $secondary-font-color;\n  font-weight: 400;\n  transform: translateY(-10px);\n}\n\n.login-input-wrapper {\n  transform: scale(1.4);\n}\n\n.button-submit {\n  border: 1px solid black;\n}\n\n.main-column-left {\n  @include dimensions(80%, 45%);\n}\n\n.your-bookings-container {\n  @include flexBox(column, none, center);\n  @include dimensions(92%, 100%);\n  position: relative;\n  overflow-y: scroll;\n  transform: translateY(6px);\n  padding-top: 4px;\n}\n\n.panel {\n  @include flexBox(row, space-between, center);\n  @include dimensions(30%, 98%);\n  @include borderRadius($radius-pixels);\n  background: $section-background-color;\n  margin-bottom: 3%;\n}\n\n.no-results {\n  justify-content: center;\n}\n\n.booked-rooms {\n  cursor: default;\n  pointer-events: none;\n\n  &:focus {\n    @include outlineStyling($accent-color, 1px, 3px, solid);\n  }\n}\n\n.booking-image {\n  @include dimensions(95%, 220px);\n  @include borderRadius($radius-pixels);\n  margin-left: 1%;\n}\n\n.booking-info {\n  @include flexBox(column, space-between, flex-start);\n  @include dimensions(30%, 95%);\n  font-size: medium;\n}\n\n.panel-right-side {\n  @include flexBox(column, space-around, flex-start);\n  @include dimensions(100%, 58%);\n}\n\n.panel-title,\n.section-title {\n  font-size: x-large;\n}\n\n.panel-right-bottom {\n  @include flexBox(row, space-between, flex-end);\n  @include dimensions(none, 95%);\n}\n\n.available-room {\n\n  &:hover,\n  &:focus {\n    @include outlineStyling($accent-color, 1px, 3px, solid);\n  }\n}\n\n.room-amenities {\n  text-align: left;\n}\n\nli::before {\n  content: '+ ';\n}\n\n.price {\n  font-size: xx-large;\n  margin-bottom: -10px;\n}\n\n.price-label {\n  text-align: right;\n}\n\n.main-column-right {\n  @include flexBox(column, none, none);\n  @include dimensions(80%, 45%);\n}\n\nnav {\n  @include flexBox(row, flex-end, center);\n  @include dimensions(34px, none);\n\n  .link {\n    background-color: transparent;\n    text-align: right;\n    cursor: pointer;\n\n    &:focus {\n      @include underlineStyling();\n      outline: none;\n    }\n  }\n\n  .separator {\n    color: $accent-color;\n    padding: 0px 15px;\n    cursor: default;\n  }\n}\n\n.current-view {\n  color: #999999;\n  cursor: default;\n  pointer-events: none;\n}\n\n.main-column-right-sections-container {\n  @include flexBox(column, space-between, none);\n  @include dimensions(100%, none);\n  padding-top: 8px;\n}\n\n.cost-info-container {\n  @include flexBox(column, space-between, none);\n  @include dimensions(33%, none);\n  @include borderRadius($radius-pixels);\n  box-sizing: border-box;\n  padding: 4%;\n  background: $section-background-color;\n}\n\n.cost-wrapper {\n  @include flexBox(row, space-between, none);\n}\n\n.input-wrapper {\n  @include flexBox(row, space-around, none);\n}\n\n.cost-label {\n  align-self: flex-end;\n}\n\n.cost {\n  font-size: xxx-large;\n  color: $secondary-font-color;\n}\n\n.date-wrapper,\n.dropdown-wrapper,\n.login-input-wrapper {\n  @include flexBox(column, none, none);\n}\n\nlabel {\n  font-size: small;\n  padding-left: 3px;\n  padding-bottom: 3px;\n}\n\n.input-date,\n.input-room-type,\n.search-rooms {\n  @include borderRadius($radius-pixels);\n  border: 1px solid black;\n  text-align: center;\n  font-size: medium;\n  cursor: pointer;\n\n  &:hover {\n    border: 1px solid $accent-color;\n  }\n\n  &:focus {\n    @include outlineStyling($accent-color, 0px, 1px, solid);\n    border: none;\n  }\n}\n\n.input-date {\n  @include dimensions(41px, 155px);\n}\n\n.input-room-type {\n  @include dimensions(44px, 200px);\n}\n\n.search-rooms,\n.button-submit {\n  @include dimensions(44px, 150px);\n  @include borderRadius($radius-pixels);\n  transform: translateY(16px);\n  background: $section-background-color;\n  color: $secondary-font-color;\n\n  &:hover {\n    background-color: $accent-color;\n    border: 1px solid black;\n    color: $main-font-color;\n    text-shadow: $button-text-shadow;\n  }\n}\n\n.prompt-button-container {\n  @include flexBox(column, center, center);\n  @include dimensions(65%, 100%);\n}\n\n.prompt-button-wrapper {\n  @include flexBox(column, space-evenly, center);\n  @include dimensions(100%, 100%);\n}\n\n.prompt-background {\n  box-sizing: border-box;\n  border: 5px dotted $accent-color;\n  @include borderRadius($radius-pixels);\n}\n\n.greeting,\n.prompt {\n  color: $main-font-color;\n  text-shadow: -3px -2px 0px black;\n  text-align: center;\n  font-size: 50px;\n}\n\n.prompt {\n  padding: 0px 10px;\n}\n\n.greeting {\n  margin: 0px;\n}\n\nspan {\n  @include underlineStyling();\n}\n\n.button-wrapper {\n  @include flexBox(row, space-evenly, center);\n  @include dimensions(80px, 100%);\n}\n\n.book-now,\n.confirm-booking,\n.decline-booking {\n  @include dimensions(80px, 280px);\n  @include borderRadius($radius-pixels);\n  background: $accent-color;\n  border: none;\n  color: $main-font-color;\n  font-weight: 500;\n  text-shadow: $button-text-shadow;\n\n  &:hover,\n  &:focus {\n    @include outlineStyling(white, 1px, 3px, solid);\n  }\n}\n\n.confirm-booking,\n.decline-booking {\n  @include dimensions(80px, 200px)\n}\n\n.invalid {\n  border: 3px solid red;\n\n  &:hover {\n    border: 3px solid red;\n  }\n}\n\n.not-clickable {\n  pointer-events: none;\n}\n\n.disabled {\n  pointer-events: none;\n  color:#696969;\n  border-color: #696969;\n\n  &:hover {\n    border-color: #696969;\n  }\n}\n\n.required::after {\n  content: '*';\n  color: red;\n}\n\n.hidden {\n  display: none;\n}\n","// Colors\n$section-background-color: white;\n$accent-color: #FFA726;\n$main-font-color: white;\n$secondary-font-color: black;\n\n// Font\n$font: 'Prompt', sans-serif !important;\n\n// Decoration\n$radius-pixels: 4px;\n$button-text-shadow: 0px 0px 5px black;\n","@mixin flexBox($direction, $axisX, $axisY) {\n  display: flex;\n  flex-direction: $direction;\n  justify-content: $axisX;\n  align-items: $axisY;\n}\n\n@mixin dimensions($unitH, $unitW) {\n  height: $unitH;\n  width: $unitW;\n}\n\n@mixin borderRadius($pixels) {\n  border-radius: $pixels\n}\n\n@mixin outlineStyling($color, $offset, $width, $style) {\n  outline-color: $color;\n  outline-offset: $offset;\n  outline-width: $width;\n  outline-style: $style;\n}\n\n@mixin underlineStyling() {\n  text-decoration: underline;\n  text-decoration-color: $accent-color;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((module) => {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== "string") {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/overlook-view.png");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "domUpdates": () => (/* binding */ domUpdates)
/* harmony export */ });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);


const header = document.querySelector('#header');
const main = document.querySelector('#main');
const scrollSection = document.querySelector('#scrollSection');
const customerCost = document.querySelector('#customerCost');
const prompt = document.querySelector('#prompt');
const promptConfirm = document.querySelector('#promptConfirm');
const customerGreeting = document.querySelector('#customerGreeting');
const listTitle = document.querySelector('#listTitle');
const panelTitle = document.querySelector('#panelTitle');
const buttonSearchRooms = document.querySelector('#buttonSearchRooms');

const loginView = document.querySelector('#loginView');
const usernameWrapper = document.querySelector('#usernameWrapper');
const username = document.querySelector('#username');
const passwordWrapper = document.querySelector('#passwordWrapper');
const password = document.querySelector('#password');
const loginErrorMsg = document.querySelector('#loginErrorMsg');
const buttonSubmit = document.querySelector('#buttonSubmit');

const navDashboard = document.querySelector('#navDashboard');
const navBooking = document.querySelector('#navBooking');
const calendar = document.querySelector('#calendar');
const dropDownRoomType = document.querySelector('#dropDown');
const spanRoomNum = document.querySelector('#spanRoomNum')

const bookingInputFields = document.querySelector('#bookingInputFields');
const dashboardCost = document.querySelector('#dashboardCost');
const buttonDashboard = document.querySelector('#buttonDashboard');
const buttonWrapper = document.querySelector('#buttonWrapper');

let dropDown = dropDownRoomType; // Unexplainable bug with dropDownRoomType

const toggleClass = (elements, rule, isVisibile) => {
  elements.forEach(element => element.classList.toggle(rule, isVisibile));
}

const toggleAttribute = (element, value, state) => {
  element.setAttribute(value, state);
}

const changeInnerText = (element, text) => {
  element.innerText = text;
}

const highlightError = (element, isOn) => {
  element.classList.toggle('invalid', isOn);
}

const domUpdates = {
  displayDashboard(customer) {
    domUpdates.changePageDisplay();
    domUpdates.generateCustomerDashboard(customer);
    toggleAttribute(scrollSection, 'aria-live', null);
    toggleAttribute(navBooking, 'aria-disabled', false);
    toggleAttribute(navDashboard, 'aria-disabled', true);
  },
  displayBookingsPage() {
    domUpdates.changePageDisplay();
    toggleAttribute(scrollSection, 'aria-live', 'polite');
    toggleAttribute(navBooking, 'aria-disabled', true);
    toggleAttribute(navDashboard, 'aria-disabled', false);
    highlightError(calendar, false);
  },
  showInvalidDateErrorMessages(invalidDate, today) {
    domUpdates.generateNoResultsPanel();
    changeInnerText(prompt, `Check-in dates are limited to between ${dayjs__WEBPACK_IMPORTED_MODULE_0___default()(today).format('MMM. DD, YYYY')} and Dec. 31, 2023`);
    highlightError(calendar, true);
    invalidDate === '' && changeInnerText(prompt, 'A check-in date must be entered to initiate a search.');
  },
  generateCustomerDashboard(customer) {
    scrollSection.innerHTML = '';
    customer.bookings.forEach(booking => {
      scrollSection.innerHTML +=
        `<button class="panel booked-rooms" role="listitem">
          <img class="booking-image" src="./images/booking-image.png" alt="Snow covered Overlook Hotel">
          <section class="panel-right-side">
            <p class="panel-title">${booking.roomType}</p>
            <section class="booking-info">
              <p>Room: ${booking.roomNumber}</p>
              <p>${dayjs__WEBPACK_IMPORTED_MODULE_0___default()(booking.date).format('MMM. DD, YYYY')}</p>
            </section>
          </section>
        </button>`;
    });
    changeInnerText(customerGreeting, `Hello ${customer.name.split(' ')[0]}!`);
    changeInnerText(customerCost, `$${customer.totalCost}`);
  },
  generateAvailableRooms(hotel) {
    if (!hotel.availableRooms.length) {
      calendar.classList.contains('invalid') && highlightError(calendar, false);
      domUpdates.generateNoResultsPanel();
      changeInnerText(prompt, 'We are so sorry, no rooms are available that fit that search criteria! Please try a new search!')
      return;
    }
    scrollSection.innerHTML = '';
    hotel.availableRooms.forEach(room => {
      scrollSection.innerHTML +=
        `<button class="panel available-room" id="${room.number}" role="listitem">
          <img class="booking-image not-clickable" src="./images/booking-image.png" alt="Snow covered Overlook Hotel">
          <section class="panel-right-side not-clickable">
            <p class="panel-title">${room.roomType}</p>
            <section class="panel-right-bottom">
              <section class="room-amenities">
                <p>Room: ${room.number}</p>
                <p>Amenities:</p>
                <ul>
                  <li>Has Bidet: ${room.bidet}</li>
                  <li>${room.numBeds} ${room.bedSize} bed(s)</li>
                </ul>
              </section>
              <section>
                <p class="price">$${room.costPerNight}</p>
                <p class="price-label">per night</p>
              </section>
            </section>
          </section>
        </button>`;
    });
    changeInnerText(prompt, 'Select the room you\'d like to book.');
    highlightError(calendar, false);
  },
  changePageDisplay() {
    toggleClass([
      bookingInputFields,
      dashboardCost,
      buttonDashboard,
      customerGreeting,
    ], 'hidden');
    highlightError(calendar, false);
    toggleClass([navDashboard, navBooking], 'current-view');
    domUpdates.toggleLinkState([navDashboard, navBooking]);
    if (navBooking.classList.contains('current-view')) {
      changeInnerText(listTitle, 'Available Rooms');
      changeInnerText(panelTitle, 'Search Rooms');
      changeInnerText(prompt, 'Select the room you\'d like to book.');
    } else {
      changeInnerText(listTitle, 'Your Bookings');
      changeInnerText(panelTitle, 'Price Summary');
      changeInnerText(prompt, 'Plan your next trip:');
    }
  },
  generateNoResultsPanel() {
    scrollSection.innerHTML = '';
    scrollSection.innerHTML +=
      `<button class="panel no-results" role="listitem">
        <p class="panel-title">No available rooms found.</p>
      </button>`;
  },
  displayErrorMessage(error) {
    toggleClass([buttonDashboard], 'hidden', true);
    changeInnerText(prompt, `${error.message}`);
    domUpdates.generateNoResultsPanel();
    let noResultsPanel = document.querySelector('.no-results');
    noResultsPanel.innerHTML =
      '<p class="panel-title">Unable to connect database server.</p>';
  },
  displayConfirmBookingPrompt(event) {
    if (event.target.classList.contains('available-room')) {
      toggleClass([promptConfirm, buttonWrapper], 'hidden', false);
      toggleClass([prompt], 'hidden', true);
      changeInnerText(spanRoomNum, `Room ${event.target.id}`);
      domUpdates.setInputsState();
    } else {
      toggleClass([promptConfirm, buttonWrapper], 'hidden', true);
      toggleClass([prompt], 'hidden', false);
      domUpdates.setInputsState();
    }
  },
  setInputsState() {
    if (document.activeElement.classList.contains('available-room')) {
      calendar.disabled = true;
      dropDown.disabled = true;
      buttonSearchRooms.disabled = true;
      toggleClass([calendar, dropDown, buttonSearchRooms], 'disabled', true);
    } else {
      calendar.disabled = false;
      dropDown.disabled = false;
      buttonSearchRooms.disabled = false;
      toggleClass([calendar, dropDown, buttonSearchRooms], 'disabled', false);
    }
  },
  toggleLinkState(links) {
    links.forEach(link => {
      link.classList.contains('current-view') ? link.disabled = true : link.disabled = false;
    });
  },
  verifyFormInput(hotel) {
    let inputElement = usernameWrapper.classList.contains('hidden') ? password : username;
        if (inputElement.value.slice(0, 8) === 'customer' && hotel.guests.some(guest => `${guest.id}` === inputElement.value.slice(8))) {
        toggleClass([usernameWrapper, passwordWrapper], 'hidden');
        changeInnerText(loginErrorMsg, '');
        inputElement = password;
      } else if (inputElement.value === 'overlook2021') {
        return true;
      } else {
        inputElement.value = '';
        inputElement.placeholder = `Enter ${inputElement.id} here`;
        highlightError(inputElement, true);
        changeInnerText(loginErrorMsg, `${inputElement.id[0].toUpperCase() + inputElement.id.slice(1)} entered  is invalid.`);
        return false;
      }
  },
  hideLoginPage() {
    toggleClass([loginView, header, main], 'hidden');
  }
};




/***/ }),
/* 9 */
/***/ (function(module) {

!function(t,e){ true?module.exports=e():0}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",$="Invalid Date",l=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},D="en",v={};v[D]=M;var p=function(t){return t instanceof _},S=function(t,e,n){var r;if(!t)return D;if("string"==typeof t)v[t]&&(r=t),e&&(v[t]=e,r=t);else{var i=t.name;v[i]=t,r=i}return!n&&r&&(D=r),r||!n&&D},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=g;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t)}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(l);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return O},m.isValid=function(){return!(this.$d.toString()===$)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),$=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},l=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,g="set"+(this.$u?"UTC":"");switch(h){case c:return r?$(1,0):$(31,11);case f:return r?$(1,M):$(0,M+1);case o:var D=this.$locale().weekStart||0,v=(y<D?y+7:y)-D;return $(r?m-v:m+(6-v),M);case a:case d:return l(g+"Hours",0);case u:return l(g+"Minutes",1);case s:return l(g+"Seconds",2);case i:return l(g+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),$=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],l=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[$](l),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else $&&this.$d[$](l);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,$=this;r=Number(r);var l=O.p(h),y=function(t){var e=w($);return O.w(e.date(e.date()+Math.round(t*r)),$)};if(l===f)return this.set(f,this.$M+r);if(l===c)return this.set(c,this.$y+r);if(l===a)return y(1);if(l===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[l]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||$;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].substr(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||l[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,$){var l,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,g=this-M,D=O.m(this,M);return D=(l={},l[c]=D/12,l[f]=D,l[h]=D/3,l[o]=(g-m)/6048e5,l[a]=(g-m)/864e5,l[u]=g/n,l[s]=g/e,l[i]=g/t,l)[y]||g,$?D:O.a(D)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return v[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),b=_.prototype;return w.prototype=b,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){b[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=v[D],w.Ls=v,w.p={},w}));

/***/ }),
/* 10 */
/***/ ((module) => {


const apiCall = {
  getCustomers() {
    return fetch('http://localhost:3001/api/v1/customers')
  },
  getSingleCustomer(customerID) {
    return fetch(`http://localhost:3001/api/v1/customers/${customerID}`)
  },
  getRooms() {
    return fetch('http://localhost:3001/api/v1/rooms')
  },
  getBookings() {
    return fetch('http://localhost:3001/api/v1/bookings')
  },
  addNewBooking(newBooking) {
    return fetch('http://localhost:3001/api/v1/bookings', {
      method: 'POST',
      body: JSON.stringify(newBooking),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },
  deleteBooking(bookingID) {
    return fetch(`http://localhost:3001/api/v1/bookings/${bookingID}`, {
      method: 'DELETE',
      body: JSON.stringify({
        id: bookingID
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
};

module.exports = {apiCall};


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/turing-logo.png");

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/booking-image.png");

/***/ }),
/* 13 */
/***/ (function(module) {

!function(e,i){ true?module.exports=i():0}(this,(function(){"use strict";return function(e,i,t){i.prototype.isBetween=function(e,i,s,f){var n=t(e),o=t(i),r="("===(f=f||"()")[0],u=")"===f[1];return(r?this.isAfter(n,s):!this.isBefore(n,s))&&(u?this.isBefore(o,s):!this.isAfter(o,s))||(r?this.isBefore(n,s):!this.isAfter(n,s))&&(u?this.isAfter(o,s):!this.isBefore(o,s))}}}));

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Booking {
  constructor(booking) {
    this.id = booking.id;
    this.userID = booking.userID;
    this.date = booking.date;
    this.roomNumber = booking.roomNumber;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Booking);


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Room__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);
/* harmony import */ var _Booking__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14);



class Hotel {
  constructor(rooms, bookings, guests) {
    this.guests = guests;
    this.allRooms = rooms.map(room => new _Room__WEBPACK_IMPORTED_MODULE_0__.default(room));
    this.bookedRooms = bookings.map(booking => new _Booking__WEBPACK_IMPORTED_MODULE_1__.default(booking));
    this.availableRooms = [];
  }

  determineAvailableRooms(date) {
    this.availableRooms = this.allRooms.filter(room => {
      let todaysBookedRooms = this.bookedRooms.filter(bookedRoom => bookedRoom.date === date)
        .map(bookedRoom => bookedRoom.roomNumber);
      return todaysBookedRooms.includes(room.number) ? false : true;
    });
  }

  calculateRevenue(parameter) {
    let key = Number.isInteger(parameter) ? 'userID' : 'date';
    let filteredRoomNums = this.bookedRooms.reduce((roomNums, currentBooking) => {
      currentBooking[key] === parameter && roomNums.push(currentBooking.roomNumber);
      return roomNums;
    }, []);
    return this.allRooms.reduce((totalCost, currentRoom) => {
      totalCost += filteredRoomNums.includes(currentRoom.number) ? currentRoom.costPerNight : 0;
      return totalCost;
    }, 0);
  }

  filterByRoomType(roomType) {
    this.availableRooms = this.availableRooms.filter(room => room.roomType === roomType);
  }

  determineOccupancy(date) {
    let percentOccupied = (1 - (this.availableRooms.length / this.allRooms.length)) * 100;
    return `%${percentOccupied.toFixed(2)}`;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Hotel);


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Room {
  constructor(room) {
    this.number = room.number;
    this.roomType = room.roomType;
    this.bidet = room.bidet;
    this.bedSize = room.bedSize;
    this.numBeds = room.numBeds;
    this.costPerNight = room.costPerNight;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Room);


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Hotel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);


class Customer {
  constructor(person) {
    this.id = person.id;
    this.name = person.name;
    this.bookings = [];
    this.totalCost = 0;
  }

  getBookings(hotel) {
    let hotelCopy = JSON.parse(JSON.stringify(hotel.bookedRooms));
    hotelCopy.forEach(booking => {
      if (booking.userID === this.id) {
        booking['roomType'] = hotel.allRooms
          .find(room => room.number === booking.roomNumber).roomType;
        this.bookings.push(booking);
      }
    });
  }

  bookRoom(roomNumber, date) {
    return {
      userID: this.id,
      date: date,
      roomNumber: parseInt(roomNumber)
    };
  }

  determineTotalCost(hotel) {
    this.totalCost = hotel.calculateRevenue(this.id).toFixed(2);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Customer);


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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_base_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _domUpdates__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_apiCalls__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _images_turing_logo_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11);
/* harmony import */ var _images_booking_image_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(12);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var dayjs_plugin_isBetween__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var dayjs_plugin_isBetween__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_isBetween__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _src_classes_Booking__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(14);
/* harmony import */ var _src_classes_Hotel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(15);
/* harmony import */ var _src_classes_Customer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(17);













dayjs__WEBPACK_IMPORTED_MODULE_5___default().extend((dayjs_plugin_isBetween__WEBPACK_IMPORTED_MODULE_6___default()));
let currentCustomer;
let hotel;
let today = dayjs__WEBPACK_IMPORTED_MODULE_5___default()().format('YYYY/MM/DD');
let selectedRoom = null;

Promise.all([_apiCalls__WEBPACK_IMPORTED_MODULE_2__.apiCall.getRooms(), _apiCalls__WEBPACK_IMPORTED_MODULE_2__.apiCall.getBookings(), _apiCalls__WEBPACK_IMPORTED_MODULE_2__.apiCall.getCustomers()])
  .then(responses => Promise.all(responses.map(response => checkResponse(response))))
  .then(data => createHotel(data))
  .catch(error => _domUpdates__WEBPACK_IMPORTED_MODULE_1__.domUpdates.displayErrorMessage(error));

const createHotel = (operationalInfo) => {
  hotel = new _src_classes_Hotel__WEBPACK_IMPORTED_MODULE_8__.default(
    operationalInfo[0].rooms,
    operationalInfo[1].bookings,
    operationalInfo[2].customers
  );
}

const checkResponse = (response) => {
  if (!response.ok) {
    console.log(response);
    throw new Error(`${response.status} ${response.statusText}`);
  } else {
    return response.json();
  }
}

const displayCustomerInfo = (customerID) => {
  _apiCalls__WEBPACK_IMPORTED_MODULE_2__.apiCall.getSingleCustomer(customerID)
    .then(response => checkResponse(response))
    .then(customer => getCustomerInfo(customer))
    .then(customerInfo => _domUpdates__WEBPACK_IMPORTED_MODULE_1__.domUpdates.generateCustomerDashboard(customerInfo))
    .catch(error => _domUpdates__WEBPACK_IMPORTED_MODULE_1__.domUpdates.displayErrorMessage(error));
}

const getCustomerInfo = (customer) => {
  currentCustomer = new _src_classes_Customer__WEBPACK_IMPORTED_MODULE_9__.default(customer);
  aggregateCustomerData(currentCustomer);
  return currentCustomer;
}

const aggregateCustomerData = () => {
  currentCustomer.getBookings(hotel);
  currentCustomer.determineTotalCost(hotel);
  capitalizeRoomTypes(currentCustomer.bookings);
}

const updateAvailableRoomsList = () => {
  const selectDate = dayjs__WEBPACK_IMPORTED_MODULE_5___default()(calendar.value).format('YYYY/MM/DD');
  if (!dayjs__WEBPACK_IMPORTED_MODULE_5___default()(calendar.value).isBetween(calendar.min, calendar.max, null, []) || calendar.value === '') {
    return _domUpdates__WEBPACK_IMPORTED_MODULE_1__.domUpdates.showInvalidDateErrorMessages(calendar.value, today);
  }
  if (dropDown.value === '' || dropDown.value === 'any') {
    aggregateAvailableRooms(selectDate);
  } else {
    aggregateAvailableRooms(selectDate, dropDown.value);
  }
}

const capitalizeRoomTypes = (roomList) => {
  roomList.forEach((room, i) => {
    roomList[i].roomType = room.roomType.split(' ')
      .map(name => name[0].toUpperCase() + name.slice(1))
      .join(' ');
  });
}

const changePages = (event) => {
  if (event.target.id === 'navBooking' || event.target.id === 'buttonDashboard') {
    _domUpdates__WEBPACK_IMPORTED_MODULE_1__.domUpdates.displayBookingsPage();
    aggregateAvailableRooms(today);
  } else {
    _domUpdates__WEBPACK_IMPORTED_MODULE_1__.domUpdates.displayDashboard(currentCustomer);
    setDefaultInputValues();
  }
}

const setDefaultInputValues = () => {
  calendar.value = dayjs__WEBPACK_IMPORTED_MODULE_5___default()().format('YYYY-MM-DD');
  calendar.min = dayjs__WEBPACK_IMPORTED_MODULE_5___default()().format('YYYY-MM-DD');
  calendar.max = dayjs__WEBPACK_IMPORTED_MODULE_5___default()('2023-12-31').format('YYYY-MM-DD');
  dropDown.selectedIndex = 0;
}

const determineSelectedRoom = (event) => {
  if (event.target.classList.contains('available-room')) {
    selectedRoom = event.target.id;
  }
}

const addBooking = (event) => {
  if (event.target.id === 'buttonConfirmBooking') {
    let bookingDate = dayjs__WEBPACK_IMPORTED_MODULE_5___default()(calendar.value).format('YYYY/MM/DD');
    _apiCalls__WEBPACK_IMPORTED_MODULE_2__.apiCall.addNewBooking(currentCustomer.bookRoom(selectedRoom, bookingDate))
      .then(response => checkResponse(response))
      .then(data => {
        hotel.bookedRooms.push(new _src_classes_Booking__WEBPACK_IMPORTED_MODULE_7__.default(data.newBooking))
      })
      .catch(error => _domUpdates__WEBPACK_IMPORTED_MODULE_1__.domUpdates.displayErrorMessage(error))
      .finally(() => {
        updateDataModel();
      });
  }
}

const updateDataModel = () => {
  aggregateCustomerData();
  aggregateAvailableRooms(dayjs__WEBPACK_IMPORTED_MODULE_5___default()(calendar.value).format('YYYY/MM/DD'));
}

const aggregateAvailableRooms = (date, roomType) => {
  hotel.determineAvailableRooms(date);
  roomType && hotel.filterByRoomType(roomType);
  capitalizeRoomTypes(hotel.availableRooms);
  _domUpdates__WEBPACK_IMPORTED_MODULE_1__.domUpdates.generateAvailableRooms(hotel);
}

const setUpApplication = () => {
  if (_domUpdates__WEBPACK_IMPORTED_MODULE_1__.domUpdates.verifyFormInput(hotel)) {
    _domUpdates__WEBPACK_IMPORTED_MODULE_1__.domUpdates.hideLoginPage();
    setDefaultInputValues();
    displayCustomerInfo(parseInt(username.value.slice(8)));
  }
}

buttonSubmit.addEventListener('click', () => {
  setUpApplication();
});

navDashboard.addEventListener('click', changePages);

navBooking.addEventListener('click', changePages);

buttonDashboard.addEventListener('click', changePages);

buttonSearchRooms.addEventListener('click', (e) => {
  updateAvailableRoomsList(e);
});

scrollSection.addEventListener('click', (e) => {
  determineSelectedRoom(e);
});

window.addEventListener('click', (e) => {
  _domUpdates__WEBPACK_IMPORTED_MODULE_1__.domUpdates.displayConfirmBookingPrompt(e);
});

buttonWrapper.addEventListener('click', (e) => {
  addBooking(e);
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map