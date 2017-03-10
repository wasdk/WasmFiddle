import * as React from "react";
import * as ReactSplitPane from "react-split-pane";
import { State } from "./State";
import { EditorComponent } from "./components/Editor";
import { CompilerOptionsComponent } from "./components/CompilerOptions";
import { lib } from "./lib"


declare var Mousetrap: any;
declare var Promise: any;

export class AppComponent extends React.Component<void, {
  compilerOptions: string
}> {

  constructor() {
    super();
    this.installKeyboardShortcuts();
    State.app = this;
    this.state = {
      compilerOptions: "-O3 -std=C++11"
    } as any;
  }

  canvas: HTMLCanvasElement;

  installKeyboardShortcuts() {
    Mousetrap.bind(['ctrl+shift+enter'], (e: any) => {
      this.run();
      e.preventDefault();
    });
    Mousetrap.bind(['ctrl+enter'], (e: any) => {
      this.runHarness();
      e.preventDefault();
    });
    Mousetrap.bind(['command+s'], (e: any) => {
      this.saveFiddleStateToURI();
      e.preventDefault();
    });
  }

  componentDidMount() {
    this.init();
  }

  compilerOptionsChanged(options: string) {
    this.setState({ compilerOptions: options });
  }

  onResize() {
    // State.resize();
    this.mainEditor.editor.resize();
  }

  download() {
    // TODO: mbx
    // this.downloadLink.href = "data:;base64,"; // + wasm.split('\n')[1];
    // if (this.downloadLink.href as any != document.location) {
    //   this.downloadLink.click();
    // }
  }

  loadFiddledStateFromURI(fiddleURI: string) {
    State.fiddleURI = fiddleURI;
    var xhr = new XMLHttpRequest();
    let self = this;
    xhr.addEventListener("load", function () {
      self.loadFiddledState(JSON.parse(this.response));
      history.replaceState({}, fiddleURI, '?' + State.fiddleURI);
    });
    let url = "https://api.myjson.com/bins/" + fiddleURI;
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhr.send();
  }

  saveFiddleStateToURI() {
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
    xhr.send(JSON.stringify(this.saveFiddleState()));
  }

  init() {
    let uri: string = window.location.search.substring(1);
    if (uri) {
      let i = uri.indexOf("/");
      if (i > 0) {
        uri = uri.substring(0, i);
      }
      this.loadFiddledStateFromURI(uri);
      this.forceUpdate();
    } else {
      this.loadFiddledState({
        editors: {
          "main": "int main() { \n  return 42;\n}",
          "harness":
          "var wasmModule = new WebAssembly.Module(wasmCode);\n" +
          "var wasmInstance = new WebAssembly.Instance(wasmModule);\n\n" +
          "log(wasmInstance.exports.main());"
        }
      });
    }
  }

  saveFiddleState() {
    return {
      editors: {
        main: this.mainEditor.editor.getValue(),
        harness: this.harnessEditor.editor.getValue()
      }
    }
  }
  loadFiddledState(fiddleState: any) {
    // For backwards compatibility.
    if (fiddleState.editors["main.c"]) {
      fiddleState.editors.main = fiddleState.editors["main.c"];
    }
    if (fiddleState.editors["harness.js"]) {
      fiddleState.editors.harness = fiddleState.editors["harness.js"];
    }
    this.mainEditor.editor.setValue(fiddleState.editors.main, -1);
    this.harnessEditor.editor.setValue(fiddleState.editors.harness, -1);
  }

  mainEditor: EditorComponent = null;
  wastEditor: EditorComponent = null;
  wasmEditor: EditorComponent = null;
  outputEditor: EditorComponent = null;
  harnessEditor: EditorComponent = null;

  buffer: Uint8Array = null;
  run() {
    let main = this.mainEditor;
    let options = this.state.compilerOptions;
    this.compileToWasm(main.editor.getValue(), options, (result: Uint8Array | string, annotations: any[]) => {
      main.editor.getSession().clearAnnotations();
      if (annotations.length) {
        main.editor.getSession().setAnnotations(annotations);
        this.appendOutput(String(result));
        return;
      }
      this.buffer = result as Uint8Array;
      this.runHarness();
    });
  }
  runHarness() {
    if (!this.buffer) {
      this.appendOutput("Compile a WebAssembly module first.");
      return;
    }
    // |buffer| is needed for backward compatibility
    let self = this;
    let func = new Function("wasmCode", "buffer", "lib", "log", "canvas", this.harnessEditor.editor.getValue());
    try {
    func(this.buffer, this.buffer, lib, function (x: any) {
      self.appendOutput(String(x));
    }, State.app.canvas);
    } catch (x) {
      self.appendOutput(x);
    }
  }

  compileToWasm(src: string, options: string, cb: (buffer: Uint8Array, annotations?: any[]) => void) {
    let self = this;
    src = encodeURIComponent(src).replace('%20', '+');
    let action = "c2wast";
    options = encodeURIComponent(options);
    State.sendRequest("input=" + src + "&action=" + action + "&options=" + options, function () {
      if (!this.responseText) {
        this.appendOutput("Something went wrong while compiling " + action + ".");
        return;
      }
      let annotations = State.getAnnotations(this.responseText);
      if (annotations.length) {
        cb(this.responseText, annotations);
        return;
      }
      self.wastEditor.editor.setValue(this.responseText, -1);
      src = encodeURIComponent(this.responseText).replace('%20', '+');
      State.sendRequest("input=" + src + "&action=" + "wast2wasm" + "&options=" + options, function () {
        var buffer = atob(this.responseText.split('\n', 2)[1]);
        var data = new Uint8Array(buffer.length);
        for (var i = 0; i < buffer.length; i++) {
          data[i] = buffer.charCodeAt(i);
        }
        self.wasmEditor.editor.setValue("var wasmCode = new Uint8Array([" + String(data) + "]);", -1);
        cb(data, []);
      });
    });
  }

  appendOutput(s: string) {
    this.outputEditor.editor.insert(s + "\n");
    this.outputEditor.editor.gotoLine(Infinity);
  }
  share() {
    this.saveFiddleStateToURI();
  }
  clear() {
    this.outputEditor.editor.setValue("");
  }
  downloadLink: HTMLAnchorElement = null;
  render(): any {
    return <div className="gAppContainer">
      <div className="gHeader">
        <div>
          <img src="img/web-assembly-icon-white-64px.png" className="waIcon" />
        </div>
        <div className="gShareURI">
          {window.location.origin + window.location.pathname + '?' + State.fiddleURI}
        </div>
        <div className="gShareButton">
          <i title="Share" onClick={this.share.bind(this)} className="fa fa-cloud-upload fa-2x" aria-hidden="true"></i>
        </div>
      </div>
      <div>
        <div className="gV2">
          <div>
            <div className="editorHeader"><span className="editorHeaderTitle">C/C++</span>
              <div className="editorHeaderButtons">
                <a title="Compile & Run: CTRL + Shift + Return" onClick={this.run.bind(this)}>Compile & Run <i  className="fa fa-cog fa-lg" aria-hidden="true"></i></a>
              </div>
            </div>
            <EditorComponent ref={(self: any) => this.mainEditor = self} name="main" mode="ace/mode/c_cpp" showGutter={true} showLineNumbers={true} />
          </div>
          <div>
            <div className="editorHeader"><span className="editorHeaderTitle">JS</span>
              <div className="editorHeaderButtons">
                {/*<a title="Help" onClick={this.runHarness.bind(this)}>Help <i className="fa fa-book fa-lg" aria-hidden="true"></i></a>{' '}*/}
                <a title="Run: CTRL + Return" onClick={this.runHarness.bind(this)}>Run <i className="fa fa-play-circle fa-lg" aria-hidden="true"></i></a>
              </div>
            </div>
            <EditorComponent ref={(self: any) => this.harnessEditor = self} name="harness" mode="ace/mode/javascript" showGutter={true} showLineNumbers={true} />
          </div>
        </div>
      </div>
      <div>
        <div className="gV3">
          <div>
            <div className="editorHeader"><span className="editorHeaderTitle">out.wast</span>
              <div className="editorHeaderButtons">
              </div>
            </div>
            <EditorComponent ref={(self: any) => this.wastEditor = self} name="wast" save={false} readOnly={true} fontSize={8}/>
          </div>
          <div>
            <div className="editorHeader"><span className="editorHeaderTitle">out.wasm</span>
              <div className="editorHeaderButtons">
                <a title="Download" onClick={this.download.bind(this)}>Download <i className="fa fa-download fa-lg" aria-hidden="true"></i></a>
              </div>
            </div>
            <EditorComponent ref={(self: any) => this.wasmEditor = self} name="wasm" save={false} readOnly={true} fontSize={8}/>
          </div>
          <div>
            <div className="editorHeader"><span className="editorHeaderTitle">out</span>
              <div className="editorHeaderButtons">
                <a title="Clear Output" onClick={this.clear.bind(this)}>Clear <i className="fa fa-close fa-lg" aria-hidden="true"></i></a>
              </div>
            </div>
            <EditorComponent ref={(self: any) => this.outputEditor = self} name="output" save={false} readOnly={true} />
          </div>
        </div>
      </div>
    </div>
  }
}