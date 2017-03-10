import * as React from "react";
import * as ReactSplitPane from "react-split-pane";
import { State } from "./State";
import { EditorComponent } from "./components/Editor";
import { CompilerOptionsComponent } from "./components/CompilerOptions";
import { lib } from "./lib"


declare var Mousetrap: any;
declare var Promise: any;

export class AppComponent extends React.Component<void, {
  compilerOptions: string,
  isCompiling: boolean;
  isC: boolean;
  view: string;
  showCanvas: boolean;
}> {

  constructor() {
    super();
    this.installKeyboardShortcuts();
    State.app = this;
    this.state = {
      compilerOptions: "-O3 -std=C99",
      isCompiling: false,
      isC: true,
      view: "wast",
      showCanvas: false
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
    let isC = options.indexOf("C++") < 0;
    this.setState({ compilerOptions: options, isC } as any);
  }

  onResize() {
    // State.resize();
    this.mainEditor.editor.resize();
  }

  download(what: string) {
    var url = "";
    var name = "";
    if (what == "wasm") {
      url = URL.createObjectURL(new Blob([this.wasmCode], { type: 'application/wasm' }));
      name = "program.wasm";
    } else if (what == "wast") {
      url = URL.createObjectURL(new Blob([this.viewEditor.editor.getValue()], { type: 'text/wast' }));
      name = "program.wast";
    } else {
      return;
    }
    State.sendAppEvent("download", what);
    this.downloadLink.href = url;
    this.downloadLink.download = name;
    if (this.downloadLink.href as any != document.location) {
      this.downloadLink.click();
    }
  }

  assemble() {

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
      },
      compilerOptions: this.state.compilerOptions
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

    if (fiddleState.compilerOptions) {
      let isC = fiddleState.compilerOptions.indexOf("C++") < 0;
      this.setState({ compilerOptions: fiddleState.compilerOptions, isC } as any);
    }
  }

  mainEditor: EditorComponent = null;
  viewEditor: EditorComponent = null;
  wasmEditor: EditorComponent = null;
  outputEditor: EditorComponent = null;
  harnessEditor: EditorComponent = null;

  wasmCode: Uint8Array = null;

  wast: string = "";
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
      this.wasmCode = result as Uint8Array;
      this.runHarness();
      this.forceUpdate();
    });
  }
  runHarness() {
    State.sendAppEvent("run", "Harness");
    if (!this.wasmCode) {
      this.appendOutput("Compile a WebAssembly module first.");
      return;
    }
    // |buffer| is needed for backward compatibility
    let self = this;
    let func = new Function("wasmCode", "buffer", "lib", "log", "canvas", this.harnessEditor.editor.getValue());
    try {
      lib.log = function (x: any) {
        self.appendOutput(String(x));
      };
      lib.showCanvas = function (x: boolean = true) {
        self.setState({showCanvas: x} as any);
      };
      func(this.wasmCode, this.wasmCode, lib, lib.log, State.app.canvas);
    } catch (x) {
      self.appendOutput(x);
      State.sendAppEvent("error", "Run Harness");
    }
  }

  compileToWasm(src: string, options: string, cb: (buffer: Uint8Array, annotations?: any[]) => void) {
    State.sendAppEvent("compile", "To Wasm");
    let self = this;
    src = encodeURIComponent(src).replace('%20', '+');
    let action = this.state.isC ? "c2wast" : "cpp2wast";
    options = encodeURIComponent(options);
    self.setState({ isCompiling: true } as any);
    State.sendRequest("input=" + src + "&action=" + action + "&options=" + options, function () {
      self.setState({ isCompiling: false } as any);
      if (!this.responseText) {
        this.appendOutput("Something went wrong while compiling " + action + ".");
        State.sendAppEvent("error", "Compile to Wasm");
        return;
      }
      let annotations = State.getAnnotations(this.responseText);
      if (annotations.length) {
        cb(this.responseText, annotations);
        State.sendAppEvent("error", "Compile to Wasm (Error or Warnings)");
        return;
      }
      self.wast = this.responseText;
      src = encodeURIComponent(this.responseText).replace('%20', '+');
      self.setState({ isCompiling: true } as any);
      State.sendRequest("input=" + src + "&action=" + "wast2wasm" + "&options=" + options, function () {
        self.setState({ isCompiling: false } as any);
        var buffer = atob(this.responseText.split('\n', 2)[1]);
        var data = new Uint8Array(buffer.length);
        for (var i = 0; i < buffer.length; i++) {
          data[i] = buffer.charCodeAt(i);
        }
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
    State.sendAppEvent("save", "Fiddle state to URI");
  }
  toggleCanvas() {
    this.setState({showCanvas: !this.state.showCanvas} as any);
  }
  clear() {
    this.outputEditor.editor.setValue("");
  }
  downloadLink: HTMLAnchorElement = null;
  onViewChanged(e: any) {
    this.setState({ view: e.target.value } as any);
  }
  render(): any {
    if (this.viewEditor) {
      if (this.state.view === "wast") {
        this.viewEditor.editor.setValue(this.wast, -1);
      } else if (this.state.view === "wasm") {
        this.viewEditor.editor.setValue("var wasmCode = new Uint8Array([" + String(this.wasmCode) + "]);", -1);
      }
    }
    return <div className="gAppContainer">
      <a style={{ display: "none" }} ref={(self: any) => this.downloadLink = self} />
      <div className="gHeader">
        <div>
          <div className="canvasOverlay" style={{display: this.state.showCanvas ? "" : "none"}}>
            <div className="editorHeader">
              <div className="editorHeaderButtons">
                <a title="Toggle Canvas" onClick={this.toggleCanvas.bind(this)}>{this.state.showCanvas ? "Hide" : "Show"} Canvas <i className="fa fa-picture-o fa-lg" aria-hidden="true"></i></a>
              </div>
            </div>
            <canvas className="outputCanvas" ref={(self: any) => this.canvas = self} width={1024} height={1024} />
          </div>
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
            <div className="editorHeader"><span className="editorHeaderTitle">{this.state.isC ? "C" : "C++"}</span>
              <div className="editorHeaderButtons">
                <CompilerOptionsComponent options={this.state.compilerOptions} onChange={this.compilerOptionsChanged.bind(this)} />{' '}
                <a title="Compile & Run: CTRL + Shift + Return" onClick={this.run.bind(this)}>Compile & Run <i className={"fa fa-cog " + (this.state.isCompiling ? "fa-spin" : "") + " fa-lg"} aria-hidden="true"></i></a>
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
        <div className="gV2">
          <div>
            <div className="editorHeader">
              <select title="Optimization Level" value={this.state.view} onChange={this.onViewChanged.bind(this)}>
                <option value="wast">Text Format</option>
                <option value="wasm">Code Buffer</option>
              </select>
              <div className="editorHeaderButtons">
                {/*<a title="Assemble" onClick={this.assemble.bind(this)}>Assemble <i className="fa fa-download fa-lg" aria-hidden="true"></i></a>*/}
                Download <a title="Download WebAssembly Text" onClick={this.download.bind(this, "wast")}>Wast <i className="fa fa-download fa-lg" aria-hidden="true"></i></a>{' '}
                <a title="Download WebAssembly Binary" onClick={this.download.bind(this, "wasm")}>Wasm <i className="fa fa-download fa-lg" aria-hidden="true"></i></a>
              </div>
            </div>
            <EditorComponent ref={(self: any) => this.viewEditor = self} name="view" save={false} readOnly={true} fontSize={10} />
          </div>
          <div>
            <div className="editorHeader"><span className="editorHeaderTitle">Output</span>
              <div className="editorHeaderButtons">
                <a title="Toggle Canvas" onClick={this.toggleCanvas.bind(this)}>{this.state.showCanvas ? "Hide" : "Show"} Canvas <i className="fa fa-picture-o fa-lg" aria-hidden="true"></i></a>{' '}
                <a title="Clear Output" onClick={this.clear.bind(this)}>Clear Output <i className="fa fa-close fa-lg" aria-hidden="true"></i></a>
              </div>
            </div>
            <EditorComponent ref={(self: any) => this.outputEditor = self} name="output" save={false} readOnly={true} />
          </div>
        </div>
      </div>
    </div>
  }
}