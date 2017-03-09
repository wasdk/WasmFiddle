import * as React from "react";
import * as ReactSplitPane from "react-split-pane";
import { State } from "./State";
import { EditorComponent } from "./components/Editor";

declare var Mousetrap: any;

export class AppComponent extends React.Component<void, {
  compilerOptions: string
}> {

  constructor() {
    super();
    this.installKeyboardShortcuts();
    this.state = {
      compilerOptions: "-O3"
    } as any;
    State.app = this;
  }

  installKeyboardShortcuts() {
    Mousetrap.bind(['command+shift+k'], (e: any) => {
      State.run();
      e.preventDefault();
    });
    Mousetrap.bind(['ctrl+enter', 'command+enter'], (e: any) => {
      State.assemble();
      e.preventDefault();
    });
    Mousetrap.bind(['command+shift+s'], (e: any) => {
      State.saveForever();
      e.preventDefault();
    });
    Mousetrap.bind(['command+shift+.'], (e: any) => {
      State.nextPane(1);
      e.preventDefault();
    });
    Mousetrap.bind(['command+shift+,'], (e: any) => {
      State.nextPane(-1);
      e.preventDefault();
    });
  }

  componentDidMount() {
    State.init();
  }
  onSaveJavaScript(text: string) {
    localStorage["js-source"] = text;
  }
  compilerOptionsChanged(e: any) {
    this.setState({
      compilerOptions: e.target.value
    });
  }
  onResize() {
    State.resize();
  }
  render(): any {
    return <div>
      <ReactSplitPane split="horizontal" allowResize={false} onChange={this.onResize.bind(this)}>
        <div className="header">
          <a onClick={State.saveForever} href="#" className="btn btn-sm btn-success"><span className="glyphicon glyphicon-save"></span> Save</a>{' '}
          <span className="headerTitle">WasmFiddle {State.fiddleURI}</span>
          <div className="editorHeaderButtons">
            <a onClick={State.saveForever} href="#" className="btn btn-sm btn-success"><span className="glyphicon glyphicon-share"></span> Share</a>
          </div>
          {/*<input value={this.state.compilerOptions} onChange={this.compilerOptionsChanged.bind(this)} type="text" className="input-sm" placeholder="Search" />*/}
        </div>
        <ReactSplitPane split="vertical" defaultSize="50%" onChange={this.onResize.bind(this)}>
          <div>
            <ReactSplitPane split="horizontal" defaultSize="50%" onChange={this.onResize.bind(this)}>
              <div className="editorContainer">
                <div className="editorHeader"><span className="editorHeaderTitle">main.c</span>
                  <div className="editorHeaderButtons">
                    <a onClick={State.run} href="#" className="btn btn-xs btn-success"><span className="glyphicon glyphicon-play"></span> Compile & Run</a>{' '}
                  </div>
                </div>
                <EditorComponent name="main.c" mode="ace/mode/c_cpp" />
              </div>
              <div className="editorContainer">
                <div className="editorHeader"><span className="editorHeaderTitle">harness.js</span>
                  <div className="editorHeaderButtons">
                    <a onClick={State.runHarness} href="#" className="btn btn-xs btn-success"><span className="glyphicon glyphicon-play"></span> Run</a>{' '}
                  </div>
                </div>
                <EditorComponent name="harness.js" mode="ace/mode/javascript" />
              </div>
            </ReactSplitPane>
          </div>
          <div>
            <ReactSplitPane split="horizontal" defaultSize="60%" onChange={this.onResize.bind(this)}>
              <ReactSplitPane split="horizontal" defaultSize="80%" onChange={this.onResize.bind(this)}>
                <div className="editorContainer">
                  <div className="editorHeader"><span className="editorHeaderTitle">out.wast</span>
                    <div className="editorHeaderButtons">
                      <a onClick={State.assemble} href="#" className="btn btn-xs btn-success"><span className="glyphicon glyphicon-play"></span> Assemble & Run</a>{' '}
                    </div>
                  </div>
                  <EditorComponent name="wast" />
                </div>
                <div className="editorContainer">
                  <div className="editorHeader"><span className="editorHeaderTitle">out.wasm</span>
                    <div className="editorHeaderButtons">
                      <a onClick={State.run} href="#" className="btn btn-xs btn-success"><span className="glyphicon glyphicon-save"></span> Download</a>{' '}
                    </div>
                  </div>
                  <EditorComponent name="wasm" save={false} readOnly={true} />
                </div>
              </ReactSplitPane>
              <div className="editorContainer">
                <div className="editorHeader"><span className="editorHeaderTitle">out</span>
                  <div className="editorHeaderButtons">
                    <a onClick={State.clearOutput} href="#" className="btn btn-xs btn-success"><span className="glyphicon glyphicon-ban-circle"></span> Clear</a>{' '}
                  </div>
                </div>
                <EditorComponent name="output" save={false} readOnly={true} />
              </div>
            </ReactSplitPane>
          </div>
        </ReactSplitPane>
      </ReactSplitPane>
    </div>
  }
}