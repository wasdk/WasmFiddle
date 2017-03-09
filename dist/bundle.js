/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	const React = __webpack_require__(1);
	const ReactDOM = __webpack_require__(2);
	const App_1 = __webpack_require__(3);
	ReactDOM.render(React.createElement(App_1.AppComponent, null), document.getElementById("app"));


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	const React = __webpack_require__(1);
	const ReactSplitPane = __webpack_require__(4);
	const State_1 = __webpack_require__(49);
	const Editor_1 = __webpack_require__(51);
	class AppComponent extends React.Component {
	    constructor() {
	        super();
	        this.installKeyboardShortcuts();
	        this.state = {
	            compilerOptions: "-O3" //["-O3", "-O0", "-Os"]
	        };
	        State_1.State.app = this;
	    }
	    installKeyboardShortcuts() {
	        Mousetrap.bind(['command+shift+j', 'command+shift+k', 'command+enter', 'control+enter'], (e) => {
	            State_1.State.run();
	            e.preventDefault();
	        });
	        Mousetrap.bind(['ctrl+enter', 'command+enter', 'control+enter'], (e) => {
	            State_1.State.assemble();
	            e.preventDefault();
	        });
	        Mousetrap.bind(['command+shift+s'], (e) => {
	            State_1.State.saveForever();
	            e.preventDefault();
	        });
	        Mousetrap.bind(['command+shift+.'], (e) => {
	            State_1.State.nextPane(1);
	            e.preventDefault();
	        });
	        Mousetrap.bind(['command+shift+,'], (e) => {
	            State_1.State.nextPane(-1);
	            e.preventDefault();
	        });
	    }
	    componentDidMount() {
	        State_1.State.init();
	    }
	    onSaveJavaScript(text) {
	        localStorage["js-source"] = text;
	    }
	    compilerOptionsChanged(e) {
	        this.setState({
	            compilerOptions: e.target.value
	        });
	    }
	    onResize() {
	        State_1.State.resize();
	    }
	    render() {
	        return React.createElement("div", null,
	            React.createElement(ReactSplitPane, { split: "horizontal", allowResize: false, onChange: this.onResize.bind(this) },
	                React.createElement("div", { className: "header" },
	                    React.createElement("a", { onClick: State_1.State.saveForever, href: "#", className: "btn btn-sm btn-success" },
	                        React.createElement("span", { className: "glyphicon glyphicon-save" }),
	                        " Save"),
	                    ' ',
	                    React.createElement("span", { className: "headerTitle" },
	                        "WasmFiddle ",
	                        State_1.State.fiddleURI),
	                    React.createElement("div", { className: "editorHeaderButtons" },
	                        React.createElement("a", { onClick: State_1.State.saveForever, href: "#", className: "btn btn-sm btn-success" },
	                            React.createElement("span", { className: "glyphicon glyphicon-share" }),
	                            " Share"))),
	                React.createElement(ReactSplitPane, { split: "vertical", defaultSize: "50%", onChange: this.onResize.bind(this) },
	                    React.createElement("div", null,
	                        React.createElement(ReactSplitPane, { split: "horizontal", defaultSize: "50%", onChange: this.onResize.bind(this) },
	                            React.createElement("div", { className: "editorContainer" },
	                                React.createElement("div", { className: "editorHeader" },
	                                    React.createElement("span", { className: "editorHeaderTitle" }, "main.c"),
	                                    React.createElement("div", { className: "editorHeaderButtons" },
	                                        React.createElement("a", { onClick: State_1.State.run, href: "#", className: "btn btn-xs btn-success" },
	                                            React.createElement("span", { className: "glyphicon glyphicon-play" }),
	                                            " Compile & Run"),
	                                        ' ')),
	                                React.createElement(Editor_1.EditorComponent, { name: "main.c", mode: "ace/mode/c_cpp" })),
	                            React.createElement("div", { className: "editorContainer" },
	                                React.createElement("div", { className: "editorHeader" },
	                                    React.createElement("span", { className: "editorHeaderTitle" }, "harness.js"),
	                                    React.createElement("div", { className: "editorHeaderButtons" },
	                                        React.createElement("a", { onClick: State_1.State.runHarness, href: "#", className: "btn btn-xs btn-success" },
	                                            React.createElement("span", { className: "glyphicon glyphicon-play" }),
	                                            " Run"),
	                                        ' ')),
	                                React.createElement(Editor_1.EditorComponent, { name: "harness.js", mode: "ace/mode/javascript" })))),
	                    React.createElement("div", null,
	                        React.createElement(ReactSplitPane, { split: "horizontal", defaultSize: "60%", onChange: this.onResize.bind(this) },
	                            React.createElement(ReactSplitPane, { split: "horizontal", defaultSize: "80%", onChange: this.onResize.bind(this) },
	                                React.createElement("div", { className: "editorContainer" },
	                                    React.createElement("div", { className: "editorHeader" },
	                                        React.createElement("span", { className: "editorHeaderTitle" }, "out.wast"),
	                                        React.createElement("div", { className: "editorHeaderButtons" },
	                                            React.createElement("a", { onClick: State_1.State.assemble, href: "#", className: "btn btn-xs btn-success" },
	                                                React.createElement("span", { className: "glyphicon glyphicon-play" }),
	                                                " Assemble & Run"),
	                                            ' ')),
	                                    React.createElement(Editor_1.EditorComponent, { name: "wast" })),
	                                React.createElement("div", { className: "editorContainer" },
	                                    React.createElement("div", { className: "editorHeader" },
	                                        React.createElement("span", { className: "editorHeaderTitle" }, "out.wasm"),
	                                        React.createElement("div", { className: "editorHeaderButtons" },
	                                            React.createElement("a", { onClick: State_1.State.run, href: "#", className: "btn btn-xs btn-success" },
	                                                React.createElement("span", { className: "glyphicon glyphicon-save" }),
	                                                " Download"),
	                                            ' ')),
	                                    React.createElement(Editor_1.EditorComponent, { name: "wasm", save: false, readOnly: true }))),
	                            React.createElement("div", { className: "editorContainer" },
	                                React.createElement("div", { className: "editorHeader" },
	                                    React.createElement("span", { className: "editorHeaderTitle" }, "out"),
	                                    React.createElement("div", { className: "editorHeaderButtons" },
	                                        React.createElement("a", { onClick: State_1.State.clearOutput, href: "#", className: "btn btn-xs btn-success" },
	                                            React.createElement("span", { className: "glyphicon glyphicon-ban-circle" }),
	                                            " Clear"),
	                                        ' ')),
	                                React.createElement(Editor_1.EditorComponent, { name: "output", save: false, readOnly: true })))))));
	    }
	}
	exports.AppComponent = AppComponent;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var SplitPane = __webpack_require__(5);
	
	module.exports = SplitPane;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(2);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _inlineStylePrefixer = __webpack_require__(6);
	
	var _inlineStylePrefixer2 = _interopRequireDefault(_inlineStylePrefixer);
	
	var _reactStyleProptype = __webpack_require__(45);
	
	var _reactStyleProptype2 = _interopRequireDefault(_reactStyleProptype);
	
	var _Pane = __webpack_require__(47);
	
	var _Pane2 = _interopRequireDefault(_Pane);
	
	var _Resizer = __webpack_require__(48);
	
	var _Resizer2 = _interopRequireDefault(_Resizer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.2 (KHTML, like Gecko) Safari/537.2';
	
	function unFocus(document, window) {
	    if (document.selection) {
	        document.selection.empty();
	    } else {
	        try {
	            window.getSelection().removeAllRanges();
	            // eslint-disable-next-line no-empty
	        } catch (e) {}
	    }
	}
	
	var SplitPane = function (_Component) {
	    _inherits(SplitPane, _Component);
	
	    function SplitPane() {
	        var _ref;
	
	        _classCallCheck(this, SplitPane);
	
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }
	
	        var _this = _possibleConstructorReturn(this, (_ref = SplitPane.__proto__ || Object.getPrototypeOf(SplitPane)).call.apply(_ref, [this].concat(args)));
	
	        _this.onMouseDown = _this.onMouseDown.bind(_this);
	        _this.onTouchStart = _this.onTouchStart.bind(_this);
	        _this.onMouseMove = _this.onMouseMove.bind(_this);
	        _this.onTouchMove = _this.onTouchMove.bind(_this);
	        _this.onMouseUp = _this.onMouseUp.bind(_this);
	
	        _this.state = {
	            active: false,
	            resized: false
	        };
	        return _this;
	    }
	
	    _createClass(SplitPane, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.setSize(this.props, this.state);
	            document.addEventListener('mouseup', this.onMouseUp);
	            document.addEventListener('mousemove', this.onMouseMove);
	            document.addEventListener('touchmove', this.onTouchMove);
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(props) {
	            this.setSize(props, this.state);
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            document.removeEventListener('mouseup', this.onMouseUp);
	            document.removeEventListener('mousemove', this.onMouseMove);
	            document.removeEventListener('touchmove', this.onTouchMove);
	        }
	    }, {
	        key: 'onMouseDown',
	        value: function onMouseDown(event) {
	            var eventWithTouches = _extends({}, event, { touches: [{ clientX: event.clientX, clientY: event.clientY }] });
	            this.onTouchStart(eventWithTouches);
	        }
	    }, {
	        key: 'onTouchStart',
	        value: function onTouchStart(event) {
	            if (this.props.allowResize) {
	                unFocus(document, window);
	                var position = this.props.split === 'vertical' ? event.touches[0].clientX : event.touches[0].clientY;
	                if (typeof this.props.onDragStarted === 'function') {
	                    this.props.onDragStarted();
	                }
	                this.setState({
	                    active: true,
	                    position: position
	                });
	            }
	        }
	    }, {
	        key: 'onMouseMove',
	        value: function onMouseMove(event) {
	            var eventWithTouches = _extends({}, event, { touches: [{ clientX: event.clientX, clientY: event.clientY }] });
	            this.onTouchMove(eventWithTouches);
	        }
	    }, {
	        key: 'onTouchMove',
	        value: function onTouchMove(event) {
	            if (this.props.allowResize) {
	                if (this.state.active) {
	                    unFocus(document, window);
	                    var isPrimaryFirst = this.props.primary === 'first';
	                    var ref = isPrimaryFirst ? this.pane1 : this.pane2;
	                    if (ref) {
	                        var node = _reactDom2.default.findDOMNode(ref);
	
	                        if (node.getBoundingClientRect) {
	                            var width = node.getBoundingClientRect().width;
	                            var height = node.getBoundingClientRect().height;
	                            var current = this.props.split === 'vertical' ? event.touches[0].clientX : event.touches[0].clientY;
	                            var size = this.props.split === 'vertical' ? width : height;
	                            var position = this.state.position;
	                            var newPosition = isPrimaryFirst ? position - current : current - position;
	
	                            var maxSize = this.props.maxSize;
	                            if (this.props.maxSize !== undefined && this.props.maxSize <= 0) {
	                                var splPane = this.splitPane;
	                                if (this.props.split === 'vertical') {
	                                    maxSize = splPane.getBoundingClientRect().width + this.props.maxSize;
	                                } else {
	                                    maxSize = splPane.getBoundingClientRect().height + this.props.maxSize;
	                                }
	                            }
	
	                            var newSize = size - newPosition;
	
	                            if (newSize < this.props.minSize) {
	                                newSize = this.props.minSize;
	                            } else if (this.props.maxSize !== undefined && newSize > maxSize) {
	                                newSize = maxSize;
	                            } else {
	                                this.setState({
	                                    position: current,
	                                    resized: true
	                                });
	                            }
	
	                            if (this.props.onChange) {
	                                this.props.onChange(newSize);
	                            }
	                            this.setState({
	                                draggedSize: newSize
	                            });
	                            ref.setState({
	                                size: newSize
	                            });
	                        }
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'onMouseUp',
	        value: function onMouseUp() {
	            if (this.props.allowResize) {
	                if (this.state.active) {
	                    if (typeof this.props.onDragFinished === 'function') {
	                        this.props.onDragFinished(this.state.draggedSize);
	                    }
	                    this.setState({
	                        active: false
	                    });
	                }
	            }
	        }
	    }, {
	        key: 'setSize',
	        value: function setSize(props, state) {
	            var ref = this.props.primary === 'first' ? this.pane1 : this.pane2;
	            var newSize = void 0;
	            if (ref) {
	                newSize = props.size || state && state.draggedSize || props.defaultSize || props.minSize;
	                ref.setState({
	                    size: newSize
	                });
	                if (props.size !== state.draggedSize) {
	                    this.setState({
	                        draggedSize: newSize
	                    });
	                }
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;
	
	            var _props = this.props,
	                split = _props.split,
	                allowResize = _props.allowResize;
	
	            var disabledClass = allowResize ? '' : 'disabled';
	
	            var style = _extends({}, this.props.style || {}, {
	                display: 'flex',
	                flex: 1,
	                position: 'relative',
	                outline: 'none',
	                overflow: 'hidden',
	                MozUserSelect: 'text',
	                WebkitUserSelect: 'text',
	                msUserSelect: 'text',
	                userSelect: 'text'
	            });
	
	            if (split === 'vertical') {
	                _extends(style, {
	                    flexDirection: 'row',
	                    height: '100%',
	                    position: 'absolute',
	                    left: 0,
	                    right: 0
	                });
	            } else {
	                _extends(style, {
	                    flexDirection: 'column',
	                    height: '100%',
	                    minHeight: '100%',
	                    position: 'absolute',
	                    top: 0,
	                    bottom: 0,
	                    width: '100%'
	                });
	            }
	
	            var children = this.props.children;
	            var classes = ['SplitPane', this.props.className, split, disabledClass];
	
	            var pane1Style = this.props.prefixer.prefix(_extends({}, this.props.paneStyle || {}, this.props.pane1Style || {}));
	
	            var pane2Style = this.props.prefixer.prefix(_extends({}, this.props.paneStyle || {}, this.props.pane2Style || {}));
	
	            return _react2.default.createElement(
	                'div',
	                {
	                    className: classes.join(' '),
	                    style: this.props.prefixer.prefix(style),
	                    ref: function ref(node) {
	                        _this2.splitPane = node;
	                    }
	                },
	                _react2.default.createElement(
	                    _Pane2.default,
	                    {
	                        ref: function ref(node) {
	                            _this2.pane1 = node;
	                        },
	                        key: 'pane1', className: 'Pane1',
	                        style: pane1Style,
	                        split: split,
	                        size: this.props.primary === 'first' ? this.props.size || this.props.defaultSize || this.props.minSize : undefined
	                    },
	                    children[0]
	                ),
	                _react2.default.createElement(_Resizer2.default, {
	                    ref: function ref(node) {
	                        _this2.resizer = node;
	                    },
	                    key: 'resizer',
	                    className: disabledClass,
	                    resizerClassName: this.props.resizerClassName,
	                    onMouseDown: this.onMouseDown,
	                    onTouchStart: this.onTouchStart,
	                    onTouchEnd: this.onMouseUp,
	                    style: this.props.resizerStyle || {},
	                    split: split
	                }),
	                _react2.default.createElement(
	                    _Pane2.default,
	                    {
	                        ref: function ref(node) {
	                            _this2.pane2 = node;
	                        },
	                        key: 'pane2',
	                        className: 'Pane2',
	                        style: pane2Style,
	                        split: split,
	                        size: this.props.primary === 'second' ? this.props.size || this.props.defaultSize || this.props.minSize : undefined
	                    },
	                    children[1]
	                )
	            );
	        }
	    }]);
	
	    return SplitPane;
	}(_react.Component);
	
	SplitPane.propTypes = {
	    primary: _react.PropTypes.oneOf(['first', 'second']),
	    minSize: _react.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
	    maxSize: _react.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
	    // eslint-disable-next-line react/no-unused-prop-types
	    defaultSize: _react.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
	    size: _react.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
	    allowResize: _react.PropTypes.bool,
	    split: _react.PropTypes.oneOf(['vertical', 'horizontal']),
	    onDragStarted: _react.PropTypes.func,
	    onDragFinished: _react.PropTypes.func,
	    onChange: _react.PropTypes.func,
	    prefixer: _react.PropTypes.instanceOf(_inlineStylePrefixer2.default).isRequired,
	    style: _reactStyleProptype2.default,
	    resizerStyle: _reactStyleProptype2.default,
	    paneStyle: _reactStyleProptype2.default,
	    pane1Style: _reactStyleProptype2.default,
	    pane2Style: _reactStyleProptype2.default,
	    className: _react.PropTypes.string,
	    resizerClassName: _react.PropTypes.string,
	    children: _react.PropTypes.arrayOf(_react.PropTypes.node).isRequired
	};
	
	SplitPane.defaultProps = {
	    split: 'vertical',
	    minSize: 50,
	    allowResize: true,
	    prefixer: new _inlineStylePrefixer2.default({ userAgent: USER_AGENT }),
	    primary: 'first'
	};
	
	exports.default = SplitPane;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createPrefixer = __webpack_require__(7);
	
	var _createPrefixer2 = _interopRequireDefault(_createPrefixer);
	
	var _cursor = __webpack_require__(16);
	
	var _cursor2 = _interopRequireDefault(_cursor);
	
	var _crossFade = __webpack_require__(18);
	
	var _crossFade2 = _interopRequireDefault(_crossFade);
	
	var _filter = __webpack_require__(19);
	
	var _filter2 = _interopRequireDefault(_filter);
	
	var _flex = __webpack_require__(20);
	
	var _flex2 = _interopRequireDefault(_flex);
	
	var _flexboxOld = __webpack_require__(21);
	
	var _flexboxOld2 = _interopRequireDefault(_flexboxOld);
	
	var _gradient = __webpack_require__(22);
	
	var _gradient2 = _interopRequireDefault(_gradient);
	
	var _imageSet = __webpack_require__(23);
	
	var _imageSet2 = _interopRequireDefault(_imageSet);
	
	var _position = __webpack_require__(24);
	
	var _position2 = _interopRequireDefault(_position);
	
	var _sizing = __webpack_require__(25);
	
	var _sizing2 = _interopRequireDefault(_sizing);
	
	var _transition = __webpack_require__(26);
	
	var _transition2 = _interopRequireDefault(_transition);
	
	var _static = __webpack_require__(29);
	
	var _static2 = _interopRequireDefault(_static);
	
	var _dynamicData = __webpack_require__(44);
	
	var _dynamicData2 = _interopRequireDefault(_dynamicData);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var plugins = [_crossFade2.default, _cursor2.default, _filter2.default, _flexboxOld2.default, _gradient2.default, _imageSet2.default, _position2.default, _sizing2.default, _transition2.default, _flex2.default];
	
	var Prefixer = (0, _createPrefixer2.default)({
	  prefixMap: _dynamicData2.default.prefixMap,
	  plugins: plugins
	}, _static2.default);
	exports.default = Prefixer;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.default = createPrefixer;
	
	var _getBrowserInformation = __webpack_require__(8);
	
	var _getBrowserInformation2 = _interopRequireDefault(_getBrowserInformation);
	
	var _getPrefixedKeyframes = __webpack_require__(11);
	
	var _getPrefixedKeyframes2 = _interopRequireDefault(_getPrefixedKeyframes);
	
	var _capitalizeString = __webpack_require__(12);
	
	var _capitalizeString2 = _interopRequireDefault(_capitalizeString);
	
	var _addNewValuesOnly = __webpack_require__(13);
	
	var _addNewValuesOnly2 = _interopRequireDefault(_addNewValuesOnly);
	
	var _isObject = __webpack_require__(14);
	
	var _isObject2 = _interopRequireDefault(_isObject);
	
	var _prefixValue = __webpack_require__(15);
	
	var _prefixValue2 = _interopRequireDefault(_prefixValue);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function createPrefixer(_ref) {
	  var prefixMap = _ref.prefixMap,
	      plugins = _ref.plugins;
	  var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (style) {
	    return style;
	  };
	
	  return function () {
	    /**
	    * Instantiante a new prefixer
	    * @param {string} userAgent - userAgent to gather prefix information according to caniuse.com
	    * @param {string} keepUnprefixed - keeps unprefixed properties and values
	    */
	    function Prefixer() {
	      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	      _classCallCheck(this, Prefixer);
	
	      var defaultUserAgent = typeof navigator !== 'undefined' ? navigator.userAgent : undefined;
	
	      this._userAgent = options.userAgent || defaultUserAgent;
	      this._keepUnprefixed = options.keepUnprefixed || false;
	
	      if (this._userAgent) {
	        this._browserInfo = (0, _getBrowserInformation2.default)(this._userAgent);
	      }
	
	      // Checks if the userAgent was resolved correctly
	      if (this._browserInfo && this._browserInfo.cssPrefix) {
	        this.prefixedKeyframes = (0, _getPrefixedKeyframes2.default)(this._browserInfo.browserName, this._browserInfo.browserVersion, this._browserInfo.cssPrefix);
	      } else {
	        this._useFallback = true;
	        return false;
	      }
	
	      var prefixData = this._browserInfo.browserName && prefixMap[this._browserInfo.browserName];
	      if (prefixData) {
	        this._requiresPrefix = {};
	
	        for (var property in prefixData) {
	          if (prefixData[property] >= this._browserInfo.browserVersion) {
	            this._requiresPrefix[property] = true;
	          }
	        }
	
	        this._hasPropsRequiringPrefix = Object.keys(this._requiresPrefix).length > 0;
	      } else {
	        this._useFallback = true;
	      }
	
	      this._metaData = {
	        browserVersion: this._browserInfo.browserVersion,
	        browserName: this._browserInfo.browserName,
	        cssPrefix: this._browserInfo.cssPrefix,
	        jsPrefix: this._browserInfo.jsPrefix,
	        keepUnprefixed: this._keepUnprefixed,
	        requiresPrefix: this._requiresPrefix
	      };
	    }
	
	    _createClass(Prefixer, [{
	      key: 'prefix',
	      value: function prefix(style) {
	        // use static prefixer as fallback if userAgent can not be resolved
	        if (this._useFallback) {
	          return fallback(style);
	        }
	
	        // only add prefixes if needed
	        if (!this._hasPropsRequiringPrefix) {
	          return style;
	        }
	
	        return this._prefixStyle(style);
	      }
	    }, {
	      key: '_prefixStyle',
	      value: function _prefixStyle(style) {
	        for (var property in style) {
	          var value = style[property];
	
	          // handle nested objects
	          if ((0, _isObject2.default)(value)) {
	            style[property] = this.prefix(value);
	            // handle array values
	          } else if (Array.isArray(value)) {
	            var combinedValue = [];
	
	            for (var i = 0, len = value.length; i < len; ++i) {
	              var processedValue = (0, _prefixValue2.default)(plugins, property, value[i], style, this._metaData);
	              (0, _addNewValuesOnly2.default)(combinedValue, processedValue || value[i]);
	            }
	
	            // only modify the value if it was touched
	            // by any plugin to prevent unnecessary mutations
	            if (combinedValue.length > 0) {
	              style[property] = combinedValue;
	            }
	          } else {
	            var _processedValue = (0, _prefixValue2.default)(plugins, property, value, style, this._metaData);
	
	            // only modify the value if it was touched
	            // by any plugin to prevent unnecessary mutations
	            if (_processedValue) {
	              style[property] = _processedValue;
	            }
	
	            // add prefixes to properties
	            if (this._requiresPrefix.hasOwnProperty(property)) {
	              style[this._browserInfo.jsPrefix + (0, _capitalizeString2.default)(property)] = value;
	              if (!this._keepUnprefixed) {
	                delete style[property];
	              }
	            }
	          }
	        }
	
	        return style;
	      }
	
	      /**
	      * Returns a prefixed version of the style object using all vendor prefixes
	      * @param {Object} styles - Style object that gets prefixed properties added
	      * @returns {Object} - Style object with prefixed properties and values
	      */
	
	    }], [{
	      key: 'prefixAll',
	      value: function prefixAll(styles) {
	        return fallback(styles);
	      }
	    }]);
	
	    return Prefixer;
	  }();
	}
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getBrowserInformation;
	
	var _bowser = __webpack_require__(9);
	
	var _bowser2 = _interopRequireDefault(_bowser);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var prefixByBrowser = {
	  chrome: 'Webkit',
	  safari: 'Webkit',
	  ios: 'Webkit',
	  android: 'Webkit',
	  phantom: 'Webkit',
	  opera: 'Webkit',
	  webos: 'Webkit',
	  blackberry: 'Webkit',
	  bada: 'Webkit',
	  tizen: 'Webkit',
	  chromium: 'Webkit',
	  vivaldi: 'Webkit',
	  firefox: 'Moz',
	  seamoney: 'Moz',
	  sailfish: 'Moz',
	  msie: 'ms',
	  msedge: 'ms'
	};
	
	
	var browserByCanIuseAlias = {
	  chrome: 'chrome',
	  chromium: 'chrome',
	  safari: 'safari',
	  firfox: 'firefox',
	  msedge: 'edge',
	  opera: 'opera',
	  vivaldi: 'opera',
	  msie: 'ie'
	};
	
	function getBrowserName(browserInfo) {
	  if (browserInfo.firefox) {
	    return 'firefox';
	  }
	
	  if (browserInfo.mobile || browserInfo.tablet) {
	    if (browserInfo.ios) {
	      return 'ios_saf';
	    } else if (browserInfo.android) {
	      return 'android';
	    } else if (browserInfo.opera) {
	      return 'op_mini';
	    }
	  }
	
	  for (var browser in browserByCanIuseAlias) {
	    if (browserInfo.hasOwnProperty(browser)) {
	      return browserByCanIuseAlias[browser];
	    }
	  }
	}
	
	/**
	 * Uses bowser to get default browser browserInformation such as version and name
	 * Evaluates bowser browserInfo and adds vendorPrefix browserInformation
	 * @param {string} userAgent - userAgent that gets evaluated
	 */
	function getBrowserInformation(userAgent) {
	  var browserInfo = _bowser2.default._detect(userAgent);
	
	  for (var browser in prefixByBrowser) {
	    if (browserInfo.hasOwnProperty(browser)) {
	      var prefix = prefixByBrowser[browser];
	
	      browserInfo.jsPrefix = prefix;
	      browserInfo.cssPrefix = '-' + prefix.toLowerCase() + '-';
	      break;
	    }
	  }
	
	  browserInfo.browserName = getBrowserName(browserInfo);
	
	  // For cordova IOS 8 the version is missing, set truncated osversion to prevent NaN
	  if (browserInfo.version) {
	    browserInfo.browserVersion = parseFloat(browserInfo.version);
	  } else {
	    browserInfo.browserVersion = parseInt(parseFloat(browserInfo.osversion), 10);
	  }
	
	  browserInfo.osVersion = parseFloat(browserInfo.osversion);
	
	  // iOS forces all browsers to use Safari under the hood
	  // as the Safari version seems to match the iOS version
	  // we just explicitely use the osversion instead
	  // https://github.com/rofrischmann/inline-style-prefixer/issues/72
	  if (browserInfo.browserName === 'ios_saf' && browserInfo.browserVersion > browserInfo.osVersion) {
	    browserInfo.browserVersion = browserInfo.osVersion;
	  }
	
	  // seperate native android chrome
	  // https://github.com/rofrischmann/inline-style-prefixer/issues/45
	  if (browserInfo.browserName === 'android' && browserInfo.chrome && browserInfo.browserVersion > 37) {
	    browserInfo.browserName = 'and_chr';
	  }
	
	  // For android < 4.4 we want to check the osversion
	  // not the chrome version, see issue #26
	  // https://github.com/rofrischmann/inline-style-prefixer/issues/26
	  if (browserInfo.browserName === 'android' && browserInfo.osVersion < 5) {
	    browserInfo.browserVersion = browserInfo.osVersion;
	  }
	
	  // Samsung browser are basically build on Chrome > 44
	  // https://github.com/rofrischmann/inline-style-prefixer/issues/102
	  if (browserInfo.browserName === 'android' && browserInfo.samsungBrowser) {
	    browserInfo.browserName = 'and_chr';
	    browserInfo.browserVersion = 44;
	  }
	
	  return browserInfo;
	}
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Bowser - a browser detector
	 * https://github.com/ded/bowser
	 * MIT License | (c) Dustin Diaz 2015
	 */
	
	!function (root, name, definition) {
	  if (typeof module != 'undefined' && module.exports) module.exports = definition()
	  else if (true) __webpack_require__(10)(name, definition)
	  else root[name] = definition()
	}(this, 'bowser', function () {
	  /**
	    * See useragents.js for examples of navigator.userAgent
	    */
	
	  var t = true
	
	  function detect(ua) {
	
	    function getFirstMatch(regex) {
	      var match = ua.match(regex);
	      return (match && match.length > 1 && match[1]) || '';
	    }
	
	    function getSecondMatch(regex) {
	      var match = ua.match(regex);
	      return (match && match.length > 1 && match[2]) || '';
	    }
	
	    var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase()
	      , likeAndroid = /like android/i.test(ua)
	      , android = !likeAndroid && /android/i.test(ua)
	      , nexusMobile = /nexus\s*[0-6]\s*/i.test(ua)
	      , nexusTablet = !nexusMobile && /nexus\s*[0-9]+/i.test(ua)
	      , chromeos = /CrOS/.test(ua)
	      , silk = /silk/i.test(ua)
	      , sailfish = /sailfish/i.test(ua)
	      , tizen = /tizen/i.test(ua)
	      , webos = /(web|hpw)os/i.test(ua)
	      , windowsphone = /windows phone/i.test(ua)
	      , samsungBrowser = /SamsungBrowser/i.test(ua)
	      , windows = !windowsphone && /windows/i.test(ua)
	      , mac = !iosdevice && !silk && /macintosh/i.test(ua)
	      , linux = !android && !sailfish && !tizen && !webos && /linux/i.test(ua)
	      , edgeVersion = getFirstMatch(/edge\/(\d+(\.\d+)?)/i)
	      , versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i)
	      , tablet = /tablet/i.test(ua)
	      , mobile = !tablet && /[^-]mobi/i.test(ua)
	      , xbox = /xbox/i.test(ua)
	      , result
	
	    if (/opera/i.test(ua)) {
	      //  an old Opera
	      result = {
	        name: 'Opera'
	      , opera: t
	      , version: versionIdentifier || getFirstMatch(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
	      }
	    } else if (/opr|opios/i.test(ua)) {
	      // a new Opera
	      result = {
	        name: 'Opera'
	        , opera: t
	        , version: getFirstMatch(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || versionIdentifier
	      }
	    }
	    else if (/SamsungBrowser/i.test(ua)) {
	      result = {
	        name: 'Samsung Internet for Android'
	        , samsungBrowser: t
	        , version: versionIdentifier || getFirstMatch(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)
	      }
	    }
	    else if (/coast/i.test(ua)) {
	      result = {
	        name: 'Opera Coast'
	        , coast: t
	        , version: versionIdentifier || getFirstMatch(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
	      }
	    }
	    else if (/yabrowser/i.test(ua)) {
	      result = {
	        name: 'Yandex Browser'
	      , yandexbrowser: t
	      , version: versionIdentifier || getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
	      }
	    }
	    else if (/ucbrowser/i.test(ua)) {
	      result = {
	          name: 'UC Browser'
	        , ucbrowser: t
	        , version: getFirstMatch(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
	      }
	    }
	    else if (/mxios/i.test(ua)) {
	      result = {
	        name: 'Maxthon'
	        , maxthon: t
	        , version: getFirstMatch(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
	      }
	    }
	    else if (/epiphany/i.test(ua)) {
	      result = {
	        name: 'Epiphany'
	        , epiphany: t
	        , version: getFirstMatch(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
	      }
	    }
	    else if (/puffin/i.test(ua)) {
	      result = {
	        name: 'Puffin'
	        , puffin: t
	        , version: getFirstMatch(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
	      }
	    }
	    else if (/sleipnir/i.test(ua)) {
	      result = {
	        name: 'Sleipnir'
	        , sleipnir: t
	        , version: getFirstMatch(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
	      }
	    }
	    else if (/k-meleon/i.test(ua)) {
	      result = {
	        name: 'K-Meleon'
	        , kMeleon: t
	        , version: getFirstMatch(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
	      }
	    }
	    else if (windowsphone) {
	      result = {
	        name: 'Windows Phone'
	      , windowsphone: t
	      }
	      if (edgeVersion) {
	        result.msedge = t
	        result.version = edgeVersion
	      }
	      else {
	        result.msie = t
	        result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i)
	      }
	    }
	    else if (/msie|trident/i.test(ua)) {
	      result = {
	        name: 'Internet Explorer'
	      , msie: t
	      , version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
	      }
	    } else if (chromeos) {
	      result = {
	        name: 'Chrome'
	      , chromeos: t
	      , chromeBook: t
	      , chrome: t
	      , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
	      }
	    } else if (/chrome.+? edge/i.test(ua)) {
	      result = {
	        name: 'Microsoft Edge'
	      , msedge: t
	      , version: edgeVersion
	      }
	    }
	    else if (/vivaldi/i.test(ua)) {
	      result = {
	        name: 'Vivaldi'
	        , vivaldi: t
	        , version: getFirstMatch(/vivaldi\/(\d+(\.\d+)?)/i) || versionIdentifier
	      }
	    }
	    else if (sailfish) {
	      result = {
	        name: 'Sailfish'
	      , sailfish: t
	      , version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
	      }
	    }
	    else if (/seamonkey\//i.test(ua)) {
	      result = {
	        name: 'SeaMonkey'
	      , seamonkey: t
	      , version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
	      }
	    }
	    else if (/firefox|iceweasel|fxios/i.test(ua)) {
	      result = {
	        name: 'Firefox'
	      , firefox: t
	      , version: getFirstMatch(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
	      }
	      if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
	        result.firefoxos = t
	      }
	    }
	    else if (silk) {
	      result =  {
	        name: 'Amazon Silk'
	      , silk: t
	      , version : getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
	      }
	    }
	    else if (/phantom/i.test(ua)) {
	      result = {
	        name: 'PhantomJS'
	      , phantom: t
	      , version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
	      }
	    }
	    else if (/slimerjs/i.test(ua)) {
	      result = {
	        name: 'SlimerJS'
	        , slimer: t
	        , version: getFirstMatch(/slimerjs\/(\d+(\.\d+)?)/i)
	      }
	    }
	    else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
	      result = {
	        name: 'BlackBerry'
	      , blackberry: t
	      , version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
	      }
	    }
	    else if (webos) {
	      result = {
	        name: 'WebOS'
	      , webos: t
	      , version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
	      };
	      /touchpad\//i.test(ua) && (result.touchpad = t)
	    }
	    else if (/bada/i.test(ua)) {
	      result = {
	        name: 'Bada'
	      , bada: t
	      , version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
	      };
	    }
	    else if (tizen) {
	      result = {
	        name: 'Tizen'
	      , tizen: t
	      , version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
	      };
	    }
	    else if (/qupzilla/i.test(ua)) {
	      result = {
	        name: 'QupZilla'
	        , qupzilla: t
	        , version: getFirstMatch(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || versionIdentifier
	      }
	    }
	    else if (/chromium/i.test(ua)) {
	      result = {
	        name: 'Chromium'
	        , chromium: t
	        , version: getFirstMatch(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || versionIdentifier
	      }
	    }
	    else if (/chrome|crios|crmo/i.test(ua)) {
	      result = {
	        name: 'Chrome'
	        , chrome: t
	        , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
	      }
	    }
	    else if (android) {
	      result = {
	        name: 'Android'
	        , version: versionIdentifier
	      }
	    }
	    else if (/safari|applewebkit/i.test(ua)) {
	      result = {
	        name: 'Safari'
	      , safari: t
	      }
	      if (versionIdentifier) {
	        result.version = versionIdentifier
	      }
	    }
	    else if (iosdevice) {
	      result = {
	        name : iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
	      }
	      // WTF: version is not part of user agent in web apps
	      if (versionIdentifier) {
	        result.version = versionIdentifier
	      }
	    }
	    else if(/googlebot/i.test(ua)) {
	      result = {
	        name: 'Googlebot'
	      , googlebot: t
	      , version: getFirstMatch(/googlebot\/(\d+(\.\d+))/i) || versionIdentifier
	      }
	    }
	    else {
	      result = {
	        name: getFirstMatch(/^(.*)\/(.*) /),
	        version: getSecondMatch(/^(.*)\/(.*) /)
	     };
	   }
	
	    // set webkit or gecko flag for browsers based on these engines
	    if (!result.msedge && /(apple)?webkit/i.test(ua)) {
	      if (/(apple)?webkit\/537\.36/i.test(ua)) {
	        result.name = result.name || "Blink"
	        result.blink = t
	      } else {
	        result.name = result.name || "Webkit"
	        result.webkit = t
	      }
	      if (!result.version && versionIdentifier) {
	        result.version = versionIdentifier
	      }
	    } else if (!result.opera && /gecko\//i.test(ua)) {
	      result.name = result.name || "Gecko"
	      result.gecko = t
	      result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i)
	    }
	
	    // set OS flags for platforms that have multiple browsers
	    if (!result.windowsphone && !result.msedge && (android || result.silk)) {
	      result.android = t
	    } else if (!result.windowsphone && !result.msedge && iosdevice) {
	      result[iosdevice] = t
	      result.ios = t
	    } else if (mac) {
	      result.mac = t
	    } else if (xbox) {
	      result.xbox = t
	    } else if (windows) {
	      result.windows = t
	    } else if (linux) {
	      result.linux = t
	    }
	
	    // OS version extraction
	    var osVersion = '';
	    if (result.windowsphone) {
	      osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
	    } else if (iosdevice) {
	      osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
	      osVersion = osVersion.replace(/[_\s]/g, '.');
	    } else if (android) {
	      osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
	    } else if (result.webos) {
	      osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
	    } else if (result.blackberry) {
	      osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
	    } else if (result.bada) {
	      osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
	    } else if (result.tizen) {
	      osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
	    }
	    if (osVersion) {
	      result.osversion = osVersion;
	    }
	
	    // device type extraction
	    var osMajorVersion = osVersion.split('.')[0];
	    if (
	         tablet
	      || nexusTablet
	      || iosdevice == 'ipad'
	      || (android && (osMajorVersion == 3 || (osMajorVersion >= 4 && !mobile)))
	      || result.silk
	    ) {
	      result.tablet = t
	    } else if (
	         mobile
	      || iosdevice == 'iphone'
	      || iosdevice == 'ipod'
	      || android
	      || nexusMobile
	      || result.blackberry
	      || result.webos
	      || result.bada
	    ) {
	      result.mobile = t
	    }
	
	    // Graded Browser Support
	    // http://developer.yahoo.com/yui/articles/gbs
	    if (result.msedge ||
	        (result.msie && result.version >= 10) ||
	        (result.yandexbrowser && result.version >= 15) ||
			    (result.vivaldi && result.version >= 1.0) ||
	        (result.chrome && result.version >= 20) ||
	        (result.samsungBrowser && result.version >= 4) ||
	        (result.firefox && result.version >= 20.0) ||
	        (result.safari && result.version >= 6) ||
	        (result.opera && result.version >= 10.0) ||
	        (result.ios && result.osversion && result.osversion.split(".")[0] >= 6) ||
	        (result.blackberry && result.version >= 10.1)
	        || (result.chromium && result.version >= 20)
	        ) {
	      result.a = t;
	    }
	    else if ((result.msie && result.version < 10) ||
	        (result.chrome && result.version < 20) ||
	        (result.firefox && result.version < 20.0) ||
	        (result.safari && result.version < 6) ||
	        (result.opera && result.version < 10.0) ||
	        (result.ios && result.osversion && result.osversion.split(".")[0] < 6)
	        || (result.chromium && result.version < 20)
	        ) {
	      result.c = t
	    } else result.x = t
	
	    return result
	  }
	
	  var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent || '' : '')
	
	  bowser.test = function (browserList) {
	    for (var i = 0; i < browserList.length; ++i) {
	      var browserItem = browserList[i];
	      if (typeof browserItem=== 'string') {
	        if (browserItem in bowser) {
	          return true;
	        }
	      }
	    }
	    return false;
	  }
	
	  /**
	   * Get version precisions count
	   *
	   * @example
	   *   getVersionPrecision("1.10.3") // 3
	   *
	   * @param  {string} version
	   * @return {number}
	   */
	  function getVersionPrecision(version) {
	    return version.split(".").length;
	  }
	
	  /**
	   * Array::map polyfill
	   *
	   * @param  {Array} arr
	   * @param  {Function} iterator
	   * @return {Array}
	   */
	  function map(arr, iterator) {
	    var result = [], i;
	    if (Array.prototype.map) {
	      return Array.prototype.map.call(arr, iterator);
	    }
	    for (i = 0; i < arr.length; i++) {
	      result.push(iterator(arr[i]));
	    }
	    return result;
	  }
	
	  /**
	   * Calculate browser version weight
	   *
	   * @example
	   *   compareVersions(['1.10.2.1',  '1.8.2.1.90'])    // 1
	   *   compareVersions(['1.010.2.1', '1.09.2.1.90']);  // 1
	   *   compareVersions(['1.10.2.1',  '1.10.2.1']);     // 0
	   *   compareVersions(['1.10.2.1',  '1.0800.2']);     // -1
	   *
	   * @param  {Array<String>} versions versions to compare
	   * @return {Number} comparison result
	   */
	  function compareVersions(versions) {
	    // 1) get common precision for both versions, for example for "10.0" and "9" it should be 2
	    var precision = Math.max(getVersionPrecision(versions[0]), getVersionPrecision(versions[1]));
	    var chunks = map(versions, function (version) {
	      var delta = precision - getVersionPrecision(version);
	
	      // 2) "9" -> "9.0" (for precision = 2)
	      version = version + new Array(delta + 1).join(".0");
	
	      // 3) "9.0" -> ["000000000"", "000000009"]
	      return map(version.split("."), function (chunk) {
	        return new Array(20 - chunk.length).join("0") + chunk;
	      }).reverse();
	    });
	
	    // iterate in reverse order by reversed chunks array
	    while (--precision >= 0) {
	      // 4) compare: "000000009" > "000000010" = false (but "9" > "10" = true)
	      if (chunks[0][precision] > chunks[1][precision]) {
	        return 1;
	      }
	      else if (chunks[0][precision] === chunks[1][precision]) {
	        if (precision === 0) {
	          // all version chunks are same
	          return 0;
	        }
	      }
	      else {
	        return -1;
	      }
	    }
	  }
	
	  /**
	   * Check if browser is unsupported
	   *
	   * @example
	   *   bowser.isUnsupportedBrowser({
	   *     msie: "10",
	   *     firefox: "23",
	   *     chrome: "29",
	   *     safari: "5.1",
	   *     opera: "16",
	   *     phantom: "534"
	   *   });
	   *
	   * @param  {Object}  minVersions map of minimal version to browser
	   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
	   * @param  {String}  [ua] user agent string
	   * @return {Boolean}
	   */
	  function isUnsupportedBrowser(minVersions, strictMode, ua) {
	    var _bowser = bowser;
	
	    // make strictMode param optional with ua param usage
	    if (typeof strictMode === 'string') {
	      ua = strictMode;
	      strictMode = void(0);
	    }
	
	    if (strictMode === void(0)) {
	      strictMode = false;
	    }
	    if (ua) {
	      _bowser = detect(ua);
	    }
	
	    var version = "" + _bowser.version;
	    for (var browser in minVersions) {
	      if (minVersions.hasOwnProperty(browser)) {
	        if (_bowser[browser]) {
	          if (typeof minVersions[browser] !== 'string') {
	            throw new Error('Browser version in the minVersion map should be a string: ' + browser + ': ' + String(minVersions));
	          }
	
	          // browser version and min supported version.
	          return compareVersions([version, minVersions[browser]]) < 0;
	        }
	      }
	    }
	
	    return strictMode; // not found
	  }
	
	  /**
	   * Check if browser is supported
	   *
	   * @param  {Object} minVersions map of minimal version to browser
	   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
	   * @param  {String}  [ua] user agent string
	   * @return {Boolean}
	   */
	  function check(minVersions, strictMode, ua) {
	    return !isUnsupportedBrowser(minVersions, strictMode, ua);
	  }
	
	  bowser.isUnsupportedBrowser = isUnsupportedBrowser;
	  bowser.compareVersions = compareVersions;
	  bowser.check = check;
	
	  /*
	   * Set our detect method to the main bowser object so we can
	   * reuse it to test other user agents.
	   * This is needed to implement future tests.
	   */
	  bowser._detect = detect;
	
	  return bowser
	});


/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getPrefixedKeyframes;
	function getPrefixedKeyframes(browserName, browserVersion, cssPrefix) {
	  var prefixedKeyframes = 'keyframes';
	
	  if (browserName === 'chrome' && browserVersion < 43 || (browserName === 'safari' || browserName === 'ios_saf') && browserVersion < 9 || browserName === 'opera' && browserVersion < 30 || browserName === 'android' && browserVersion <= 4.4 || browserName === 'and_uc') {
	    return cssPrefix + prefixedKeyframes;
	  }
	  return prefixedKeyframes;
	}
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = capitalizeString;
	function capitalizeString(str) {
	  return str.charAt(0).toUpperCase() + str.slice(1);
	}
	module.exports = exports["default"];

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = addNewValuesOnly;
	function addIfNew(list, value) {
	  if (list.indexOf(value) === -1) {
	    list.push(value);
	  }
	}
	
	function addNewValuesOnly(list, values) {
	  if (Array.isArray(values)) {
	    for (var i = 0, len = values.length; i < len; ++i) {
	      addIfNew(list, values[i]);
	    }
	  } else {
	    addIfNew(list, values);
	  }
	}
	module.exports = exports["default"];

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isObject;
	function isObject(value) {
	  return value instanceof Object && !Array.isArray(value);
	}
	module.exports = exports["default"];

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = prefixValue;
	function prefixValue(plugins, property, value, style, metaData) {
	  for (var i = 0, len = plugins.length; i < len; ++i) {
	    var processedValue = plugins[i](property, value, style, metaData);
	
	    // we can stop processing if a value is returned
	    // as all plugin criteria are unique
	    if (processedValue) {
	      return processedValue;
	    }
	  }
	}
	module.exports = exports["default"];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = cursor;
	
	var _getPrefixedValue = __webpack_require__(17);
	
	var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var grabValues = {
	  grab: true,
	  grabbing: true
	};
	
	
	var zoomValues = {
	  'zoom-in': true,
	  'zoom-out': true
	};
	
	function cursor(property, value, style, _ref) {
	  var browserName = _ref.browserName,
	      browserVersion = _ref.browserVersion,
	      cssPrefix = _ref.cssPrefix,
	      keepUnprefixed = _ref.keepUnprefixed;
	
	  // adds prefixes for firefox, chrome, safari, and opera regardless of
	  // version until a reliable browser support info can be found
	  // see: https://github.com/rofrischmann/inline-style-prefixer/issues/79
	  if (property === 'cursor' && grabValues[value] && (browserName === 'firefox' || browserName === 'chrome' || browserName === 'safari' || browserName === 'opera')) {
	    return (0, _getPrefixedValue2.default)(cssPrefix + value, value, keepUnprefixed);
	  }
	
	  if (property === 'cursor' && zoomValues[value] && (browserName === 'firefox' && browserVersion < 24 || browserName === 'chrome' && browserVersion < 37 || browserName === 'safari' && browserVersion < 9 || browserName === 'opera' && browserVersion < 24)) {
	    return (0, _getPrefixedValue2.default)(cssPrefix + value, value, keepUnprefixed);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getPrefixedValue;
	function getPrefixedValue(prefixedValue, value, keepUnprefixed) {
	  if (keepUnprefixed) {
	    return [prefixedValue, value];
	  }
	  return prefixedValue;
	}
	module.exports = exports["default"];

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = crossFade;
	
	var _getPrefixedValue = __webpack_require__(17);
	
	var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function crossFade(property, value, style, _ref) {
	  var browserName = _ref.browserName,
	      browserVersion = _ref.browserVersion,
	      cssPrefix = _ref.cssPrefix,
	      keepUnprefixed = _ref.keepUnprefixed;
	
	  if (typeof value === 'string' && value.indexOf('cross-fade(') > -1 && (browserName === 'chrome' || browserName === 'opera' || browserName === 'and_chr' || (browserName === 'ios_saf' || browserName === 'safari') && browserVersion < 10)) {
	    return (0, _getPrefixedValue2.default)(value.replace(/cross-fade\(/g, cssPrefix + 'cross-fade('), value, keepUnprefixed);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = filter;
	
	var _getPrefixedValue = __webpack_require__(17);
	
	var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function filter(property, value, style, _ref) {
	  var browserName = _ref.browserName,
	      browserVersion = _ref.browserVersion,
	      cssPrefix = _ref.cssPrefix,
	      keepUnprefixed = _ref.keepUnprefixed;
	
	  if (typeof value === 'string' && value.indexOf('filter(') > -1 && (browserName === 'ios_saf' || browserName === 'safari' && browserVersion < 9.1)) {
	    return (0, _getPrefixedValue2.default)(value.replace(/filter\(/g, cssPrefix + 'filter('), value, keepUnprefixed);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = flex;
	
	var _getPrefixedValue = __webpack_require__(17);
	
	var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var values = {
	  flex: true,
	  'inline-flex': true
	};
	function flex(property, value, style, _ref) {
	  var browserName = _ref.browserName,
	      browserVersion = _ref.browserVersion,
	      cssPrefix = _ref.cssPrefix,
	      keepUnprefixed = _ref.keepUnprefixed;
	
	  if (property === 'display' && values[value] && (browserName === 'chrome' && browserVersion < 29 && browserVersion > 20 || (browserName === 'safari' || browserName === 'ios_saf') && browserVersion < 9 && browserVersion > 6 || browserName === 'opera' && (browserVersion === 15 || browserVersion === 16))) {
	    return (0, _getPrefixedValue2.default)(cssPrefix + value, value, keepUnprefixed);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = flexboxOld;
	
	var _getPrefixedValue = __webpack_require__(17);
	
	var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var alternativeValues = {
	  'space-around': 'justify',
	  'space-between': 'justify',
	  'flex-start': 'start',
	  'flex-end': 'end',
	  'wrap-reverse': 'multiple',
	  wrap: 'multiple',
	  flex: 'box',
	  'inline-flex': 'inline-box'
	};
	
	
	var alternativeProps = {
	  alignItems: 'WebkitBoxAlign',
	  justifyContent: 'WebkitBoxPack',
	  flexWrap: 'WebkitBoxLines'
	};
	
	var otherProps = ['alignContent', 'alignSelf', 'order', 'flexGrow', 'flexShrink', 'flexBasis', 'flexDirection'];
	var properties = Object.keys(alternativeProps).concat(otherProps);
	
	function flexboxOld(property, value, style, _ref) {
	  var browserName = _ref.browserName,
	      browserVersion = _ref.browserVersion,
	      cssPrefix = _ref.cssPrefix,
	      keepUnprefixed = _ref.keepUnprefixed,
	      requiresPrefix = _ref.requiresPrefix;
	
	  if ((properties.indexOf(property) > -1 || property === 'display' && typeof value === 'string' && value.indexOf('flex') > -1) && (browserName === 'firefox' && browserVersion < 22 || browserName === 'chrome' && browserVersion < 21 || (browserName === 'safari' || browserName === 'ios_saf') && browserVersion <= 6.1 || browserName === 'android' && browserVersion < 4.4 || browserName === 'and_uc')) {
	    delete requiresPrefix[property];
	
	    if (!keepUnprefixed && !Array.isArray(style[property])) {
	      delete style[property];
	    }
	    if (property === 'flexDirection' && typeof value === 'string') {
	      if (value.indexOf('column') > -1) {
	        style.WebkitBoxOrient = 'vertical';
	      } else {
	        style.WebkitBoxOrient = 'horizontal';
	      }
	      if (value.indexOf('reverse') > -1) {
	        style.WebkitBoxDirection = 'reverse';
	      } else {
	        style.WebkitBoxDirection = 'normal';
	      }
	    }
	    if (property === 'display' && alternativeValues.hasOwnProperty(value)) {
	      return (0, _getPrefixedValue2.default)(cssPrefix + alternativeValues[value], value, keepUnprefixed);
	    }
	    if (alternativeProps.hasOwnProperty(property)) {
	      style[alternativeProps[property]] = alternativeValues[value] || value;
	    }
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = gradient;
	
	var _getPrefixedValue = __webpack_require__(17);
	
	var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/;
	function gradient(property, value, style, _ref) {
	  var browserName = _ref.browserName,
	      browserVersion = _ref.browserVersion,
	      cssPrefix = _ref.cssPrefix,
	      keepUnprefixed = _ref.keepUnprefixed;
	
	  if (typeof value === 'string' && values.test(value) && (browserName === 'firefox' && browserVersion < 16 || browserName === 'chrome' && browserVersion < 26 || (browserName === 'safari' || browserName === 'ios_saf') && browserVersion < 7 || (browserName === 'opera' || browserName === 'op_mini') && browserVersion < 12.1 || browserName === 'android' && browserVersion < 4.4 || browserName === 'and_uc')) {
	    return (0, _getPrefixedValue2.default)(cssPrefix + value, value, keepUnprefixed);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = imageSet;
	
	var _getPrefixedValue = __webpack_require__(17);
	
	var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function imageSet(property, value, style, _ref) {
	  var browserName = _ref.browserName,
	      cssPrefix = _ref.cssPrefix,
	      keepUnprefixed = _ref.keepUnprefixed;
	
	  if (typeof value === 'string' && value.indexOf('image-set(') > -1 && (browserName === 'chrome' || browserName === 'opera' || browserName === 'and_chr' || browserName === 'and_uc' || browserName === 'ios_saf' || browserName === 'safari')) {
	    return (0, _getPrefixedValue2.default)(value.replace(/image-set\(/g, cssPrefix + 'image-set('), value, keepUnprefixed);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = position;
	
	var _getPrefixedValue = __webpack_require__(17);
	
	var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function position(property, value, _ref) {
	  var browserName = _ref.browserName,
	      cssPrefix = _ref.cssPrefix,
	      keepUnprefixed = _ref.keepUnprefixed;
	
	  if (property === 'position' && value === 'sticky' && (browserName === 'safari' || browserName === 'ios_saf')) {
	    return (0, _getPrefixedValue2.default)(cssPrefix + value, value, keepUnprefixed);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = sizing;
	
	var _getPrefixedValue = __webpack_require__(17);
	
	var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var properties = {
	  maxHeight: true,
	  maxWidth: true,
	  width: true,
	  height: true,
	  columnWidth: true,
	  minWidth: true,
	  minHeight: true
	};
	
	var values = {
	  'min-content': true,
	  'max-content': true,
	  'fill-available': true,
	  'fit-content': true,
	  'contain-floats': true
	};
	
	// TODO: chrome & opera support it
	function sizing(property, value, style, _ref) {
	  var cssPrefix = _ref.cssPrefix,
	      keepUnprefixed = _ref.keepUnprefixed;
	
	  // This might change in the future
	  // Keep an eye on it
	  if (properties.hasOwnProperty(property) && values.hasOwnProperty(value)) {
	    return (0, _getPrefixedValue2.default)(cssPrefix + value, value, keepUnprefixed);
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.default = transition;
	
	var _hyphenateProperty = __webpack_require__(27);
	
	var _hyphenateProperty2 = _interopRequireDefault(_hyphenateProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var properties = {
	  transition: true,
	  transitionProperty: true,
	  WebkitTransition: true,
	  WebkitTransitionProperty: true,
	  MozTransition: true,
	  MozTransitionProperty: true
	};
	
	var requiresPrefixDashCased = void 0;
	
	function transition(property, value, style, _ref) {
	  var cssPrefix = _ref.cssPrefix,
	      keepUnprefixed = _ref.keepUnprefixed,
	      requiresPrefix = _ref.requiresPrefix;
	
	  if (typeof value === 'string' && properties.hasOwnProperty(property)) {
	    var _ret = function () {
	      // memoize the prefix array for later use
	      if (!requiresPrefixDashCased) {
	        requiresPrefixDashCased = Object.keys(requiresPrefix).map(function (prop) {
	          return (0, _hyphenateProperty2.default)(prop);
	        });
	      }
	
	      // only split multi values, not cubic beziers
	      var multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);
	
	      requiresPrefixDashCased.forEach(function (prop) {
	        multipleValues.forEach(function (val, index) {
	          if (val.indexOf(prop) > -1 && prop !== 'order') {
	            multipleValues[index] = val.replace(prop, cssPrefix + prop) + (keepUnprefixed ? ',' + val : '');
	          }
	        });
	      });
	
	      return {
	        v: multipleValues.join(',')
	      };
	    }();
	
	    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = hyphenateProperty;
	
	var _hyphenateStyleName = __webpack_require__(28);
	
	var _hyphenateStyleName2 = _interopRequireDefault(_hyphenateStyleName);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function hyphenateProperty(property) {
	  return (0, _hyphenateStyleName2.default)(property);
	}
	module.exports = exports['default'];

/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';
	
	var uppercasePattern = /[A-Z]/g;
	var msPattern = /^ms-/;
	var cache = {};
	
	function hyphenateStyleName(string) {
	    return string in cache
	    ? cache[string]
	    : cache[string] = string
	      .replace(uppercasePattern, '-$&')
	      .toLowerCase()
	      .replace(msPattern, '-ms-');
	}
	
	module.exports = hyphenateStyleName;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createPrefixer = __webpack_require__(30);
	
	var _createPrefixer2 = _interopRequireDefault(_createPrefixer);
	
	var _staticData = __webpack_require__(32);
	
	var _staticData2 = _interopRequireDefault(_staticData);
	
	var _cursor = __webpack_require__(33);
	
	var _cursor2 = _interopRequireDefault(_cursor);
	
	var _crossFade = __webpack_require__(34);
	
	var _crossFade2 = _interopRequireDefault(_crossFade);
	
	var _filter = __webpack_require__(36);
	
	var _filter2 = _interopRequireDefault(_filter);
	
	var _flex = __webpack_require__(37);
	
	var _flex2 = _interopRequireDefault(_flex);
	
	var _flexboxOld = __webpack_require__(38);
	
	var _flexboxOld2 = _interopRequireDefault(_flexboxOld);
	
	var _gradient = __webpack_require__(39);
	
	var _gradient2 = _interopRequireDefault(_gradient);
	
	var _imageSet = __webpack_require__(40);
	
	var _imageSet2 = _interopRequireDefault(_imageSet);
	
	var _position = __webpack_require__(41);
	
	var _position2 = _interopRequireDefault(_position);
	
	var _sizing = __webpack_require__(42);
	
	var _sizing2 = _interopRequireDefault(_sizing);
	
	var _transition = __webpack_require__(43);
	
	var _transition2 = _interopRequireDefault(_transition);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var plugins = [_crossFade2.default, _cursor2.default, _filter2.default, _flexboxOld2.default, _gradient2.default, _imageSet2.default, _position2.default, _sizing2.default, _transition2.default, _flex2.default];
	
	exports.default = (0, _createPrefixer2.default)({
	  prefixMap: _staticData2.default.prefixMap,
	  plugins: plugins
	});
	module.exports = exports['default'];

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = createPrefixer;
	
	var _prefixProperty = __webpack_require__(31);
	
	var _prefixProperty2 = _interopRequireDefault(_prefixProperty);
	
	var _prefixValue = __webpack_require__(15);
	
	var _prefixValue2 = _interopRequireDefault(_prefixValue);
	
	var _addNewValuesOnly = __webpack_require__(13);
	
	var _addNewValuesOnly2 = _interopRequireDefault(_addNewValuesOnly);
	
	var _isObject = __webpack_require__(14);
	
	var _isObject2 = _interopRequireDefault(_isObject);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function createPrefixer(_ref) {
	  var prefixMap = _ref.prefixMap,
	      plugins = _ref.plugins;
	
	  function prefixAll(style) {
	    for (var property in style) {
	      var value = style[property];
	
	      // handle nested objects
	      if ((0, _isObject2.default)(value)) {
	        style[property] = prefixAll(value);
	        // handle array values
	      } else if (Array.isArray(value)) {
	        var combinedValue = [];
	
	        for (var i = 0, len = value.length; i < len; ++i) {
	          var processedValue = (0, _prefixValue2.default)(plugins, property, value[i], style, prefixMap);
	          (0, _addNewValuesOnly2.default)(combinedValue, processedValue || value[i]);
	        }
	
	        // only modify the value if it was touched
	        // by any plugin to prevent unnecessary mutations
	        if (combinedValue.length > 0) {
	          style[property] = combinedValue;
	        }
	      } else {
	        var _processedValue = (0, _prefixValue2.default)(plugins, property, value, style, prefixMap);
	
	        // only modify the value if it was touched
	        // by any plugin to prevent unnecessary mutations
	        if (_processedValue) {
	          style[property] = _processedValue;
	        }
	
	        style = (0, _prefixProperty2.default)(prefixMap, property, style);
	      }
	    }
	
	    return style;
	  }
	
	  return prefixAll;
	}
	module.exports = exports['default'];

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = prefixProperty;
	
	var _capitalizeString = __webpack_require__(12);
	
	var _capitalizeString2 = _interopRequireDefault(_capitalizeString);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function prefixProperty(prefixProperties, property, style) {
	  if (!prefixProperties.hasOwnProperty(property)) {
	    return style;
	  }
	
	  // We need to preserve the order of the styles while inserting new prefixed
	  // styles. Object order is not guaranteed, but this is better than nothing.
	  // Note that this is brittle and is likely to break in older versions of
	  // Node (e.g. Node 4).
	  var newStyle = {};
	  Object.keys(style).forEach(function (styleProperty) {
	    if (styleProperty === property) {
	      // We've found the style we need to prefix.
	      var requiredPrefixes = prefixProperties[property];
	      for (var i = 0, len = requiredPrefixes.length; i < len; ++i) {
	        newStyle[requiredPrefixes[i] + (0, _capitalizeString2.default)(property)] = style[property];
	      }
	    }
	
	    newStyle[styleProperty] = style[styleProperty];
	  });
	
	  return newStyle;
	}
	module.exports = exports['default'];

/***/ },
/* 32 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  plugins: [],
	  prefixMap: { "appearance": ["Webkit", "Moz"], "userSelect": ["Webkit", "Moz", "ms"], "textEmphasisPosition": ["Webkit"], "textEmphasis": ["Webkit"], "textEmphasisStyle": ["Webkit"], "textEmphasisColor": ["Webkit"], "boxDecorationBreak": ["Webkit"], "clipPath": ["Webkit"], "maskImage": ["Webkit"], "maskMode": ["Webkit"], "maskRepeat": ["Webkit"], "maskPosition": ["Webkit"], "maskClip": ["Webkit"], "maskOrigin": ["Webkit"], "maskSize": ["Webkit"], "maskComposite": ["Webkit"], "mask": ["Webkit"], "maskBorderSource": ["Webkit"], "maskBorderMode": ["Webkit"], "maskBorderSlice": ["Webkit"], "maskBorderWidth": ["Webkit"], "maskBorderOutset": ["Webkit"], "maskBorderRepeat": ["Webkit"], "maskBorder": ["Webkit"], "maskType": ["Webkit"], "textDecorationStyle": ["Webkit"], "textDecorationSkip": ["Webkit"], "textDecorationLine": ["Webkit"], "textDecorationColor": ["Webkit"], "filter": ["Webkit"], "fontFeatureSettings": ["Webkit"], "breakAfter": ["Webkit", "Moz", "ms"], "breakBefore": ["Webkit", "Moz", "ms"], "breakInside": ["Webkit", "Moz", "ms"], "columnCount": ["Webkit", "Moz"], "columnFill": ["Webkit", "Moz"], "columnGap": ["Webkit", "Moz"], "columnRule": ["Webkit", "Moz"], "columnRuleColor": ["Webkit", "Moz"], "columnRuleStyle": ["Webkit", "Moz"], "columnRuleWidth": ["Webkit", "Moz"], "columns": ["Webkit", "Moz"], "columnSpan": ["Webkit", "Moz"], "columnWidth": ["Webkit", "Moz"], "flex": ["Webkit"], "flexBasis": ["Webkit"], "flexDirection": ["Webkit"], "flexGrow": ["Webkit"], "flexFlow": ["Webkit"], "flexShrink": ["Webkit"], "flexWrap": ["Webkit"], "alignContent": ["Webkit"], "alignItems": ["Webkit"], "alignSelf": ["Webkit"], "justifyContent": ["Webkit"], "order": ["Webkit"], "transform": ["Webkit"], "transformOrigin": ["Webkit"], "transformOriginX": ["Webkit"], "transformOriginY": ["Webkit"], "backfaceVisibility": ["Webkit"], "perspective": ["Webkit"], "perspectiveOrigin": ["Webkit"], "transformStyle": ["Webkit"], "transformOriginZ": ["Webkit"], "animation": ["Webkit"], "animationDelay": ["Webkit"], "animationDirection": ["Webkit"], "animationFillMode": ["Webkit"], "animationDuration": ["Webkit"], "animationIterationCount": ["Webkit"], "animationName": ["Webkit"], "animationPlayState": ["Webkit"], "animationTimingFunction": ["Webkit"], "backdropFilter": ["Webkit"], "fontKerning": ["Webkit"], "scrollSnapType": ["Webkit", "ms"], "scrollSnapPointsX": ["Webkit", "ms"], "scrollSnapPointsY": ["Webkit", "ms"], "scrollSnapDestination": ["Webkit", "ms"], "scrollSnapCoordinate": ["Webkit", "ms"], "shapeImageThreshold": ["Webkit"], "shapeImageMargin": ["Webkit"], "shapeImageOutside": ["Webkit"], "hyphens": ["Webkit", "Moz", "ms"], "flowInto": ["Webkit", "ms"], "flowFrom": ["Webkit", "ms"], "regionFragment": ["Webkit", "ms"], "textAlignLast": ["Moz"], "tabSize": ["Moz"], "wrapFlow": ["ms"], "wrapThrough": ["ms"], "wrapMargin": ["ms"], "gridTemplateColumns": ["ms"], "gridTemplateRows": ["ms"], "gridTemplateAreas": ["ms"], "gridTemplate": ["ms"], "gridAutoColumns": ["ms"], "gridAutoRows": ["ms"], "gridAutoFlow": ["ms"], "grid": ["ms"], "gridRowStart": ["ms"], "gridColumnStart": ["ms"], "gridRowEnd": ["ms"], "gridRow": ["ms"], "gridColumn": ["ms"], "gridColumnEnd": ["ms"], "gridColumnGap": ["ms"], "gridRowGap": ["ms"], "gridArea": ["ms"], "gridGap": ["ms"], "textSizeAdjust": ["Webkit", "ms"], "transitionDelay": ["Webkit"], "transitionDuration": ["Webkit"], "transitionProperty": ["Webkit"], "transitionTimingFunction": ["Webkit"] }
	};
	module.exports = exports["default"];

/***/ },
/* 33 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = cursor;
	var prefixes = ['-webkit-', '-moz-', ''];
	
	var values = {
	  'zoom-in': true,
	  'zoom-out': true,
	  grab: true,
	  grabbing: true
	};
	
	function cursor(property, value) {
	  if (property === 'cursor' && values.hasOwnProperty(value)) {
	    return prefixes.map(function (prefix) {
	      return prefix + value;
	    });
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = crossFade;
	
	var _isPrefixedValue = __webpack_require__(35);
	
	var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// http://caniuse.com/#search=cross-fade
	var prefixes = ['-webkit-', ''];
	function crossFade(property, value) {
	  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('cross-fade(') > -1) {
	    return prefixes.map(function (prefix) {
	      return value.replace(/cross-fade\(/g, prefix + 'cross-fade(');
	    });
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 35 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isPrefixedValue;
	
	var regex = /-webkit-|-moz-|-ms-/;
	
	function isPrefixedValue(value) {
	  return typeof value === 'string' && regex.test(value);
	}
	module.exports = exports['default'];

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = filter;
	
	var _isPrefixedValue = __webpack_require__(35);
	
	var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// http://caniuse.com/#feat=css-filter-function
	var prefixes = ['-webkit-', ''];
	function filter(property, value) {
	  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('filter(') > -1) {
	    return prefixes.map(function (prefix) {
	      return value.replace(/filter\(/g, prefix + 'filter(');
	    });
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 37 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = flex;
	var values = {
	  flex: true,
	  'inline-flex': true
	};
	
	function flex(property, value) {
	  if (property === 'display' && values.hasOwnProperty(value)) {
	    return ['-webkit-box', '-moz-box', '-ms-' + value + 'box', '-webkit-' + value, value];
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 38 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = flexboxOld;
	var alternativeValues = {
	  'space-around': 'justify',
	  'space-between': 'justify',
	  'flex-start': 'start',
	  'flex-end': 'end',
	  'wrap-reverse': 'multiple',
	  wrap: 'multiple'
	};
	
	var alternativeProps = {
	  alignItems: 'WebkitBoxAlign',
	  justifyContent: 'WebkitBoxPack',
	  flexWrap: 'WebkitBoxLines'
	};
	
	function flexboxOld(property, value, style) {
	  if (property === 'flexDirection' && typeof value === 'string') {
	    if (value.indexOf('column') > -1) {
	      style.WebkitBoxOrient = 'vertical';
	    } else {
	      style.WebkitBoxOrient = 'horizontal';
	    }
	    if (value.indexOf('reverse') > -1) {
	      style.WebkitBoxDirection = 'reverse';
	    } else {
	      style.WebkitBoxDirection = 'normal';
	    }
	  }
	  if (alternativeProps.hasOwnProperty(property)) {
	    style[alternativeProps[property]] = alternativeValues[value] || value;
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = gradient;
	
	var _isPrefixedValue = __webpack_require__(35);
	
	var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var prefixes = ['-webkit-', '-moz-', ''];
	
	var values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/;
	
	function gradient(property, value) {
	  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && values.test(value)) {
	    return prefixes.map(function (prefix) {
	      return prefix + value;
	    });
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = imageSet;
	
	var _isPrefixedValue = __webpack_require__(35);
	
	var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// http://caniuse.com/#feat=css-image-set
	var prefixes = ['-webkit-', ''];
	function imageSet(property, value) {
	  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('image-set(') > -1) {
	    return prefixes.map(function (prefix) {
	      return value.replace(/image-set\(/g, prefix + 'image-set(');
	    });
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 41 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = position;
	function position(property, value) {
	  if (property === 'position' && value === 'sticky') {
	    return ['-webkit-sticky', 'sticky'];
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 42 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = sizing;
	var prefixes = ['-webkit-', '-moz-', ''];
	
	var properties = {
	  maxHeight: true,
	  maxWidth: true,
	  width: true,
	  height: true,
	  columnWidth: true,
	  minWidth: true,
	  minHeight: true
	};
	var values = {
	  'min-content': true,
	  'max-content': true,
	  'fill-available': true,
	  'fit-content': true,
	  'contain-floats': true
	};
	
	function sizing(property, value) {
	  if (properties.hasOwnProperty(property) && values.hasOwnProperty(value)) {
	    return prefixes.map(function (prefix) {
	      return prefix + value;
	    });
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = transition;
	
	var _hyphenateProperty = __webpack_require__(27);
	
	var _hyphenateProperty2 = _interopRequireDefault(_hyphenateProperty);
	
	var _isPrefixedValue = __webpack_require__(35);
	
	var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);
	
	var _capitalizeString = __webpack_require__(12);
	
	var _capitalizeString2 = _interopRequireDefault(_capitalizeString);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var properties = {
	  transition: true,
	  transitionProperty: true,
	  WebkitTransition: true,
	  WebkitTransitionProperty: true,
	  MozTransition: true,
	  MozTransitionProperty: true
	};
	
	
	var prefixMapping = {
	  Webkit: '-webkit-',
	  Moz: '-moz-',
	  ms: '-ms-'
	};
	
	function prefixValue(value, propertyPrefixMap) {
	  if ((0, _isPrefixedValue2.default)(value)) {
	    return value;
	  }
	
	  // only split multi values, not cubic beziers
	  var multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);
	
	  for (var i = 0, len = multipleValues.length; i < len; ++i) {
	    var singleValue = multipleValues[i];
	    var values = [singleValue];
	    for (var property in propertyPrefixMap) {
	      var dashCaseProperty = (0, _hyphenateProperty2.default)(property);
	
	      if (singleValue.indexOf(dashCaseProperty) > -1 && dashCaseProperty !== 'order') {
	        var prefixes = propertyPrefixMap[property];
	        for (var j = 0, pLen = prefixes.length; j < pLen; ++j) {
	          // join all prefixes and create a new value
	          values.unshift(singleValue.replace(dashCaseProperty, prefixMapping[prefixes[j]] + dashCaseProperty));
	        }
	      }
	    }
	
	    multipleValues[i] = values.join(',');
	  }
	
	  return multipleValues.join(',');
	}
	
	function transition(property, value, style, propertyPrefixMap) {
	  // also check for already prefixed transitions
	  if (typeof value === 'string' && properties.hasOwnProperty(property)) {
	    var outputValue = prefixValue(value, propertyPrefixMap);
	    // if the property is already prefixed
	    var webkitOutput = outputValue.split(/,(?![^()]*(?:\([^()]*\))?\))/g).filter(function (val) {
	      return !/-moz-|-ms-/.test(val);
	    }).join(',');
	
	    if (property.indexOf('Webkit') > -1) {
	      return webkitOutput;
	    }
	
	    var mozOutput = outputValue.split(/,(?![^()]*(?:\([^()]*\))?\))/g).filter(function (val) {
	      return !/-webkit-|-ms-/.test(val);
	    }).join(',');
	
	    if (property.indexOf('Moz') > -1) {
	      return mozOutput;
	    }
	
	    style['Webkit' + (0, _capitalizeString2.default)(property)] = webkitOutput;
	    style['Moz' + (0, _capitalizeString2.default)(property)] = mozOutput;
	    return outputValue;
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 44 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  plugins: [],
	  prefixMap: { "chrome": { "appearance": 59, "userSelect": 53, "textEmphasisPosition": 59, "textEmphasis": 59, "textEmphasisStyle": 59, "textEmphasisColor": 59, "boxDecorationBreak": 59, "clipPath": 54, "maskImage": 59, "maskMode": 59, "maskRepeat": 59, "maskPosition": 59, "maskClip": 59, "maskOrigin": 59, "maskSize": 59, "maskComposite": 59, "mask": 59, "maskBorderSource": 59, "maskBorderMode": 59, "maskBorderSlice": 59, "maskBorderWidth": 59, "maskBorderOutset": 59, "maskBorderRepeat": 59, "maskBorder": 59, "maskType": 59, "textDecorationStyle": 56, "textDecorationSkip": 56, "textDecorationLine": 56, "textDecorationColor": 56, "filter": 52, "fontFeatureSettings": 47, "breakAfter": 49, "breakBefore": 49, "breakInside": 49, "columnCount": 49, "columnFill": 49, "columnGap": 49, "columnRule": 49, "columnRuleColor": 49, "columnRuleStyle": 49, "columnRuleWidth": 49, "columns": 49, "columnSpan": 49, "columnWidth": 49 }, "safari": { "flex": 8, "flexBasis": 8, "flexDirection": 8, "flexGrow": 8, "flexFlow": 8, "flexShrink": 8, "flexWrap": 8, "alignContent": 8, "alignItems": 8, "alignSelf": 8, "justifyContent": 8, "order": 8, "transform": 8, "transformOrigin": 8, "transformOriginX": 8, "transformOriginY": 8, "backfaceVisibility": 8, "perspective": 8, "perspectiveOrigin": 8, "transformStyle": 8, "transformOriginZ": 8, "animation": 8, "animationDelay": 8, "animationDirection": 8, "animationFillMode": 8, "animationDuration": 8, "animationIterationCount": 8, "animationName": 8, "animationPlayState": 8, "animationTimingFunction": 8, "appearance": 10.1, "userSelect": 10.1, "backdropFilter": 10.1, "fontKerning": 9, "scrollSnapType": 10.1, "scrollSnapPointsX": 10.1, "scrollSnapPointsY": 10.1, "scrollSnapDestination": 10.1, "scrollSnapCoordinate": 10.1, "boxDecorationBreak": 10.1, "clipPath": 10.1, "maskImage": 10.1, "maskMode": 10.1, "maskRepeat": 10.1, "maskPosition": 10.1, "maskClip": 10.1, "maskOrigin": 10.1, "maskSize": 10.1, "maskComposite": 10.1, "mask": 10.1, "maskBorderSource": 10.1, "maskBorderMode": 10.1, "maskBorderSlice": 10.1, "maskBorderWidth": 10.1, "maskBorderOutset": 10.1, "maskBorderRepeat": 10.1, "maskBorder": 10.1, "maskType": 10.1, "textDecorationStyle": 10.1, "textDecorationSkip": 10.1, "textDecorationLine": 10.1, "textDecorationColor": 10.1, "shapeImageThreshold": 10, "shapeImageMargin": 10, "shapeImageOutside": 10, "filter": 9, "hyphens": 10.1, "flowInto": 10.1, "flowFrom": 10.1, "breakBefore": 8, "breakAfter": 8, "breakInside": 8, "regionFragment": 10.1, "columnCount": 8, "columnFill": 8, "columnGap": 8, "columnRule": 8, "columnRuleColor": 8, "columnRuleStyle": 8, "columnRuleWidth": 8, "columns": 8, "columnSpan": 8, "columnWidth": 8 }, "firefox": { "appearance": 54, "userSelect": 54, "textAlignLast": 48, "tabSize": 54, "hyphens": 42, "breakAfter": 51, "breakBefore": 51, "breakInside": 51, "columnCount": 51, "columnFill": 51, "columnGap": 51, "columnRule": 51, "columnRuleColor": 51, "columnRuleStyle": 51, "columnRuleWidth": 51, "columns": 51, "columnSpan": 51, "columnWidth": 51 }, "opera": { "flex": 16, "flexBasis": 16, "flexDirection": 16, "flexGrow": 16, "flexFlow": 16, "flexShrink": 16, "flexWrap": 16, "alignContent": 16, "alignItems": 16, "alignSelf": 16, "justifyContent": 16, "order": 16, "transform": 22, "transformOrigin": 22, "transformOriginX": 22, "transformOriginY": 22, "backfaceVisibility": 22, "perspective": 22, "perspectiveOrigin": 22, "transformStyle": 22, "transformOriginZ": 22, "animation": 29, "animationDelay": 29, "animationDirection": 29, "animationFillMode": 29, "animationDuration": 29, "animationIterationCount": 29, "animationName": 29, "animationPlayState": 29, "animationTimingFunction": 29, "appearance": 44, "userSelect": 40, "fontKerning": 19, "textEmphasisPosition": 44, "textEmphasis": 44, "textEmphasisStyle": 44, "textEmphasisColor": 44, "boxDecorationBreak": 44, "clipPath": 41, "maskImage": 44, "maskMode": 44, "maskRepeat": 44, "maskPosition": 44, "maskClip": 44, "maskOrigin": 44, "maskSize": 44, "maskComposite": 44, "mask": 44, "maskBorderSource": 44, "maskBorderMode": 44, "maskBorderSlice": 44, "maskBorderWidth": 44, "maskBorderOutset": 44, "maskBorderRepeat": 44, "maskBorder": 44, "maskType": 44, "textDecorationStyle": 43, "textDecorationSkip": 43, "textDecorationLine": 43, "textDecorationColor": 43, "filter": 39, "fontFeatureSettings": 34, "breakAfter": 36, "breakBefore": 36, "breakInside": 36, "columnCount": 36, "columnFill": 36, "columnGap": 36, "columnRule": 36, "columnRuleColor": 36, "columnRuleStyle": 36, "columnRuleWidth": 36, "columns": 36, "columnSpan": 36, "columnWidth": 36 }, "ie": { "userSelect": 11, "wrapFlow": 11, "wrapThrough": 11, "wrapMargin": 11, "scrollSnapType": 11, "scrollSnapPointsX": 11, "scrollSnapPointsY": 11, "scrollSnapDestination": 11, "scrollSnapCoordinate": 11, "hyphens": 11, "flowInto": 11, "flowFrom": 11, "breakBefore": 11, "breakAfter": 11, "breakInside": 11, "regionFragment": 11, "gridTemplateColumns": 11, "gridTemplateRows": 11, "gridTemplateAreas": 11, "gridTemplate": 11, "gridAutoColumns": 11, "gridAutoRows": 11, "gridAutoFlow": 11, "grid": 11, "gridRowStart": 11, "gridColumnStart": 11, "gridRowEnd": 11, "gridRow": 11, "gridColumn": 11, "gridColumnEnd": 11, "gridColumnGap": 11, "gridRowGap": 11, "gridArea": 11, "gridGap": 11, "textSizeAdjust": 11 }, "edge": { "userSelect": 15, "wrapFlow": 15, "wrapThrough": 15, "wrapMargin": 15, "scrollSnapType": 15, "scrollSnapPointsX": 15, "scrollSnapPointsY": 15, "scrollSnapDestination": 15, "scrollSnapCoordinate": 15, "hyphens": 15, "flowInto": 15, "flowFrom": 15, "breakBefore": 15, "breakAfter": 15, "breakInside": 15, "regionFragment": 15, "gridTemplateColumns": 15, "gridTemplateRows": 15, "gridTemplateAreas": 15, "gridTemplate": 15, "gridAutoColumns": 15, "gridAutoRows": 15, "gridAutoFlow": 15, "grid": 15, "gridRowStart": 15, "gridColumnStart": 15, "gridRowEnd": 15, "gridRow": 15, "gridColumn": 15, "gridColumnEnd": 15, "gridColumnGap": 15, "gridRowGap": 15, "gridArea": 15, "gridGap": 15 }, "ios_saf": { "flex": 8.1, "flexBasis": 8.1, "flexDirection": 8.1, "flexGrow": 8.1, "flexFlow": 8.1, "flexShrink": 8.1, "flexWrap": 8.1, "alignContent": 8.1, "alignItems": 8.1, "alignSelf": 8.1, "justifyContent": 8.1, "order": 8.1, "transform": 8.1, "transformOrigin": 8.1, "transformOriginX": 8.1, "transformOriginY": 8.1, "backfaceVisibility": 8.1, "perspective": 8.1, "perspectiveOrigin": 8.1, "transformStyle": 8.1, "transformOriginZ": 8.1, "animation": 8.1, "animationDelay": 8.1, "animationDirection": 8.1, "animationFillMode": 8.1, "animationDuration": 8.1, "animationIterationCount": 8.1, "animationName": 8.1, "animationPlayState": 8.1, "animationTimingFunction": 8.1, "appearance": 10, "userSelect": 10, "backdropFilter": 10, "fontKerning": 10, "scrollSnapType": 10, "scrollSnapPointsX": 10, "scrollSnapPointsY": 10, "scrollSnapDestination": 10, "scrollSnapCoordinate": 10, "boxDecorationBreak": 10, "clipPath": 10, "maskImage": 10, "maskMode": 10, "maskRepeat": 10, "maskPosition": 10, "maskClip": 10, "maskOrigin": 10, "maskSize": 10, "maskComposite": 10, "mask": 10, "maskBorderSource": 10, "maskBorderMode": 10, "maskBorderSlice": 10, "maskBorderWidth": 10, "maskBorderOutset": 10, "maskBorderRepeat": 10, "maskBorder": 10, "maskType": 10, "textSizeAdjust": 10, "textDecorationStyle": 10, "textDecorationSkip": 10, "textDecorationLine": 10, "textDecorationColor": 10, "shapeImageThreshold": 10, "shapeImageMargin": 10, "shapeImageOutside": 10, "filter": 9, "hyphens": 10, "flowInto": 10, "flowFrom": 10, "breakBefore": 8.1, "breakAfter": 8.1, "breakInside": 8.1, "regionFragment": 10, "columnCount": 8.1, "columnFill": 8.1, "columnGap": 8.1, "columnRule": 8.1, "columnRuleColor": 8.1, "columnRuleStyle": 8.1, "columnRuleWidth": 8.1, "columns": 8.1, "columnSpan": 8.1, "columnWidth": 8.1 }, "android": { "flex": 4.2, "flexBasis": 4.2, "flexDirection": 4.2, "flexGrow": 4.2, "flexFlow": 4.2, "flexShrink": 4.2, "flexWrap": 4.2, "alignContent": 4.2, "alignItems": 4.2, "alignSelf": 4.2, "justifyContent": 4.2, "order": 4.2, "transition": 4.2, "transitionDelay": 4.2, "transitionDuration": 4.2, "transitionProperty": 4.2, "transitionTimingFunction": 4.2, "transform": 4.4, "transformOrigin": 4.4, "transformOriginX": 4.4, "transformOriginY": 4.4, "backfaceVisibility": 4.4, "perspective": 4.4, "perspectiveOrigin": 4.4, "transformStyle": 4.4, "transformOriginZ": 4.4, "animation": 4.4, "animationDelay": 4.4, "animationDirection": 4.4, "animationFillMode": 4.4, "animationDuration": 4.4, "animationIterationCount": 4.4, "animationName": 4.4, "animationPlayState": 4.4, "animationTimingFunction": 4.4, "appearance": 53, "userSelect": 53, "fontKerning": 4.4, "textEmphasisPosition": 53, "textEmphasis": 53, "textEmphasisStyle": 53, "textEmphasisColor": 53, "boxDecorationBreak": 53, "clipPath": 53, "maskImage": 53, "maskMode": 53, "maskRepeat": 53, "maskPosition": 53, "maskClip": 53, "maskOrigin": 53, "maskSize": 53, "maskComposite": 53, "mask": 53, "maskBorderSource": 53, "maskBorderMode": 53, "maskBorderSlice": 53, "maskBorderWidth": 53, "maskBorderOutset": 53, "maskBorderRepeat": 53, "maskBorder": 53, "maskType": 53, "filter": 4.4, "fontFeatureSettings": 4.4, "breakAfter": 53, "breakBefore": 53, "breakInside": 53, "columnCount": 53, "columnFill": 53, "columnGap": 53, "columnRule": 53, "columnRuleColor": 53, "columnRuleStyle": 53, "columnRuleWidth": 53, "columns": 53, "columnSpan": 53, "columnWidth": 53 }, "and_chr": { "appearance": 55, "textEmphasisPosition": 55, "textEmphasis": 55, "textEmphasisStyle": 55, "textEmphasisColor": 55, "boxDecorationBreak": 55, "maskImage": 55, "maskMode": 55, "maskRepeat": 55, "maskPosition": 55, "maskClip": 55, "maskOrigin": 55, "maskSize": 55, "maskComposite": 55, "mask": 55, "maskBorderSource": 55, "maskBorderMode": 55, "maskBorderSlice": 55, "maskBorderWidth": 55, "maskBorderOutset": 55, "maskBorderRepeat": 55, "maskBorder": 55, "maskType": 55, "textDecorationStyle": 55, "textDecorationSkip": 55, "textDecorationLine": 55, "textDecorationColor": 55 }, "and_uc": { "flex": 11, "flexBasis": 11, "flexDirection": 11, "flexGrow": 11, "flexFlow": 11, "flexShrink": 11, "flexWrap": 11, "alignContent": 11, "alignItems": 11, "alignSelf": 11, "justifyContent": 11, "order": 11, "transition": 11, "transitionDelay": 11, "transitionDuration": 11, "transitionProperty": 11, "transitionTimingFunction": 11, "transform": 11, "transformOrigin": 11, "transformOriginX": 11, "transformOriginY": 11, "backfaceVisibility": 11, "perspective": 11, "perspectiveOrigin": 11, "transformStyle": 11, "transformOriginZ": 11, "animation": 11, "animationDelay": 11, "animationDirection": 11, "animationFillMode": 11, "animationDuration": 11, "animationIterationCount": 11, "animationName": 11, "animationPlayState": 11, "animationTimingFunction": 11, "appearance": 11, "userSelect": 11, "fontKerning": 11, "textEmphasisPosition": 11, "textEmphasis": 11, "textEmphasisStyle": 11, "textEmphasisColor": 11, "maskImage": 11, "maskMode": 11, "maskRepeat": 11, "maskPosition": 11, "maskClip": 11, "maskOrigin": 11, "maskSize": 11, "maskComposite": 11, "mask": 11, "maskBorderSource": 11, "maskBorderMode": 11, "maskBorderSlice": 11, "maskBorderWidth": 11, "maskBorderOutset": 11, "maskBorderRepeat": 11, "maskBorder": 11, "maskType": 11, "textSizeAdjust": 11, "filter": 11, "hyphens": 11, "flowInto": 11, "flowFrom": 11, "breakBefore": 11, "breakAfter": 11, "breakInside": 11, "regionFragment": 11, "fontFeatureSettings": 11, "columnCount": 11, "columnFill": 11, "columnGap": 11, "columnRule": 11, "columnRuleColor": 11, "columnRuleStyle": 11, "columnRuleWidth": 11, "columns": 11, "columnSpan": 11, "columnWidth": 11 }, "op_mini": {} }
	};
	module.exports = exports["default"];

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var properties = __webpack_require__(46);
	var React = __webpack_require__(1);
	
	module.exports = function(props, propName, componentName) {
	  var styles = props[propName];
	  if (!styles) {
	    return;
	  }
	
	  var failures = [];
	  Object.keys(styles).forEach(function(styleKey){
	    if (properties.indexOf(styleKey) === -1) {
	      failures.push(styleKey);
	    }
	  });
	  if (failures.length) {
	    throw new Error('Prop ' + propName + ' passed to ' + componentName + '. Has invalid keys ' + failures.join(', '));
	  }
	};
	
	module.exports.isRequired = function(props, propName, componentName) {
	  if (!props[propName]) {
	    throw new Error('Prop ' + propName + ' passed to ' + componentName + ' is required');
	  }
	  return module.exports(props, propName, componentName);
	};
	
	module.exports.supportingArrays = React.PropTypes.oneOfType([
	  React.PropTypes.arrayOf(module.exports),
	  module.exports
	]);
	


/***/ },
/* 46 */
/***/ function(module, exports) {

	module.exports = [
	  "alignContent",
	  "MozAlignContent",
	  "WebkitAlignContent",
	  "MSAlignContent",
	  "OAlignContent",
	  "alignItems",
	  "MozAlignItems",
	  "WebkitAlignItems",
	  "MSAlignItems",
	  "OAlignItems",
	  "alignSelf",
	  "MozAlignSelf",
	  "WebkitAlignSelf",
	  "MSAlignSelf",
	  "OAlignSelf",
	  "all",
	  "MozAll",
	  "WebkitAll",
	  "MSAll",
	  "OAll",
	  "animation",
	  "MozAnimation",
	  "WebkitAnimation",
	  "MSAnimation",
	  "OAnimation",
	  "animationDelay",
	  "MozAnimationDelay",
	  "WebkitAnimationDelay",
	  "MSAnimationDelay",
	  "OAnimationDelay",
	  "animationDirection",
	  "MozAnimationDirection",
	  "WebkitAnimationDirection",
	  "MSAnimationDirection",
	  "OAnimationDirection",
	  "animationDuration",
	  "MozAnimationDuration",
	  "WebkitAnimationDuration",
	  "MSAnimationDuration",
	  "OAnimationDuration",
	  "animationFillMode",
	  "MozAnimationFillMode",
	  "WebkitAnimationFillMode",
	  "MSAnimationFillMode",
	  "OAnimationFillMode",
	  "animationIterationCount",
	  "MozAnimationIterationCount",
	  "WebkitAnimationIterationCount",
	  "MSAnimationIterationCount",
	  "OAnimationIterationCount",
	  "animationName",
	  "MozAnimationName",
	  "WebkitAnimationName",
	  "MSAnimationName",
	  "OAnimationName",
	  "animationPlayState",
	  "MozAnimationPlayState",
	  "WebkitAnimationPlayState",
	  "MSAnimationPlayState",
	  "OAnimationPlayState",
	  "animationTimingFunction",
	  "MozAnimationTimingFunction",
	  "WebkitAnimationTimingFunction",
	  "MSAnimationTimingFunction",
	  "OAnimationTimingFunction",
	  "backfaceVisibility",
	  "MozBackfaceVisibility",
	  "WebkitBackfaceVisibility",
	  "MSBackfaceVisibility",
	  "OBackfaceVisibility",
	  "background",
	  "MozBackground",
	  "WebkitBackground",
	  "MSBackground",
	  "OBackground",
	  "backgroundAttachment",
	  "MozBackgroundAttachment",
	  "WebkitBackgroundAttachment",
	  "MSBackgroundAttachment",
	  "OBackgroundAttachment",
	  "backgroundBlendMode",
	  "MozBackgroundBlendMode",
	  "WebkitBackgroundBlendMode",
	  "MSBackgroundBlendMode",
	  "OBackgroundBlendMode",
	  "backgroundClip",
	  "MozBackgroundClip",
	  "WebkitBackgroundClip",
	  "MSBackgroundClip",
	  "OBackgroundClip",
	  "backgroundColor",
	  "MozBackgroundColor",
	  "WebkitBackgroundColor",
	  "MSBackgroundColor",
	  "OBackgroundColor",
	  "backgroundImage",
	  "MozBackgroundImage",
	  "WebkitBackgroundImage",
	  "MSBackgroundImage",
	  "OBackgroundImage",
	  "backgroundOrigin",
	  "MozBackgroundOrigin",
	  "WebkitBackgroundOrigin",
	  "MSBackgroundOrigin",
	  "OBackgroundOrigin",
	  "backgroundPosition",
	  "MozBackgroundPosition",
	  "WebkitBackgroundPosition",
	  "MSBackgroundPosition",
	  "OBackgroundPosition",
	  "backgroundRepeat",
	  "MozBackgroundRepeat",
	  "WebkitBackgroundRepeat",
	  "MSBackgroundRepeat",
	  "OBackgroundRepeat",
	  "backgroundSize",
	  "MozBackgroundSize",
	  "WebkitBackgroundSize",
	  "MSBackgroundSize",
	  "OBackgroundSize",
	  "blockSize",
	  "MozBlockSize",
	  "WebkitBlockSize",
	  "MSBlockSize",
	  "OBlockSize",
	  "border",
	  "MozBorder",
	  "WebkitBorder",
	  "MSBorder",
	  "OBorder",
	  "borderBlockEnd",
	  "MozBorderBlockEnd",
	  "WebkitBorderBlockEnd",
	  "MSBorderBlockEnd",
	  "OBorderBlockEnd",
	  "borderBlockEndColor",
	  "MozBorderBlockEndColor",
	  "WebkitBorderBlockEndColor",
	  "MSBorderBlockEndColor",
	  "OBorderBlockEndColor",
	  "borderBlockEndStyle",
	  "MozBorderBlockEndStyle",
	  "WebkitBorderBlockEndStyle",
	  "MSBorderBlockEndStyle",
	  "OBorderBlockEndStyle",
	  "borderBlockEndWidth",
	  "MozBorderBlockEndWidth",
	  "WebkitBorderBlockEndWidth",
	  "MSBorderBlockEndWidth",
	  "OBorderBlockEndWidth",
	  "borderBlockStart",
	  "MozBorderBlockStart",
	  "WebkitBorderBlockStart",
	  "MSBorderBlockStart",
	  "OBorderBlockStart",
	  "borderBlockStartColor",
	  "MozBorderBlockStartColor",
	  "WebkitBorderBlockStartColor",
	  "MSBorderBlockStartColor",
	  "OBorderBlockStartColor",
	  "borderBlockStartStyle",
	  "MozBorderBlockStartStyle",
	  "WebkitBorderBlockStartStyle",
	  "MSBorderBlockStartStyle",
	  "OBorderBlockStartStyle",
	  "borderBlockStartWidth",
	  "MozBorderBlockStartWidth",
	  "WebkitBorderBlockStartWidth",
	  "MSBorderBlockStartWidth",
	  "OBorderBlockStartWidth",
	  "borderBottom",
	  "MozBorderBottom",
	  "WebkitBorderBottom",
	  "MSBorderBottom",
	  "OBorderBottom",
	  "borderBottomColor",
	  "MozBorderBottomColor",
	  "WebkitBorderBottomColor",
	  "MSBorderBottomColor",
	  "OBorderBottomColor",
	  "borderBottomLeftRadius",
	  "MozBorderBottomLeftRadius",
	  "WebkitBorderBottomLeftRadius",
	  "MSBorderBottomLeftRadius",
	  "OBorderBottomLeftRadius",
	  "borderBottomRightRadius",
	  "MozBorderBottomRightRadius",
	  "WebkitBorderBottomRightRadius",
	  "MSBorderBottomRightRadius",
	  "OBorderBottomRightRadius",
	  "borderBottomStyle",
	  "MozBorderBottomStyle",
	  "WebkitBorderBottomStyle",
	  "MSBorderBottomStyle",
	  "OBorderBottomStyle",
	  "borderBottomWidth",
	  "MozBorderBottomWidth",
	  "WebkitBorderBottomWidth",
	  "MSBorderBottomWidth",
	  "OBorderBottomWidth",
	  "borderCollapse",
	  "MozBorderCollapse",
	  "WebkitBorderCollapse",
	  "MSBorderCollapse",
	  "OBorderCollapse",
	  "borderColor",
	  "MozBorderColor",
	  "WebkitBorderColor",
	  "MSBorderColor",
	  "OBorderColor",
	  "borderImage",
	  "MozBorderImage",
	  "WebkitBorderImage",
	  "MSBorderImage",
	  "OBorderImage",
	  "borderImageOutset",
	  "MozBorderImageOutset",
	  "WebkitBorderImageOutset",
	  "MSBorderImageOutset",
	  "OBorderImageOutset",
	  "borderImageRepeat",
	  "MozBorderImageRepeat",
	  "WebkitBorderImageRepeat",
	  "MSBorderImageRepeat",
	  "OBorderImageRepeat",
	  "borderImageSlice",
	  "MozBorderImageSlice",
	  "WebkitBorderImageSlice",
	  "MSBorderImageSlice",
	  "OBorderImageSlice",
	  "borderImageSource",
	  "MozBorderImageSource",
	  "WebkitBorderImageSource",
	  "MSBorderImageSource",
	  "OBorderImageSource",
	  "borderImageWidth",
	  "MozBorderImageWidth",
	  "WebkitBorderImageWidth",
	  "MSBorderImageWidth",
	  "OBorderImageWidth",
	  "borderInlineEnd",
	  "MozBorderInlineEnd",
	  "WebkitBorderInlineEnd",
	  "MSBorderInlineEnd",
	  "OBorderInlineEnd",
	  "borderInlineEndColor",
	  "MozBorderInlineEndColor",
	  "WebkitBorderInlineEndColor",
	  "MSBorderInlineEndColor",
	  "OBorderInlineEndColor",
	  "borderInlineEndStyle",
	  "MozBorderInlineEndStyle",
	  "WebkitBorderInlineEndStyle",
	  "MSBorderInlineEndStyle",
	  "OBorderInlineEndStyle",
	  "borderInlineEndWidth",
	  "MozBorderInlineEndWidth",
	  "WebkitBorderInlineEndWidth",
	  "MSBorderInlineEndWidth",
	  "OBorderInlineEndWidth",
	  "borderInlineStart",
	  "MozBorderInlineStart",
	  "WebkitBorderInlineStart",
	  "MSBorderInlineStart",
	  "OBorderInlineStart",
	  "borderInlineStartColor",
	  "MozBorderInlineStartColor",
	  "WebkitBorderInlineStartColor",
	  "MSBorderInlineStartColor",
	  "OBorderInlineStartColor",
	  "borderInlineStartStyle",
	  "MozBorderInlineStartStyle",
	  "WebkitBorderInlineStartStyle",
	  "MSBorderInlineStartStyle",
	  "OBorderInlineStartStyle",
	  "borderInlineStartWidth",
	  "MozBorderInlineStartWidth",
	  "WebkitBorderInlineStartWidth",
	  "MSBorderInlineStartWidth",
	  "OBorderInlineStartWidth",
	  "borderLeft",
	  "MozBorderLeft",
	  "WebkitBorderLeft",
	  "MSBorderLeft",
	  "OBorderLeft",
	  "borderLeftColor",
	  "MozBorderLeftColor",
	  "WebkitBorderLeftColor",
	  "MSBorderLeftColor",
	  "OBorderLeftColor",
	  "borderLeftStyle",
	  "MozBorderLeftStyle",
	  "WebkitBorderLeftStyle",
	  "MSBorderLeftStyle",
	  "OBorderLeftStyle",
	  "borderLeftWidth",
	  "MozBorderLeftWidth",
	  "WebkitBorderLeftWidth",
	  "MSBorderLeftWidth",
	  "OBorderLeftWidth",
	  "borderRadius",
	  "MozBorderRadius",
	  "WebkitBorderRadius",
	  "MSBorderRadius",
	  "OBorderRadius",
	  "borderRight",
	  "MozBorderRight",
	  "WebkitBorderRight",
	  "MSBorderRight",
	  "OBorderRight",
	  "borderRightColor",
	  "MozBorderRightColor",
	  "WebkitBorderRightColor",
	  "MSBorderRightColor",
	  "OBorderRightColor",
	  "borderRightStyle",
	  "MozBorderRightStyle",
	  "WebkitBorderRightStyle",
	  "MSBorderRightStyle",
	  "OBorderRightStyle",
	  "borderRightWidth",
	  "MozBorderRightWidth",
	  "WebkitBorderRightWidth",
	  "MSBorderRightWidth",
	  "OBorderRightWidth",
	  "borderSpacing",
	  "MozBorderSpacing",
	  "WebkitBorderSpacing",
	  "MSBorderSpacing",
	  "OBorderSpacing",
	  "borderStyle",
	  "MozBorderStyle",
	  "WebkitBorderStyle",
	  "MSBorderStyle",
	  "OBorderStyle",
	  "borderTop",
	  "MozBorderTop",
	  "WebkitBorderTop",
	  "MSBorderTop",
	  "OBorderTop",
	  "borderTopColor",
	  "MozBorderTopColor",
	  "WebkitBorderTopColor",
	  "MSBorderTopColor",
	  "OBorderTopColor",
	  "borderTopLeftRadius",
	  "MozBorderTopLeftRadius",
	  "WebkitBorderTopLeftRadius",
	  "MSBorderTopLeftRadius",
	  "OBorderTopLeftRadius",
	  "borderTopRightRadius",
	  "MozBorderTopRightRadius",
	  "WebkitBorderTopRightRadius",
	  "MSBorderTopRightRadius",
	  "OBorderTopRightRadius",
	  "borderTopStyle",
	  "MozBorderTopStyle",
	  "WebkitBorderTopStyle",
	  "MSBorderTopStyle",
	  "OBorderTopStyle",
	  "borderTopWidth",
	  "MozBorderTopWidth",
	  "WebkitBorderTopWidth",
	  "MSBorderTopWidth",
	  "OBorderTopWidth",
	  "borderWidth",
	  "MozBorderWidth",
	  "WebkitBorderWidth",
	  "MSBorderWidth",
	  "OBorderWidth",
	  "bottom",
	  "MozBottom",
	  "WebkitBottom",
	  "MSBottom",
	  "OBottom",
	  "boxDecorationBreak",
	  "MozBoxDecorationBreak",
	  "WebkitBoxDecorationBreak",
	  "MSBoxDecorationBreak",
	  "OBoxDecorationBreak",
	  "boxShadow",
	  "MozBoxShadow",
	  "WebkitBoxShadow",
	  "MSBoxShadow",
	  "OBoxShadow",
	  "boxSizing",
	  "MozBoxSizing",
	  "WebkitBoxSizing",
	  "MSBoxSizing",
	  "OBoxSizing",
	  "breakAfter",
	  "MozBreakAfter",
	  "WebkitBreakAfter",
	  "MSBreakAfter",
	  "OBreakAfter",
	  "breakBefore",
	  "MozBreakBefore",
	  "WebkitBreakBefore",
	  "MSBreakBefore",
	  "OBreakBefore",
	  "breakInside",
	  "MozBreakInside",
	  "WebkitBreakInside",
	  "MSBreakInside",
	  "OBreakInside",
	  "captionSide",
	  "MozCaptionSide",
	  "WebkitCaptionSide",
	  "MSCaptionSide",
	  "OCaptionSide",
	  "caretColor",
	  "MozCaretColor",
	  "WebkitCaretColor",
	  "MSCaretColor",
	  "OCaretColor",
	  "ch",
	  "MozCh",
	  "WebkitCh",
	  "MSCh",
	  "OCh",
	  "clear",
	  "MozClear",
	  "WebkitClear",
	  "MSClear",
	  "OClear",
	  "clip",
	  "MozClip",
	  "WebkitClip",
	  "MSClip",
	  "OClip",
	  "clipPath",
	  "MozClipPath",
	  "WebkitClipPath",
	  "MSClipPath",
	  "OClipPath",
	  "cm",
	  "MozCm",
	  "WebkitCm",
	  "MSCm",
	  "OCm",
	  "color",
	  "MozColor",
	  "WebkitColor",
	  "MSColor",
	  "OColor",
	  "columnCount",
	  "MozColumnCount",
	  "WebkitColumnCount",
	  "MSColumnCount",
	  "OColumnCount",
	  "columnFill",
	  "MozColumnFill",
	  "WebkitColumnFill",
	  "MSColumnFill",
	  "OColumnFill",
	  "columnGap",
	  "MozColumnGap",
	  "WebkitColumnGap",
	  "MSColumnGap",
	  "OColumnGap",
	  "columnRule",
	  "MozColumnRule",
	  "WebkitColumnRule",
	  "MSColumnRule",
	  "OColumnRule",
	  "columnRuleColor",
	  "MozColumnRuleColor",
	  "WebkitColumnRuleColor",
	  "MSColumnRuleColor",
	  "OColumnRuleColor",
	  "columnRuleStyle",
	  "MozColumnRuleStyle",
	  "WebkitColumnRuleStyle",
	  "MSColumnRuleStyle",
	  "OColumnRuleStyle",
	  "columnRuleWidth",
	  "MozColumnRuleWidth",
	  "WebkitColumnRuleWidth",
	  "MSColumnRuleWidth",
	  "OColumnRuleWidth",
	  "columnSpan",
	  "MozColumnSpan",
	  "WebkitColumnSpan",
	  "MSColumnSpan",
	  "OColumnSpan",
	  "columnWidth",
	  "MozColumnWidth",
	  "WebkitColumnWidth",
	  "MSColumnWidth",
	  "OColumnWidth",
	  "columns",
	  "MozColumns",
	  "WebkitColumns",
	  "MSColumns",
	  "OColumns",
	  "content",
	  "MozContent",
	  "WebkitContent",
	  "MSContent",
	  "OContent",
	  "counterIncrement",
	  "MozCounterIncrement",
	  "WebkitCounterIncrement",
	  "MSCounterIncrement",
	  "OCounterIncrement",
	  "counterReset",
	  "MozCounterReset",
	  "WebkitCounterReset",
	  "MSCounterReset",
	  "OCounterReset",
	  "cursor",
	  "MozCursor",
	  "WebkitCursor",
	  "MSCursor",
	  "OCursor",
	  "deg",
	  "MozDeg",
	  "WebkitDeg",
	  "MSDeg",
	  "ODeg",
	  "direction",
	  "MozDirection",
	  "WebkitDirection",
	  "MSDirection",
	  "ODirection",
	  "display",
	  "MozDisplay",
	  "WebkitDisplay",
	  "MSDisplay",
	  "ODisplay",
	  "dpcm",
	  "MozDpcm",
	  "WebkitDpcm",
	  "MSDpcm",
	  "ODpcm",
	  "dpi",
	  "MozDpi",
	  "WebkitDpi",
	  "MSDpi",
	  "ODpi",
	  "dppx",
	  "MozDppx",
	  "WebkitDppx",
	  "MSDppx",
	  "ODppx",
	  "em",
	  "MozEm",
	  "WebkitEm",
	  "MSEm",
	  "OEm",
	  "emptyCells",
	  "MozEmptyCells",
	  "WebkitEmptyCells",
	  "MSEmptyCells",
	  "OEmptyCells",
	  "ex",
	  "MozEx",
	  "WebkitEx",
	  "MSEx",
	  "OEx",
	  "filter",
	  "MozFilter",
	  "WebkitFilter",
	  "MSFilter",
	  "OFilter",
	  "flexBasis",
	  "MozFlexBasis",
	  "WebkitFlexBasis",
	  "MSFlexBasis",
	  "OFlexBasis",
	  "flexDirection",
	  "MozFlexDirection",
	  "WebkitFlexDirection",
	  "MSFlexDirection",
	  "OFlexDirection",
	  "flexFlow",
	  "MozFlexFlow",
	  "WebkitFlexFlow",
	  "MSFlexFlow",
	  "OFlexFlow",
	  "flexGrow",
	  "MozFlexGrow",
	  "WebkitFlexGrow",
	  "MSFlexGrow",
	  "OFlexGrow",
	  "flexShrink",
	  "MozFlexShrink",
	  "WebkitFlexShrink",
	  "MSFlexShrink",
	  "OFlexShrink",
	  "flexWrap",
	  "MozFlexWrap",
	  "WebkitFlexWrap",
	  "MSFlexWrap",
	  "OFlexWrap",
	  "float",
	  "MozFloat",
	  "WebkitFloat",
	  "MSFloat",
	  "OFloat",
	  "font",
	  "MozFont",
	  "WebkitFont",
	  "MSFont",
	  "OFont",
	  "fontFamily",
	  "MozFontFamily",
	  "WebkitFontFamily",
	  "MSFontFamily",
	  "OFontFamily",
	  "fontFeatureSettings",
	  "MozFontFeatureSettings",
	  "WebkitFontFeatureSettings",
	  "MSFontFeatureSettings",
	  "OFontFeatureSettings",
	  "fontKerning",
	  "MozFontKerning",
	  "WebkitFontKerning",
	  "MSFontKerning",
	  "OFontKerning",
	  "fontLanguageOverride",
	  "MozFontLanguageOverride",
	  "WebkitFontLanguageOverride",
	  "MSFontLanguageOverride",
	  "OFontLanguageOverride",
	  "fontSize",
	  "MozFontSize",
	  "WebkitFontSize",
	  "MSFontSize",
	  "OFontSize",
	  "fontSizeAdjust",
	  "MozFontSizeAdjust",
	  "WebkitFontSizeAdjust",
	  "MSFontSizeAdjust",
	  "OFontSizeAdjust",
	  "fontStretch",
	  "MozFontStretch",
	  "WebkitFontStretch",
	  "MSFontStretch",
	  "OFontStretch",
	  "fontStyle",
	  "MozFontStyle",
	  "WebkitFontStyle",
	  "MSFontStyle",
	  "OFontStyle",
	  "fontSynthesis",
	  "MozFontSynthesis",
	  "WebkitFontSynthesis",
	  "MSFontSynthesis",
	  "OFontSynthesis",
	  "fontVariant",
	  "MozFontVariant",
	  "WebkitFontVariant",
	  "MSFontVariant",
	  "OFontVariant",
	  "fontVariantAlternates",
	  "MozFontVariantAlternates",
	  "WebkitFontVariantAlternates",
	  "MSFontVariantAlternates",
	  "OFontVariantAlternates",
	  "fontVariantCaps",
	  "MozFontVariantCaps",
	  "WebkitFontVariantCaps",
	  "MSFontVariantCaps",
	  "OFontVariantCaps",
	  "fontVariantEastAsian",
	  "MozFontVariantEastAsian",
	  "WebkitFontVariantEastAsian",
	  "MSFontVariantEastAsian",
	  "OFontVariantEastAsian",
	  "fontVariantLigatures",
	  "MozFontVariantLigatures",
	  "WebkitFontVariantLigatures",
	  "MSFontVariantLigatures",
	  "OFontVariantLigatures",
	  "fontVariantNumeric",
	  "MozFontVariantNumeric",
	  "WebkitFontVariantNumeric",
	  "MSFontVariantNumeric",
	  "OFontVariantNumeric",
	  "fontVariantPosition",
	  "MozFontVariantPosition",
	  "WebkitFontVariantPosition",
	  "MSFontVariantPosition",
	  "OFontVariantPosition",
	  "fontWeight",
	  "MozFontWeight",
	  "WebkitFontWeight",
	  "MSFontWeight",
	  "OFontWeight",
	  "fr",
	  "MozFr",
	  "WebkitFr",
	  "MSFr",
	  "OFr",
	  "grad",
	  "MozGrad",
	  "WebkitGrad",
	  "MSGrad",
	  "OGrad",
	  "grid",
	  "MozGrid",
	  "WebkitGrid",
	  "MSGrid",
	  "OGrid",
	  "gridArea",
	  "MozGridArea",
	  "WebkitGridArea",
	  "MSGridArea",
	  "OGridArea",
	  "gridAutoColumns",
	  "MozGridAutoColumns",
	  "WebkitGridAutoColumns",
	  "MSGridAutoColumns",
	  "OGridAutoColumns",
	  "gridAutoFlow",
	  "MozGridAutoFlow",
	  "WebkitGridAutoFlow",
	  "MSGridAutoFlow",
	  "OGridAutoFlow",
	  "gridAutoRows",
	  "MozGridAutoRows",
	  "WebkitGridAutoRows",
	  "MSGridAutoRows",
	  "OGridAutoRows",
	  "gridColumn",
	  "MozGridColumn",
	  "WebkitGridColumn",
	  "MSGridColumn",
	  "OGridColumn",
	  "gridColumnEnd",
	  "MozGridColumnEnd",
	  "WebkitGridColumnEnd",
	  "MSGridColumnEnd",
	  "OGridColumnEnd",
	  "gridColumnGap",
	  "MozGridColumnGap",
	  "WebkitGridColumnGap",
	  "MSGridColumnGap",
	  "OGridColumnGap",
	  "gridColumnStart",
	  "MozGridColumnStart",
	  "WebkitGridColumnStart",
	  "MSGridColumnStart",
	  "OGridColumnStart",
	  "gridGap",
	  "MozGridGap",
	  "WebkitGridGap",
	  "MSGridGap",
	  "OGridGap",
	  "gridRow",
	  "MozGridRow",
	  "WebkitGridRow",
	  "MSGridRow",
	  "OGridRow",
	  "gridRowEnd",
	  "MozGridRowEnd",
	  "WebkitGridRowEnd",
	  "MSGridRowEnd",
	  "OGridRowEnd",
	  "gridRowGap",
	  "MozGridRowGap",
	  "WebkitGridRowGap",
	  "MSGridRowGap",
	  "OGridRowGap",
	  "gridRowStart",
	  "MozGridRowStart",
	  "WebkitGridRowStart",
	  "MSGridRowStart",
	  "OGridRowStart",
	  "gridTemplate",
	  "MozGridTemplate",
	  "WebkitGridTemplate",
	  "MSGridTemplate",
	  "OGridTemplate",
	  "gridTemplateAreas",
	  "MozGridTemplateAreas",
	  "WebkitGridTemplateAreas",
	  "MSGridTemplateAreas",
	  "OGridTemplateAreas",
	  "gridTemplateColumns",
	  "MozGridTemplateColumns",
	  "WebkitGridTemplateColumns",
	  "MSGridTemplateColumns",
	  "OGridTemplateColumns",
	  "gridTemplateRows",
	  "MozGridTemplateRows",
	  "WebkitGridTemplateRows",
	  "MSGridTemplateRows",
	  "OGridTemplateRows",
	  "height",
	  "MozHeight",
	  "WebkitHeight",
	  "MSHeight",
	  "OHeight",
	  "hyphens",
	  "MozHyphens",
	  "WebkitHyphens",
	  "MSHyphens",
	  "OHyphens",
	  "hz",
	  "MozHz",
	  "WebkitHz",
	  "MSHz",
	  "OHz",
	  "imageOrientation",
	  "MozImageOrientation",
	  "WebkitImageOrientation",
	  "MSImageOrientation",
	  "OImageOrientation",
	  "imageRendering",
	  "MozImageRendering",
	  "WebkitImageRendering",
	  "MSImageRendering",
	  "OImageRendering",
	  "imageResolution",
	  "MozImageResolution",
	  "WebkitImageResolution",
	  "MSImageResolution",
	  "OImageResolution",
	  "imeMode",
	  "MozImeMode",
	  "WebkitImeMode",
	  "MSImeMode",
	  "OImeMode",
	  "in",
	  "MozIn",
	  "WebkitIn",
	  "MSIn",
	  "OIn",
	  "inherit",
	  "MozInherit",
	  "WebkitInherit",
	  "MSInherit",
	  "OInherit",
	  "initial",
	  "MozInitial",
	  "WebkitInitial",
	  "MSInitial",
	  "OInitial",
	  "inlineSize",
	  "MozInlineSize",
	  "WebkitInlineSize",
	  "MSInlineSize",
	  "OInlineSize",
	  "isolation",
	  "MozIsolation",
	  "WebkitIsolation",
	  "MSIsolation",
	  "OIsolation",
	  "justifyContent",
	  "MozJustifyContent",
	  "WebkitJustifyContent",
	  "MSJustifyContent",
	  "OJustifyContent",
	  "khz",
	  "MozKhz",
	  "WebkitKhz",
	  "MSKhz",
	  "OKhz",
	  "left",
	  "MozLeft",
	  "WebkitLeft",
	  "MSLeft",
	  "OLeft",
	  "letterSpacing",
	  "MozLetterSpacing",
	  "WebkitLetterSpacing",
	  "MSLetterSpacing",
	  "OLetterSpacing",
	  "lineBreak",
	  "MozLineBreak",
	  "WebkitLineBreak",
	  "MSLineBreak",
	  "OLineBreak",
	  "lineHeight",
	  "MozLineHeight",
	  "WebkitLineHeight",
	  "MSLineHeight",
	  "OLineHeight",
	  "listStyle",
	  "MozListStyle",
	  "WebkitListStyle",
	  "MSListStyle",
	  "OListStyle",
	  "listStyleImage",
	  "MozListStyleImage",
	  "WebkitListStyleImage",
	  "MSListStyleImage",
	  "OListStyleImage",
	  "listStylePosition",
	  "MozListStylePosition",
	  "WebkitListStylePosition",
	  "MSListStylePosition",
	  "OListStylePosition",
	  "listStyleType",
	  "MozListStyleType",
	  "WebkitListStyleType",
	  "MSListStyleType",
	  "OListStyleType",
	  "margin",
	  "MozMargin",
	  "WebkitMargin",
	  "MSMargin",
	  "OMargin",
	  "marginBlockEnd",
	  "MozMarginBlockEnd",
	  "WebkitMarginBlockEnd",
	  "MSMarginBlockEnd",
	  "OMarginBlockEnd",
	  "marginBlockStart",
	  "MozMarginBlockStart",
	  "WebkitMarginBlockStart",
	  "MSMarginBlockStart",
	  "OMarginBlockStart",
	  "marginBottom",
	  "MozMarginBottom",
	  "WebkitMarginBottom",
	  "MSMarginBottom",
	  "OMarginBottom",
	  "marginInlineEnd",
	  "MozMarginInlineEnd",
	  "WebkitMarginInlineEnd",
	  "MSMarginInlineEnd",
	  "OMarginInlineEnd",
	  "marginInlineStart",
	  "MozMarginInlineStart",
	  "WebkitMarginInlineStart",
	  "MSMarginInlineStart",
	  "OMarginInlineStart",
	  "marginLeft",
	  "MozMarginLeft",
	  "WebkitMarginLeft",
	  "MSMarginLeft",
	  "OMarginLeft",
	  "marginRight",
	  "MozMarginRight",
	  "WebkitMarginRight",
	  "MSMarginRight",
	  "OMarginRight",
	  "marginTop",
	  "MozMarginTop",
	  "WebkitMarginTop",
	  "MSMarginTop",
	  "OMarginTop",
	  "mask",
	  "MozMask",
	  "WebkitMask",
	  "MSMask",
	  "OMask",
	  "maskClip",
	  "MozMaskClip",
	  "WebkitMaskClip",
	  "MSMaskClip",
	  "OMaskClip",
	  "maskComposite",
	  "MozMaskComposite",
	  "WebkitMaskComposite",
	  "MSMaskComposite",
	  "OMaskComposite",
	  "maskImage",
	  "MozMaskImage",
	  "WebkitMaskImage",
	  "MSMaskImage",
	  "OMaskImage",
	  "maskMode",
	  "MozMaskMode",
	  "WebkitMaskMode",
	  "MSMaskMode",
	  "OMaskMode",
	  "maskOrigin",
	  "MozMaskOrigin",
	  "WebkitMaskOrigin",
	  "MSMaskOrigin",
	  "OMaskOrigin",
	  "maskPosition",
	  "MozMaskPosition",
	  "WebkitMaskPosition",
	  "MSMaskPosition",
	  "OMaskPosition",
	  "maskRepeat",
	  "MozMaskRepeat",
	  "WebkitMaskRepeat",
	  "MSMaskRepeat",
	  "OMaskRepeat",
	  "maskSize",
	  "MozMaskSize",
	  "WebkitMaskSize",
	  "MSMaskSize",
	  "OMaskSize",
	  "maskType",
	  "MozMaskType",
	  "WebkitMaskType",
	  "MSMaskType",
	  "OMaskType",
	  "maxBlockSize",
	  "MozMaxBlockSize",
	  "WebkitMaxBlockSize",
	  "MSMaxBlockSize",
	  "OMaxBlockSize",
	  "maxHeight",
	  "MozMaxHeight",
	  "WebkitMaxHeight",
	  "MSMaxHeight",
	  "OMaxHeight",
	  "maxInlineSize",
	  "MozMaxInlineSize",
	  "WebkitMaxInlineSize",
	  "MSMaxInlineSize",
	  "OMaxInlineSize",
	  "maxWidth",
	  "MozMaxWidth",
	  "WebkitMaxWidth",
	  "MSMaxWidth",
	  "OMaxWidth",
	  "minBlockSize",
	  "MozMinBlockSize",
	  "WebkitMinBlockSize",
	  "MSMinBlockSize",
	  "OMinBlockSize",
	  "minHeight",
	  "MozMinHeight",
	  "WebkitMinHeight",
	  "MSMinHeight",
	  "OMinHeight",
	  "minInlineSize",
	  "MozMinInlineSize",
	  "WebkitMinInlineSize",
	  "MSMinInlineSize",
	  "OMinInlineSize",
	  "minWidth",
	  "MozMinWidth",
	  "WebkitMinWidth",
	  "MSMinWidth",
	  "OMinWidth",
	  "mixBlendMode",
	  "MozMixBlendMode",
	  "WebkitMixBlendMode",
	  "MSMixBlendMode",
	  "OMixBlendMode",
	  "mm",
	  "MozMm",
	  "WebkitMm",
	  "MSMm",
	  "OMm",
	  "ms",
	  "MozMs",
	  "WebkitMs",
	  "MSMs",
	  "OMs",
	  "objectFit",
	  "MozObjectFit",
	  "WebkitObjectFit",
	  "MSObjectFit",
	  "OObjectFit",
	  "objectPosition",
	  "MozObjectPosition",
	  "WebkitObjectPosition",
	  "MSObjectPosition",
	  "OObjectPosition",
	  "offsetBlockEnd",
	  "MozOffsetBlockEnd",
	  "WebkitOffsetBlockEnd",
	  "MSOffsetBlockEnd",
	  "OOffsetBlockEnd",
	  "offsetBlockStart",
	  "MozOffsetBlockStart",
	  "WebkitOffsetBlockStart",
	  "MSOffsetBlockStart",
	  "OOffsetBlockStart",
	  "offsetInlineEnd",
	  "MozOffsetInlineEnd",
	  "WebkitOffsetInlineEnd",
	  "MSOffsetInlineEnd",
	  "OOffsetInlineEnd",
	  "offsetInlineStart",
	  "MozOffsetInlineStart",
	  "WebkitOffsetInlineStart",
	  "MSOffsetInlineStart",
	  "OOffsetInlineStart",
	  "opacity",
	  "MozOpacity",
	  "WebkitOpacity",
	  "MSOpacity",
	  "OOpacity",
	  "order",
	  "MozOrder",
	  "WebkitOrder",
	  "MSOrder",
	  "OOrder",
	  "orphans",
	  "MozOrphans",
	  "WebkitOrphans",
	  "MSOrphans",
	  "OOrphans",
	  "outline",
	  "MozOutline",
	  "WebkitOutline",
	  "MSOutline",
	  "OOutline",
	  "outlineColor",
	  "MozOutlineColor",
	  "WebkitOutlineColor",
	  "MSOutlineColor",
	  "OOutlineColor",
	  "outlineOffset",
	  "MozOutlineOffset",
	  "WebkitOutlineOffset",
	  "MSOutlineOffset",
	  "OOutlineOffset",
	  "outlineStyle",
	  "MozOutlineStyle",
	  "WebkitOutlineStyle",
	  "MSOutlineStyle",
	  "OOutlineStyle",
	  "outlineWidth",
	  "MozOutlineWidth",
	  "WebkitOutlineWidth",
	  "MSOutlineWidth",
	  "OOutlineWidth",
	  "overflow",
	  "MozOverflow",
	  "WebkitOverflow",
	  "MSOverflow",
	  "OOverflow",
	  "overflowWrap",
	  "MozOverflowWrap",
	  "WebkitOverflowWrap",
	  "MSOverflowWrap",
	  "OOverflowWrap",
	  "overflowX",
	  "MozOverflowX",
	  "WebkitOverflowX",
	  "MSOverflowX",
	  "OOverflowX",
	  "overflowY",
	  "MozOverflowY",
	  "WebkitOverflowY",
	  "MSOverflowY",
	  "OOverflowY",
	  "padding",
	  "MozPadding",
	  "WebkitPadding",
	  "MSPadding",
	  "OPadding",
	  "paddingBlockEnd",
	  "MozPaddingBlockEnd",
	  "WebkitPaddingBlockEnd",
	  "MSPaddingBlockEnd",
	  "OPaddingBlockEnd",
	  "paddingBlockStart",
	  "MozPaddingBlockStart",
	  "WebkitPaddingBlockStart",
	  "MSPaddingBlockStart",
	  "OPaddingBlockStart",
	  "paddingBottom",
	  "MozPaddingBottom",
	  "WebkitPaddingBottom",
	  "MSPaddingBottom",
	  "OPaddingBottom",
	  "paddingInlineEnd",
	  "MozPaddingInlineEnd",
	  "WebkitPaddingInlineEnd",
	  "MSPaddingInlineEnd",
	  "OPaddingInlineEnd",
	  "paddingInlineStart",
	  "MozPaddingInlineStart",
	  "WebkitPaddingInlineStart",
	  "MSPaddingInlineStart",
	  "OPaddingInlineStart",
	  "paddingLeft",
	  "MozPaddingLeft",
	  "WebkitPaddingLeft",
	  "MSPaddingLeft",
	  "OPaddingLeft",
	  "paddingRight",
	  "MozPaddingRight",
	  "WebkitPaddingRight",
	  "MSPaddingRight",
	  "OPaddingRight",
	  "paddingTop",
	  "MozPaddingTop",
	  "WebkitPaddingTop",
	  "MSPaddingTop",
	  "OPaddingTop",
	  "pageBreakAfter",
	  "MozPageBreakAfter",
	  "WebkitPageBreakAfter",
	  "MSPageBreakAfter",
	  "OPageBreakAfter",
	  "pageBreakBefore",
	  "MozPageBreakBefore",
	  "WebkitPageBreakBefore",
	  "MSPageBreakBefore",
	  "OPageBreakBefore",
	  "pageBreakInside",
	  "MozPageBreakInside",
	  "WebkitPageBreakInside",
	  "MSPageBreakInside",
	  "OPageBreakInside",
	  "pc",
	  "MozPc",
	  "WebkitPc",
	  "MSPc",
	  "OPc",
	  "perspective",
	  "MozPerspective",
	  "WebkitPerspective",
	  "MSPerspective",
	  "OPerspective",
	  "perspectiveOrigin",
	  "MozPerspectiveOrigin",
	  "WebkitPerspectiveOrigin",
	  "MSPerspectiveOrigin",
	  "OPerspectiveOrigin",
	  "pointerEvents",
	  "MozPointerEvents",
	  "WebkitPointerEvents",
	  "MSPointerEvents",
	  "OPointerEvents",
	  "position",
	  "MozPosition",
	  "WebkitPosition",
	  "MSPosition",
	  "OPosition",
	  "pt",
	  "MozPt",
	  "WebkitPt",
	  "MSPt",
	  "OPt",
	  "px",
	  "MozPx",
	  "WebkitPx",
	  "MSPx",
	  "OPx",
	  "q",
	  "MozQ",
	  "WebkitQ",
	  "MSQ",
	  "OQ",
	  "quotes",
	  "MozQuotes",
	  "WebkitQuotes",
	  "MSQuotes",
	  "OQuotes",
	  "rad",
	  "MozRad",
	  "WebkitRad",
	  "MSRad",
	  "ORad",
	  "rem",
	  "MozRem",
	  "WebkitRem",
	  "MSRem",
	  "ORem",
	  "resize",
	  "MozResize",
	  "WebkitResize",
	  "MSResize",
	  "OResize",
	  "revert",
	  "MozRevert",
	  "WebkitRevert",
	  "MSRevert",
	  "ORevert",
	  "right",
	  "MozRight",
	  "WebkitRight",
	  "MSRight",
	  "ORight",
	  "rubyAlign",
	  "MozRubyAlign",
	  "WebkitRubyAlign",
	  "MSRubyAlign",
	  "ORubyAlign",
	  "rubyMerge",
	  "MozRubyMerge",
	  "WebkitRubyMerge",
	  "MSRubyMerge",
	  "ORubyMerge",
	  "rubyPosition",
	  "MozRubyPosition",
	  "WebkitRubyPosition",
	  "MSRubyPosition",
	  "ORubyPosition",
	  "s",
	  "MozS",
	  "WebkitS",
	  "MSS",
	  "OS",
	  "scrollBehavior",
	  "MozScrollBehavior",
	  "WebkitScrollBehavior",
	  "MSScrollBehavior",
	  "OScrollBehavior",
	  "scrollSnapCoordinate",
	  "MozScrollSnapCoordinate",
	  "WebkitScrollSnapCoordinate",
	  "MSScrollSnapCoordinate",
	  "OScrollSnapCoordinate",
	  "scrollSnapDestination",
	  "MozScrollSnapDestination",
	  "WebkitScrollSnapDestination",
	  "MSScrollSnapDestination",
	  "OScrollSnapDestination",
	  "scrollSnapType",
	  "MozScrollSnapType",
	  "WebkitScrollSnapType",
	  "MSScrollSnapType",
	  "OScrollSnapType",
	  "shapeImageThreshold",
	  "MozShapeImageThreshold",
	  "WebkitShapeImageThreshold",
	  "MSShapeImageThreshold",
	  "OShapeImageThreshold",
	  "shapeMargin",
	  "MozShapeMargin",
	  "WebkitShapeMargin",
	  "MSShapeMargin",
	  "OShapeMargin",
	  "shapeOutside",
	  "MozShapeOutside",
	  "WebkitShapeOutside",
	  "MSShapeOutside",
	  "OShapeOutside",
	  "tabSize",
	  "MozTabSize",
	  "WebkitTabSize",
	  "MSTabSize",
	  "OTabSize",
	  "tableLayout",
	  "MozTableLayout",
	  "WebkitTableLayout",
	  "MSTableLayout",
	  "OTableLayout",
	  "textAlign",
	  "MozTextAlign",
	  "WebkitTextAlign",
	  "MSTextAlign",
	  "OTextAlign",
	  "textAlignLast",
	  "MozTextAlignLast",
	  "WebkitTextAlignLast",
	  "MSTextAlignLast",
	  "OTextAlignLast",
	  "textCombineUpright",
	  "MozTextCombineUpright",
	  "WebkitTextCombineUpright",
	  "MSTextCombineUpright",
	  "OTextCombineUpright",
	  "textDecoration",
	  "MozTextDecoration",
	  "WebkitTextDecoration",
	  "MSTextDecoration",
	  "OTextDecoration",
	  "textDecorationColor",
	  "MozTextDecorationColor",
	  "WebkitTextDecorationColor",
	  "MSTextDecorationColor",
	  "OTextDecorationColor",
	  "textDecorationLine",
	  "MozTextDecorationLine",
	  "WebkitTextDecorationLine",
	  "MSTextDecorationLine",
	  "OTextDecorationLine",
	  "textDecorationStyle",
	  "MozTextDecorationStyle",
	  "WebkitTextDecorationStyle",
	  "MSTextDecorationStyle",
	  "OTextDecorationStyle",
	  "textEmphasis",
	  "MozTextEmphasis",
	  "WebkitTextEmphasis",
	  "MSTextEmphasis",
	  "OTextEmphasis",
	  "textEmphasisColor",
	  "MozTextEmphasisColor",
	  "WebkitTextEmphasisColor",
	  "MSTextEmphasisColor",
	  "OTextEmphasisColor",
	  "textEmphasisPosition",
	  "MozTextEmphasisPosition",
	  "WebkitTextEmphasisPosition",
	  "MSTextEmphasisPosition",
	  "OTextEmphasisPosition",
	  "textEmphasisStyle",
	  "MozTextEmphasisStyle",
	  "WebkitTextEmphasisStyle",
	  "MSTextEmphasisStyle",
	  "OTextEmphasisStyle",
	  "textIndent",
	  "MozTextIndent",
	  "WebkitTextIndent",
	  "MSTextIndent",
	  "OTextIndent",
	  "textOrientation",
	  "MozTextOrientation",
	  "WebkitTextOrientation",
	  "MSTextOrientation",
	  "OTextOrientation",
	  "textOverflow",
	  "MozTextOverflow",
	  "WebkitTextOverflow",
	  "MSTextOverflow",
	  "OTextOverflow",
	  "textRendering",
	  "MozTextRendering",
	  "WebkitTextRendering",
	  "MSTextRendering",
	  "OTextRendering",
	  "textShadow",
	  "MozTextShadow",
	  "WebkitTextShadow",
	  "MSTextShadow",
	  "OTextShadow",
	  "textTransform",
	  "MozTextTransform",
	  "WebkitTextTransform",
	  "MSTextTransform",
	  "OTextTransform",
	  "textUnderlinePosition",
	  "MozTextUnderlinePosition",
	  "WebkitTextUnderlinePosition",
	  "MSTextUnderlinePosition",
	  "OTextUnderlinePosition",
	  "top",
	  "MozTop",
	  "WebkitTop",
	  "MSTop",
	  "OTop",
	  "touchAction",
	  "MozTouchAction",
	  "WebkitTouchAction",
	  "MSTouchAction",
	  "OTouchAction",
	  "transform",
	  "MozTransform",
	  "WebkitTransform",
	  "msTransform",
	  "OTransform",
	  "transformBox",
	  "MozTransformBox",
	  "WebkitTransformBox",
	  "MSTransformBox",
	  "OTransformBox",
	  "transformOrigin",
	  "MozTransformOrigin",
	  "WebkitTransformOrigin",
	  "MSTransformOrigin",
	  "OTransformOrigin",
	  "transformStyle",
	  "MozTransformStyle",
	  "WebkitTransformStyle",
	  "MSTransformStyle",
	  "OTransformStyle",
	  "transition",
	  "MozTransition",
	  "WebkitTransition",
	  "MSTransition",
	  "OTransition",
	  "transitionDelay",
	  "MozTransitionDelay",
	  "WebkitTransitionDelay",
	  "MSTransitionDelay",
	  "OTransitionDelay",
	  "transitionDuration",
	  "MozTransitionDuration",
	  "WebkitTransitionDuration",
	  "MSTransitionDuration",
	  "OTransitionDuration",
	  "transitionProperty",
	  "MozTransitionProperty",
	  "WebkitTransitionProperty",
	  "MSTransitionProperty",
	  "OTransitionProperty",
	  "transitionTimingFunction",
	  "MozTransitionTimingFunction",
	  "WebkitTransitionTimingFunction",
	  "MSTransitionTimingFunction",
	  "OTransitionTimingFunction",
	  "turn",
	  "MozTurn",
	  "WebkitTurn",
	  "MSTurn",
	  "OTurn",
	  "unicodeBidi",
	  "MozUnicodeBidi",
	  "WebkitUnicodeBidi",
	  "MSUnicodeBidi",
	  "OUnicodeBidi",
	  "unset",
	  "MozUnset",
	  "WebkitUnset",
	  "MSUnset",
	  "OUnset",
	  "verticalAlign",
	  "MozVerticalAlign",
	  "WebkitVerticalAlign",
	  "MSVerticalAlign",
	  "OVerticalAlign",
	  "vh",
	  "MozVh",
	  "WebkitVh",
	  "MSVh",
	  "OVh",
	  "visibility",
	  "MozVisibility",
	  "WebkitVisibility",
	  "MSVisibility",
	  "OVisibility",
	  "vmax",
	  "MozVmax",
	  "WebkitVmax",
	  "MSVmax",
	  "OVmax",
	  "vmin",
	  "MozVmin",
	  "WebkitVmin",
	  "MSVmin",
	  "OVmin",
	  "vw",
	  "MozVw",
	  "WebkitVw",
	  "MSVw",
	  "OVw",
	  "whiteSpace",
	  "MozWhiteSpace",
	  "WebkitWhiteSpace",
	  "MSWhiteSpace",
	  "OWhiteSpace",
	  "widows",
	  "MozWidows",
	  "WebkitWidows",
	  "MSWidows",
	  "OWidows",
	  "width",
	  "MozWidth",
	  "WebkitWidth",
	  "MSWidth",
	  "OWidth",
	  "willChange",
	  "MozWillChange",
	  "WebkitWillChange",
	  "MSWillChange",
	  "OWillChange",
	  "wordBreak",
	  "MozWordBreak",
	  "WebkitWordBreak",
	  "MSWordBreak",
	  "OWordBreak",
	  "wordSpacing",
	  "MozWordSpacing",
	  "WebkitWordSpacing",
	  "MSWordSpacing",
	  "OWordSpacing",
	  "wordWrap",
	  "MozWordWrap",
	  "WebkitWordWrap",
	  "MSWordWrap",
	  "OWordWrap",
	  "writingMode",
	  "MozWritingMode",
	  "WebkitWritingMode",
	  "MSWritingMode",
	  "OWritingMode",
	  "zIndex",
	  "MozZIndex",
	  "WebkitZIndex",
	  "MSZIndex",
	  "OZIndex",
	  "fontSize",
	  "MozFontSize",
	  "WebkitFontSize",
	  "MSFontSize",
	  "OFontSize",
	  "flex",
	  "MozFlex",
	  "WebkitFlex",
	  "MSFlex",
	  "OFlex",
	  "fr",
	  "MozFr",
	  "WebkitFr",
	  "MSFr",
	  "OFr"
	]


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _inlineStylePrefixer = __webpack_require__(6);
	
	var _inlineStylePrefixer2 = _interopRequireDefault(_inlineStylePrefixer);
	
	var _reactStyleProptype = __webpack_require__(45);
	
	var _reactStyleProptype2 = _interopRequireDefault(_reactStyleProptype);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.2 (KHTML, like Gecko) Safari/537.2';
	
	var Pane = function (_Component) {
	    _inherits(Pane, _Component);
	
	    function Pane() {
	        var _ref;
	
	        _classCallCheck(this, Pane);
	
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }
	
	        var _this = _possibleConstructorReturn(this, (_ref = Pane.__proto__ || Object.getPrototypeOf(Pane)).call.apply(_ref, [this].concat(args)));
	
	        _this.state = { size: _this.props.size };
	        return _this;
	    }
	
	    _createClass(Pane, [{
	        key: 'render',
	        value: function render() {
	            var split = this.props.split;
	            var classes = ['Pane', split, this.props.className];
	
	            var style = _extends({}, this.props.style || {}, {
	                flex: 1,
	                position: 'relative',
	                outline: 'none'
	            });
	
	            if (this.state.size !== undefined) {
	                if (split === 'vertical') {
	                    style.width = this.state.size;
	                } else {
	                    style.height = this.state.size;
	                    style.display = 'flex';
	                }
	                style.flex = 'none';
	            }
	
	            return _react2.default.createElement(
	                'div',
	                { className: classes.join(' '), style: this.props.prefixer.prefix(style) },
	                this.props.children
	            );
	        }
	    }]);
	
	    return Pane;
	}(_react.Component);
	
	Pane.propTypes = {
	    split: _react.PropTypes.oneOf(['vertical', 'horizontal']),
	    className: _react.PropTypes.string.isRequired,
	    children: _react.PropTypes.node.isRequired,
	    prefixer: _react.PropTypes.instanceOf(_inlineStylePrefixer2.default).isRequired,
	    style: _reactStyleProptype2.default,
	    size: _react.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number])
	};
	
	Pane.defaultProps = {
	    prefixer: new _inlineStylePrefixer2.default({ userAgent: USER_AGENT })
	};
	
	exports.default = Pane;
	module.exports = exports['default'];

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _inlineStylePrefixer = __webpack_require__(6);
	
	var _inlineStylePrefixer2 = _interopRequireDefault(_inlineStylePrefixer);
	
	var _reactStyleProptype = __webpack_require__(45);
	
	var _reactStyleProptype2 = _interopRequireDefault(_reactStyleProptype);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.2 (KHTML, like Gecko) Safari/537.2';
	
	var Resizer = function (_Component) {
	    _inherits(Resizer, _Component);
	
	    function Resizer() {
	        _classCallCheck(this, Resizer);
	
	        return _possibleConstructorReturn(this, (Resizer.__proto__ || Object.getPrototypeOf(Resizer)).apply(this, arguments));
	    }
	
	    _createClass(Resizer, [{
	        key: 'render',
	        value: function render() {
	            var _this2 = this;
	
	            var _props = this.props,
	                split = _props.split,
	                className = _props.className,
	                resizerClassName = _props.resizerClassName;
	
	            var classes = [resizerClassName, split, className];
	            return _react2.default.createElement('span', {
	                className: classes.join(' '),
	                style: this.props.prefixer.prefix(this.props.style) || {},
	                onMouseDown: function onMouseDown(event) {
	                    _this2.props.onMouseDown(event);
	                },
	                onTouchStart: function onTouchStart(event) {
	                    event.preventDefault();
	                    _this2.props.onTouchStart(event);
	                },
	                onTouchEnd: function onTouchEnd(event) {
	                    event.preventDefault();
	                    _this2.props.onTouchEnd(event);
	                }
	            });
	        }
	    }]);
	
	    return Resizer;
	}(_react.Component);
	
	Resizer.propTypes = {
	    onMouseDown: _react.PropTypes.func.isRequired,
	    onTouchStart: _react.PropTypes.func.isRequired,
	    onTouchEnd: _react.PropTypes.func.isRequired,
	    prefixer: _react.PropTypes.instanceOf(_inlineStylePrefixer2.default).isRequired,
	    split: _react.PropTypes.oneOf(['vertical', 'horizontal']),
	    className: _react.PropTypes.string.isRequired,
	    resizerClassName: _react.PropTypes.string.isRequired,
	    style: _reactStyleProptype2.default
	};
	
	Resizer.defaultProps = {
	    prefixer: new _inlineStylePrefixer2.default({ userAgent: USER_AGENT }),
	    resizerClassName: 'Resizer'
	};
	
	exports.default = Resizer;
	module.exports = exports['default'];

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	const lib_1 = __webpack_require__(50);
	class State {
	    static sendRequest(command, cb) {
	        var self = this;
	        var xhr = new XMLHttpRequest();
	        xhr.addEventListener("load", function () {
	            cb.call(this);
	        });
	        // xhr.open("POST", "//areweflashyet.com/tmp/wasm/service.php", true);
	        xhr.open("POST", "//wasmexplorer-service.herokuapp.com/service.php", true);
	        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	        xhr.send(command);
	    }
	    static getAnnotations(response) {
	        // Parse and annotate errors if compilation fails.
	        var annotations = [];
	        if (response.indexOf("(module") !== 0) {
	            var re = /^.*?:(\d+?):(\d+?):(.*)$/gm;
	            var m;
	            while ((m = re.exec(response)) !== null) {
	                if (m.index === re.lastIndex) {
	                    re.lastIndex++;
	                }
	                var line = parseInt(m[1]) - 1;
	                var column = parseInt(m[2]) - 1;
	                var message = m[3];
	                annotations.push({
	                    row: line,
	                    column: column,
	                    text: message,
	                    type: message.indexOf("error") >= 0 ? "error" : "warning" // also warning and information
	                });
	            }
	        }
	        return annotations;
	    }
	    static wastToWasm(src) {
	        let wast = State.findEditor("wast");
	        if (src)
	            wast.editor.setValue(src);
	        else
	            src = wast.editor.getValue();
	        src = encodeURIComponent(src).replace('%20', '+');
	        let action = "wast2wasm";
	        // todo: Locally via binaryan.JS
	        State.sendRequest("input=" + src + "&action=" + action, function () {
	            var buffer = atob(this.responseText.split('\n', 2)[1]);
	            var data = new Uint8Array(buffer.length);
	            for (var i = 0; i < buffer.length; i++) {
	                data[i] = buffer.charCodeAt(i);
	            }
	            let wasm = State.findEditor("wasm");
	            wasm.editor.setValue("buffer = new Uint8Array([" + String(data) + "]);");
	            State.buffer = data;
	            State.runHarness();
	        });
	    }
	    static cToWasm(src, options, cb) {
	        src = encodeURIComponent(src).replace('%20', '+');
	        let action = "c2wast";
	        options = encodeURIComponent(options + " --clean");
	        State.sendRequest("input=" + src + "&action=" + action + "&options=" + options, function () {
	            let annotations = State.getAnnotations(this.responseText);
	            if (annotations.length)
	                cb(this.responseText, annotations);
	            State.wastToWasm(this.responseText);
	        });
	    }
	    static findEditor(name) {
	        for (let i = 0; i < State.editors.length; i++) {
	            if (State.editors[i].props.name == name) {
	                return State.editors[i];
	            }
	        }
	        return null;
	    }
	    static appendOutput(s) {
	        let output = State.findEditor("output");
	        output.editor.insert(s + "\n");
	        output.editor.gotoLine(Infinity);
	    }
	    static run() {
	        let main = State.findEditor("main.c");
	        let options = State.app.state.compilerOptions;
	        State.cToWasm(main.editor.getValue(), options, State.annotate);
	    }
	    static annotate(result, annotations) {
	        let main = State.findEditor("main.c");
	        if (annotations.length) {
	            main.editor.getSession().clearAnnotations();
	            main.editor.getSession().setAnnotations(annotations);
	            State.appendOutput(String(result));
	            return;
	        }
	    }
	    static assemble() {
	        State.appendOutput("assemble wast2wasm");
	        State.wastToWasm(null);
	    }
	    static runHarness() {
	        if (!State.buffer) {
	            State.appendOutput("Compile a WebAssembly module first.");
	            return;
	        }
	        let harness = State.findEditor("harness.js");
	        let func = new Function("buffer", "lib", "log", harness.editor.getValue());
	        func(State.buffer, lib_1.lib, function (x) {
	            State.appendOutput(String(x));
	            console.log.apply(console, arguments);
	        });
	    }
	    static clearOutput() {
	        let output = State.findEditor("output");
	        output.editor.setValue("");
	    }
	    static init() {
	        let uri = window.location.search.substring(1);
	        if (uri) {
	            let i = uri.indexOf("/");
	            if (i > 0) {
	                uri = uri.substring(0, i);
	            }
	            State.loadForever(uri);
	        }
	        else {
	            State.setState({
	                editors: {
	                    "main.c": "int main() { \n  return 42;\n}",
	                    "harness.js": "let m = new WebAssembly.Instance(new WebAssembly.Module(buffer));\n\nlog(m.exports.main());",
	                    "wast": ";; generated on compilation",
	                    "out.wast": ";; generated on compile"
	                }
	            });
	        }
	    }
	    static resize() {
	        State.editors.forEach(e => {
	            e.editor.resize();
	        });
	    }
	    static setState(state) {
	        for (let k in state.editors) {
	            State.findEditor(k).editor.setValue(state.editors[k], -1);
	        }
	    }
	    static getState() {
	        let o = {
	            editors: {}
	        };
	        State.editors.forEach(e => {
	            if (e.props.save) {
	                o.editors[e.props.name] = e.editor.getValue();
	            }
	        });
	        return o;
	    }
	    static saveForever() {
	        var xhr = new XMLHttpRequest();
	        xhr.addEventListener("load", function () {
	            let uri = JSON.parse(this.response).uri;
	            uri = uri.substring(uri.lastIndexOf("/") + 1);
	            State.fiddleURI = uri;
	            State.app.forceUpdate();
	            history.replaceState({}, State.fiddleURI, '?' + State.fiddleURI);
	        });
	        xhr.open("POST", "//api.myjson.com/bins", true);
	        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
	        xhr.send(JSON.stringify(State.getState()));
	    }
	    static loadForever(fiddleURI) {
	        State.fiddleURI = fiddleURI;
	        var xhr = new XMLHttpRequest();
	        xhr.addEventListener("load", function () {
	            let state = JSON.parse(this.response);
	            State.setState(state);
	            history.replaceState({}, fiddleURI, '?' + State.fiddleURI);
	            State.app.forceUpdate();
	        });
	        let url = "https://api.myjson.com/bins/" + fiddleURI;
	        xhr.open("GET", url, true);
	        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
	        xhr.send();
	    }
	    static nextPane(delta) {
	        State.currentEditor = (State.currentEditor + delta) % State.editors.length;
	        State.editors[State.currentEditor].editor.focus();
	    }
	    static addEditor(e) {
	        State.editors.push(e);
	    }
	    static removeEditor(e) {
	    }
	}
	/**
	 * Currently compiled module.
	 */
	State.buffer = null;
	State.fiddleURI = "";
	State.currentEditor = 0;
	State.editors = [];
	exports.State = State;


/***/ },
/* 50 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	function UTF8ArrayToString(u8Array, idx) {
	    var endPtr = idx;
	    while (u8Array[endPtr])
	        ++endPtr;
	    if (endPtr - idx > 16 && u8Array.subarray && UTF8Decoder) {
	        return UTF8Decoder.decode(u8Array.subarray(idx, endPtr));
	    }
	    else {
	        var u0, u1, u2, u3, u4, u5;
	        var str = "";
	        while (1) {
	            u0 = u8Array[idx++];
	            if (!u0)
	                return str;
	            if (!(u0 & 128)) {
	                str += String.fromCharCode(u0);
	                continue;
	            }
	            u1 = u8Array[idx++] & 63;
	            if ((u0 & 224) == 192) {
	                str += String.fromCharCode((u0 & 31) << 6 | u1);
	                continue;
	            }
	            u2 = u8Array[idx++] & 63;
	            if ((u0 & 240) == 224) {
	                u0 = (u0 & 15) << 12 | u1 << 6 | u2;
	            }
	            else {
	                u3 = u8Array[idx++] & 63;
	                if ((u0 & 248) == 240) {
	                    u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | u3;
	                }
	                else {
	                    u4 = u8Array[idx++] & 63;
	                    if ((u0 & 252) == 248) {
	                        u0 = (u0 & 3) << 24 | u1 << 18 | u2 << 12 | u3 << 6 | u4;
	                    }
	                    else {
	                        u5 = u8Array[idx++] & 63;
	                        u0 = (u0 & 1) << 30 | u1 << 24 | u2 << 18 | u3 << 12 | u4 << 6 | u5;
	                    }
	                }
	            }
	            if (u0 < 65536) {
	                str += String.fromCharCode(u0);
	            }
	            else {
	                var ch = u0 - 65536;
	                str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
	            }
	        }
	    }
	}
	exports.lib = {
	    UTF8ArrayToString: UTF8ArrayToString
	};


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	const React = __webpack_require__(1);
	const State_1 = __webpack_require__(49);
	class EditorComponent extends React.Component {
	    componentWillUnmount() {
	        State_1.State.removeEditor(this);
	    }
	    componentDidMount() {
	        let editor = this.editor = ace.edit(this.container);
	        var theme = true ? "ace/theme/monokai" : "ace/theme/github";
	        // editor.setValue(this.props.source, -1);
	        editor.setReadOnly(this.props.readOnly);
	        editor.setTheme(theme);
	        editor.setFontSize(11);
	        editor.getSession().setUseSoftTabs(true);
	        editor.getSession().setTabSize(2);
	        editor.setShowPrintMargin(false);
	        editor.setOptions({
	            wrap: true,
	            enableBasicAutocompletion: true,
	            enableSnippets: true,
	            enableLiveAutocompletion: true
	        });
	        editor.$blockScrolling = Infinity;
	        editor.renderer.setScrollMargin(10, 10);
	        editor.getSession().setMode(this.props.mode);
	        let action = this.props.action;
	        let self = this;
	        editor.commands.addCommands([{
	                bindKey: { win: "Ctrl-S", mac: "Command-S" }, exec: function () {
	                    State_1.State.saveForever();
	                }
	            },
	            {
	                bindKey: { win: "Ctrl-Shift-K", mac: "Command-Shift-K" }, exec: function () {
	                    State_1.State.run();
	                }
	            },
	            {
	                bindKey: { win: "Ctrl-Enter", mac: "Command-Enter" }, exec: function () {
	                    State_1.State.assemble();
	                }
	            },
	            {
	                bindKey: { win: "Ctrl-Shift-.", mac: "Command-Shift-." }, exec: function () {
	                    State_1.State.nextPane(1);
	                }
	            },
	            {
	                bindKey: { win: "Ctrl-Shift-,", mac: "Command-Shift-," }, exec: function () {
	                    State_1.State.nextPane(-1);
	                }
	            }
	        ]);
	        State_1.State.addEditor(this);
	    }
	    onChange() {
	    }
	    render() {
	        return React.createElement("div", { ref: (self) => this.container = self, className: "editorBody" });
	    }
	}
	EditorComponent.defaultProps = {
	    // source: "",
	    mode: "",
	    action: "",
	    save: true,
	    readOnly: false
	};
	exports.EditorComponent = EditorComponent;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map