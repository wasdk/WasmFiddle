declare var WebAssembly: any;

import { EditorComponent } from "./components/Editor";
import { AppComponent } from "./App";
import { lib } from "./lib"

export class State {
  static sendRequest(command: string, cb: (any)) {
    var self = this;
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function () {
      cb.call(this);
    });
    // xhr.open("POST", "//areweflashyet.com/tmp/wasm/service.php", true);
    xhr.open("POST", "//wasmexplorer-service.herokuapp.com/service.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xhr.send(command);
  }

  static getAnnotations(response: string) {
    // Parse and annotate errors if compilation fails.
    var annotations: any[] = [];
    if (response.indexOf("(module") !== 0) {
      var re = /^.*?:(\d+?):(\d+?):(.*)$/gm;
      var m: any;
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

  static compileToWasm(src: string, options: string, cb: (buffer: Uint8Array, annotations?: any[]) => void) {
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

  static findEditor(name: string): EditorComponent {
    for (let i = 0; i < State.editors.length; i++) {
      if (State.editors[i].props.name == name) {
        return State.editors[i];
      }
    }
    return null;
  }

  static app: AppComponent;

  static appendOutput(s: string) {
    let output = State.findEditor("output");
    output.editor.insert(s + "\n");
    output.editor.gotoLine(Infinity);
  }

  /**
   * Currently compiled module.
   */
  static buffer: Uint8Array = null;
  static run() {
    let main = State.findEditor("main.c");
    let options = State.app.state.compilerOptions;
    State.compileToWasm(main.editor.getValue(), options, (result: Uint8Array | string, annotations: any[]) => {
      if (annotations.length) {
        main.editor.getSession().clearAnnotations();
        main.editor.getSession().setAnnotations(annotations);
        State.appendOutput(String(result));
        return;
      }
      State.buffer = result as Uint8Array;
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
    func(State.buffer, lib, function (x: any) {
      State.appendOutput(String(x));
      console.log.apply(console, arguments);
    });
  }

  static clearOutput() {
    let output = State.findEditor("output");
    output.editor.setValue("");
  }

  static init() {
    let uri: string = window.location.search.substring(1);
    if (uri) {
      let i = uri.indexOf("/");
      if (i > 0) {
        uri = uri.substring(0, i);
      }
      State.loadForever(uri);
    } else {
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

  static setState(state: any) {
    for (let k in state.editors) {
      State.findEditor(k).editor.setValue(state.editors[k], -1);
    }
  }

  static getState() {
    let o: any = {
      editors: {}
    };
    State.editors.forEach(e => {
      if (e.props.save) {
        o.editors[e.props.name] = e.editor.getValue();
      }
    });
    return o;
  }

  static fiddleURI: string = "";
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

  static loadForever(fiddleURI: string) {
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

  static currentEditor = 0;

  static nextPane(delta: number) {
    State.currentEditor = (State.currentEditor + delta) % State.editors.length;
    State.editors[State.currentEditor].editor.focus();
  }

  static editors: EditorComponent[] = [];

  static addEditor(e: EditorComponent) {
    State.editors.push(e);
  }

  static removeEditor(e: EditorComponent) {

  }
}