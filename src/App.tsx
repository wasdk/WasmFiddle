import * as React from "react";
import * as ReactSplitPane from "react-split-pane";
import { State } from "./State";
import { EditorComponent } from "./components/Editor";
import { CompilerOptionsComponent } from "./components/CompilerOptions";
import { lib } from "./lib"
import { IFrameSandbox } from "./iframesandbox";

declare var require: any;
declare var WebAssembly: any;
let { demangle } = require("demangle");
declare var capstone: any;
declare var Mousetrap: any;
declare var Promise: any;
function lazyLoad(s: string, cb: () => void) {
  var self = this;
  var d = window.document;
  var b = d.body;
  var e = d.createElement("script");
  e.async = true;
  e.src = s;
  b.appendChild(e);
  e.onload = function () {
    cb.call(this);
  }
}

function toAddress(n: number) {
  var s = n.toString(16);
  while (s.length < 6) {
    s = "0" + s;
  }
  return "0x" + s;
}

function padRight(s: string, n: number, c: string) {
  s = String(s);
  while (s.length < n) {
    s = s + c;
  }
  return s;
}

function padLeft(s: string, n: number, c: string) {
  s = String(s);
  while (s.length < n) {
    s = c + s;
  }
  return s;
}

var x86JumpInstructions = [
  "jmp", "ja", "jae", "jb", "jbe", "jc", "je", "jg", "jge", "jl", "jle", "jna", "jnae",
  "jnb", "jnbe", "jnc", "jne", "jng", "jnge", "jnl", "jnle", "jno", "jnp", "jns", "jnz",
  "jo", "jp", "jpe", "jpo", "js", "jz"
];

function isBranch(instr: any) {
  return x86JumpInstructions.indexOf(instr.mnemonic) >= 0;
}

var base64DecodeMap = [ // starts at 0x2B
  62, 0, 0, 0, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61,
  0, 0, 0, 0, 0, 0, 0, // 0x3A-0x40
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  19, 20, 21, 22, 23, 24, 25, 0, 0, 0, 0, 0, 0, // 0x5B-0x0x60
  26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43,
  44, 45, 46, 47, 48, 49, 50, 51
];

var base64DecodeMapOffset = 0x2B;
var base64EOF = 0x3D;

function decodeRestrictedBase64ToBytes(encoded: any) {
  var ch: any;
  var code: any;
  var code2: any;

  var len = encoded.length;
  var padding = encoded.charAt(len - 2) === '=' ? 2 : encoded.charAt(len - 1) === '=' ? 1 : 0;
  var decoded = new Uint8Array((encoded.length >> 2) * 3 - padding);

  for (var i = 0, j = 0; i < encoded.length;) {
    ch = encoded.charCodeAt(i++);
    code = base64DecodeMap[ch - base64DecodeMapOffset];
    ch = encoded.charCodeAt(i++);
    code2 = base64DecodeMap[ch - base64DecodeMapOffset];
    decoded[j++] = (code << 2) | ((code2 & 0x30) >> 4);

    ch = encoded.charCodeAt(i++);
    if (ch == base64EOF) {
      return decoded;
    }
    code = base64DecodeMap[ch - base64DecodeMapOffset];
    decoded[j++] = ((code2 & 0x0f) << 4) | ((code & 0x3c) >> 2);

    ch = encoded.charCodeAt(i++);
    if (ch == base64EOF) {
      return decoded;
    }
    code2 = base64DecodeMap[ch - base64DecodeMapOffset];
    decoded[j++] = ((code & 0x03) << 6) | code2;
  }
  return decoded;
}

const defaultHarnessText =
  `var wasmModule = new WebAssembly.Module(wasmCode);\n` +
  `var wasmInstance = new WebAssembly.Instance(wasmModule, wasmImports);\n` +
  `log(wasmInstance.exports.main());\n`;

export class AppComponent extends React.Component<void, {
  compilerOptions: string,
  isCompiling: boolean;
  isC: boolean;
  view: string;
  showCanvas: boolean;
  showSettings: boolean;
  showHelp: boolean;
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
      showCanvas: false,
      showSettings: false,
      showHelp: false
    } as any;
  }

  canvas: HTMLCanvasElement;
  func: IFrameSandbox;

  installKeyboardShortcuts() {
    Mousetrap.bind(['ctrl+shift+enter'], (e: any) => {
      this.build();
      e.preventDefault();
    });
    Mousetrap.bind(['ctrl+shift+k'], (e: any) => {
      this.clear();
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
          "harness": defaultHarnessText
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
  wastAssembly: any = {};

  build() {
    let self = this;
    let main = this.mainEditor;
    let options = this.state.compilerOptions;
    this.compileToWasm(main.editor.getValue(), options, (result: Uint8Array | string, wast: string, annotations: any[]) => {
      main.editor.getSession().clearAnnotations();
      if (annotations.length) {
        main.editor.getSession().setAnnotations(annotations);
        this.appendOutput(String(result));
        return;
      }
      self.wasmCode = result as Uint8Array;
      self.wastAssembly = {};
      this.forceUpdate();
    });
  }
  disassemble(json: any) {
    let self = this;
    if (typeof capstone === "undefined") {
      lazyLoad("lib/capstone.x86.min.js", go);
    } else {
      go();
    }
    function toBytes(a: any) {
      return a.map(function (x: any) { return padLeft(Number(x).toString(16), 2, "0"); }).join(" ");
    }
    function go() {
      let s = "";
      var cs = new capstone.Cs(capstone.ARCH_X86, capstone.MODE_64);
      var annotations: any [] = [];
      var assemblyInstructionsByAddress = Object.create(null);
      for (var i = 0; i < json.regions.length; i++) {
        var region = json.regions[i];
        s += region.name + ":\n";
        var csBuffer = decodeRestrictedBase64ToBytes(region.bytes);
        var instructions = cs.disasm(csBuffer, region.entry);
        var basicBlocks: any = {};
        instructions.forEach(function(instr: any, i: any) {
          assemblyInstructionsByAddress[instr.address] = instr;
          if (isBranch(instr)) {
            var targetAddress = parseInt(instr.op_str);
            if (!basicBlocks[targetAddress]) {
              basicBlocks[targetAddress] = [];
            }
            basicBlocks[targetAddress].push(instr.address);
            if (i + 1 < instructions.length) {
              basicBlocks[instructions[i + 1].address] = [];
            }
          }
        });
        instructions.forEach(function(instr: any) {
          if (basicBlocks[instr.address]) {
            s += " " + padRight(toAddress(instr.address) + ":", 39, " ");
            if (basicBlocks[instr.address].length > 0) {
              s += "; " + toAddress(instr.address) + " from: [" + basicBlocks[instr.address].map(toAddress).join(", ") + "]";
            }
            s += "\n";
          }
          s += "  " + padRight(instr.mnemonic + " " + instr.op_str, 38, " ");
          s += "; " + toAddress(instr.address) + " " + toBytes(instr.bytes) + "\n";
        });
        s += "\n";
      }
      self.viewEditor.editor.getSession().setValue(s, 1);
      self.viewEditor.editor.getSession().setMode("ace/mode/assembly_x86");
    }
  }
  runHarness() {
    State.sendAppEvent("run", "Harness");
    if (!this.wasmCode) {
      this.appendOutput("Build a WebAssembly module first.");
      return;
    }
    // |buffer| is needed for backward compatibility
    let self = this;
    let func = new IFrameSandbox("wasmCode", "buffer", "wasmImports", "lib", "log", "canvas", this.harnessEditor.editor.getValue());

    if (self.func) self.func.destroy();
    self.func = func;

    lib.log = function (x: any) {
      self.appendOutput(String(x));
    };
    lib.showCanvas = function (x: boolean = true) {
      self.setState({showCanvas: x} as any);
    };
    func.onerror = (x) => {
      self.appendOutput(x);
      State.sendAppEvent("error", "Run Harness");
    };

    func.call(this.wasmCode, this.wasmCode, this.createWasmImports(false), lib, lib.log, State.app.canvas);
  }

  createWasmImports(string: boolean): any {
    let wasmImports: any = {};
    if (!this.wasmCode || !WebAssembly.Module.imports) {
      return wasmImports;
    }
    WebAssembly.Module.imports(new WebAssembly.Module(this.wasmCode)).forEach((i: any) => {
      if (!wasmImports[i.module]) {
        wasmImports[i.module] = {};
      }
      if (i.kind === "function") {
        let name = demangle("_" + i.name);
        if (string) {
          wasmImports[i.module][i.name] =
          `    // ${name}\n` +
          `    ${i.name}: function ${i.name} () {\n` +
          `      // ...\n` +
          `    }`;
        } else {
          wasmImports[i.module][i.name] = function () {
            lib.log(`NYI: ${i.name} ${name}`);
          };
        }
      }
    });
    if (string) {
      let keys = Object.keys(wasmImports);
      let str = "var wasmImports = {\n";
      str += keys.map(key => {
        let fun = Object.keys(wasmImports[key]).map(name => {
          return wasmImports[key][name];
        }).join(",\n");
        return "  " + key + ": {\n" + fun + "\n  }";
      }).join(",");
      str += "\n};"
      return str;
    }
    return wasmImports;
  }

  compileToWasm(src: string, options: string, cb: (buffer: Uint8Array, wast: string, annotations?: any[]) => void) {
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
        cb(this.responseText, null, annotations);
        State.sendAppEvent("error", "Compile to Wasm (Error or Warnings)");
        return;
      }
      self.wast = this.responseText;
      let wast = encodeURIComponent(this.responseText).replace('%20', '+');
      self.setState({ isCompiling: true } as any);
      State.sendRequest("input=" + wast + "&action=" + "wast2wasm" + "&options=" + options, function () {
        self.setState({ isCompiling: false } as any);
        var buffer = atob(this.responseText.split('\n', 2)[1]);
        var data = new Uint8Array(buffer.length);
        for (var i = 0; i < buffer.length; i++) {
          data[i] = buffer.charCodeAt(i);
        }
        cb(data, self.wast, []);
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
  toggleSettings() {
    this.setState({showSettings: !this.state.showSettings} as any);
  }
  toggleHelp() {
    this.setState({showHelp: !this.state.showHelp} as any);
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
        this.viewEditor.editor.getSession().setMode("ace/mode/text");
        this.viewEditor.editor.setValue(this.wast, -1);
      } else if (this.state.view === "wasm") {
        this.viewEditor.editor.getSession().setMode("ace/mode/javascript");
        this.viewEditor.editor.setValue("var wasmCode = new Uint8Array([" + String(this.wasmCode) + "]);", -1);
      } else if (this.state.view == "imports") {
        this.viewEditor.editor.getSession().setMode("ace/mode/javascript");
        this.viewEditor.editor.setValue(this.createWasmImports(true), -1);
      } else if (this.state.view.indexOf("x86") == 0) {
        this.viewEditor.editor.setValue("");
        if (this.wast) {
          let type = this.state.view;
          let self = this;
          let options = type == "x86-baseline" ? "--wasm-always-baseline" : "";
          if (this.wastAssembly[type]) {
            self.disassemble(self.wastAssembly[type]);
          } else {
            let wast = encodeURIComponent(this.wast).replace('%20', '+');
            State.sendRequest("input=" + wast + "&action=wast2assembly&options=" + options, function () {
              self.wastAssembly[type] = JSON.parse(this.responseText);
              self.disassemble(self.wastAssembly[type]);
            });
          }
        }
      }
    }
    return <div className="gAppContainer">
      <a style={{ display: "none" }} ref={(self: any) => this.downloadLink = self} />
      <div className="gHeader">
        <div>
          <div className="canvasOverlay" style={{display: this.state.showCanvas ? "" : "none"}}>
            <div className="editorHeader">
              <span className="editorHeaderTitle">
                Canvas
              </span>
              <div className="editorHeaderButtons">
                <a title="Toggle Canvas" onClick={this.toggleCanvas.bind(this)}>Hide <i className="fa fa-window-close fa-lg" aria-hidden="true"></i></a>
              </div>
            </div>
            <canvas className="outputCanvas" ref={(self: any) => this.canvas = self} width={1200} height={1200} />
          </div>
          <div className="settingsOverlay" style={{display: this.state.showSettings ? "" : "none"}}>
            <span className="editorHeaderTitle">
                Settings
              </span>
            <div className="editorHeader">
              <div className="editorHeaderButtons">
                <a title="Toggle Settings" onClick={this.toggleSettings.bind(this)}>Hide <i className="fa fa-window-close fa-lg" aria-hidden="true"></i></a>
              </div>
            </div>
            <div className="settingSectionHeader">
              Compiler Options
            </div>
            <div className="settingSection">
              <CompilerOptionsComponent options={this.state.compilerOptions} onChange={this.compilerOptionsChanged.bind(this)} />{' '}
            </div>
          </div>
          <div className="helpOverlay" style={{display: this.state.showHelp ? "" : "none"}}>
            <div className="editorHeader">
              <span className="editorHeaderTitle">
                Help
              </span>
              <div className="editorHeaderButtons">
                <a title="Toggle Settings" onClick={this.toggleHelp.bind(this)}>Hide <i className="fa fa-window-close fa-lg" aria-hidden="true"></i></a>
              </div>
            </div>
            <div className="settingSection">
              WasmFiddle lets you compile C/C++ code to WebAssembly and run it in the browser.
              The JavaScript harness on the right has several global variables and helper functions.
            </div>
            <div className="settingSectionHeader">
              wasmCode: Uint8Array
            </div>
            <div className="settingSection">
              The compiled WebAssembly buffer.
            </div>
            <div className="settingSectionHeader">
              wasmImports: {"{ ... }"}
            </div>
            <div className="settingSection">
              This object is automatically generated by WasmFiddle for your convenience.
              It's a template containing function stubs for each imported WebAssembly function.
            </div>
            <div className="settingSectionHeader">
              canvas: HTMLCanvasElement
            </div>
            <div className="settingSection">
              WasmFiddle creates a 1200x1200 canvas element that you can draw into.
              You can display the canvas programmatically using <span className="codeSpan">lib.showCanvas()</span>.
            </div>
            <div className="settingSectionHeader">
              log()
            </div>
            <div className="settingSection">
              A simple logging function whose output is shown on the bottom right.
              You may also use the browser's <span className="codeSpan">console</span> object but you'll need to open up the developer tools to see the output.
            </div>
            <div className="settingSectionHeader">
              lib.UTF8ArrayToString(heap: Uint8Array, ptr: number)
            </div>
            <div className="settingSection">
              Converts a C string into a JavaScript string.
            </div>
            <div className="settingSectionHeader">
              lib.dumpMemory(heap: Uint8Array, ptr: number, len: number)
            </div>
            <div className="settingSection">
              Prints memory contents.
            </div>
            <div className="settingSectionHeader">
              lib.setStackPtr(heap: Uint8Array, ptr: number)
            </div>
            <div className="settingSection">
              Sets the default stack pointer address.
            </div>
          </div>
          <img src="img/web-assembly-icon-white-64px.png" className="waIcon" />
        </div>
        <div className="gShareURI">
          {window.location.origin + window.location.pathname + '?' + State.fiddleURI}
        </div>
        <div className="gShareButton">
          <a title="Build: CTRL + Shift + Return" onClick={this.build.bind(this)}><i className={"fa fa-cog " + (this.state.isCompiling ? "fa-spin" : "") + " fa-lg"} aria-hidden="true"></i></a>{' '}
          <a className={this.wasmCode ? "" : "disabled-link"} title="Run: CTRL + Return" onClick={this.runHarness.bind(this)}><i className="fa fa-play-circle fa-lg" aria-hidden="true"></i></a>{' '}
          <a title="Toggle Settings" onClick={this.toggleSettings.bind(this)}><i className="fa fa-wrench fa-lg" aria-hidden="true"></i></a>{' '}
          <a title="Toggle Help" onClick={this.toggleHelp.bind(this)}><i className="fa fa-book fa-lg" aria-hidden="true"></i></a>{' '}
          <i title="Share" onClick={this.share.bind(this)} className="fa fa-cloud-upload fa-lg" aria-hidden="true"></i>
        </div>
      </div>
      <div>
        <div className="gV2">
          <div>
            <div className="editorHeader"><span className="editorHeaderTitle">{this.state.isC ? "C" : "C++"}</span>
              <div className="editorHeaderButtons">
                <a title="Build: CTRL + Shift + Return" onClick={this.build.bind(this)}>Build <i className={"fa fa-cog " + (this.state.isCompiling ? "fa-spin" : "") + " fa-lg"} aria-hidden="true"></i></a>{' '}
                <a className={this.wasmCode ? "" : "disabled-link"} title="Run: CTRL + Return" onClick={this.runHarness.bind(this)}>Run <i className="fa fa-play-circle fa-lg" aria-hidden="true"></i></a>
              </div>
            </div>
            <EditorComponent ref={(self: any) => this.mainEditor = self} name="main" mode="ace/mode/c_cpp" showGutter={true} showLineNumbers={true} />
          </div>
          <div>
            <div className="editorHeader"><span className="editorHeaderTitle">JS</span>
              <div className="editorHeaderButtons">

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
                <option value="imports">Imports Template</option>
                <option value="x86">Firefox x86</option>
                <option value="x86-baseline">Firefox x86 Baseline</option>
              </select>
              <div className="editorHeaderButtons">
                {/*<a title="Assemble" onClick={this.assemble.bind(this)}>Assemble <i className="fa fa-download fa-lg" aria-hidden="true"></i></a>*/}
                <a className={this.wasmCode ? "" : "disabled-link"} title="Download WebAssembly Text" onClick={this.download.bind(this, "wast")}>Wast <i className="fa fa-download fa-lg" aria-hidden="true"></i></a>{' '}
                <a className={this.wasmCode ? "" : "disabled-link"} title="Download WebAssembly Binary" onClick={this.download.bind(this, "wasm")}>Wasm <i className="fa fa-download fa-lg" aria-hidden="true"></i></a>
              </div>
            </div>
            <EditorComponent ref={(self: any) => this.viewEditor = self} name="view" save={false} readOnly={true} fontSize={10} />
          </div>
          <div>
            <div className="editorHeader"><span className="editorHeaderTitle">Output</span>
              <div className="editorHeaderButtons">
                <a title="Toggle Canvas" onClick={this.toggleCanvas.bind(this)}>Canvas <i className="fa fa-picture-o fa-lg" aria-hidden="true"></i></a>{' '}
                <a title="Clear Output: CTRL + Shift + K" onClick={this.clear.bind(this)}>Clear <i className="fa fa-close fa-lg" aria-hidden="true"></i></a>
              </div>
            </div>
            <EditorComponent ref={(self: any) => this.outputEditor = self} name="output" save={false} readOnly={true} fontSize={10} />
          </div>
        </div>
      </div>
    </div>
  }
}