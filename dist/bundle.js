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
	const ReactSplitPane = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-split-pane\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	const State_1 = __webpack_require__(4);
	const Editor_1 = __webpack_require__(6);
	class AppComponent extends React.Component {
	    constructor() {
	        super();
	        this.installKeyboardShortcuts();
	        this.state = {
	            compilerOptions: "-O3"
	        };
	        State_1.State.app = this;
	    }
	    installKeyboardShortcuts() {
	        Mousetrap.bind(['command+shift+k', 'command+enter', 'control+enter'], (e) => {
	            State_1.State.run();
	            e.preventDefault();
	        });
	        Mousetrap.bind(['command+enter'], (e) => {
	            State_1.State.run();
	            e.preventDefault();
	        });
	        Mousetrap.bind(['ctrl+enter'], (e) => {
	            State_1.State.run();
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
	                        React.createElement(ReactSplitPane, { split: "horizontal", defaultSize: "50%", onChange: this.onResize.bind(this) },
	                            React.createElement(ReactSplitPane, { split: "horizontal", defaultSize: "50%", onChange: this.onResize.bind(this) },
	                                React.createElement("div", { className: "editorContainer" },
	                                    React.createElement("div", { className: "editorHeader" },
	                                        React.createElement("span", { className: "editorHeaderTitle" }, "out.wast"),
	                                        React.createElement("div", { className: "editorHeaderButtons" })),
	                                    React.createElement(Editor_1.EditorComponent, { name: "wast", save: false, readOnly: true })),
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

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	const lib_1 = __webpack_require__(5);
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
	    static compileToWasm(src, options, cb) {
	        src = encodeURIComponent(src).replace('%20', '+');
	        let action = "c2wast";
	        options = encodeURIComponent(options + " --clean");
	        State.sendRequest("input=" + src + "&action=" + action + "&options=" + options, function () {
	            let wast = State.findEditor("wast");
	            let annotations = State.getAnnotations(this.responseText);
	            if (annotations.length) {
	                cb(this.responseText, annotations);
	                return;
	            }
	            wast.editor.setValue(this.responseText, -1);
	            src = encodeURIComponent(this.responseText).replace('%20', '+');
	            let action = "wast2wasm";
	            State.sendRequest("input=" + src + "&action=" + action + "&options=" + options, function () {
	                var buffer = atob(this.responseText.split('\n', 2)[1]);
	                var data = new Uint8Array(buffer.length);
	                for (var i = 0; i < buffer.length; i++) {
	                    data[i] = buffer.charCodeAt(i);
	                }
	                let wasm = State.findEditor("wasm");
	                wasm.editor.setValue("buffer = new Uint8Array([" + String(data) + "]);");
	                cb(data, []);
	            });
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
	        State.compileToWasm(main.editor.getValue(), options, (result, annotations) => {
	            if (annotations.length) {
	                main.editor.getSession().clearAnnotations();
	                main.editor.getSession().setAnnotations(annotations);
	                State.appendOutput(String(result));
	                return;
	            }
	            State.buffer = result;
	            State.runHarness();
	        });
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
	                    "harness.js": "let m = new WebAssembly.Instance(new WebAssembly.Module(buffer));\n\nlog(m.exports.main());"
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
/* 5 */
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	const React = __webpack_require__(1);
	const State_1 = __webpack_require__(4);
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