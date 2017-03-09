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

  canvas: HTMLCanvasElement;

  installKeyboardShortcuts() {
    Mousetrap.bind(['ctrl+shift+enter'], (e: any) => {
      State.run();
      e.preventDefault();
    });
    Mousetrap.bind(['ctrl+enter'], (e: any) => {
      State.runHarness();
      e.preventDefault();
    });
    Mousetrap.bind(['command+s'], (e: any) => {
      State.saveForever();
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
    {/*<a onClick={State.save} href="#" className="btn btn-sm btn-success"><span className="glyphicon glyphicon-save"></span> Save</a>{' '}*/ }
    {/*<input value={this.state.compilerOptions} onChange={this.compilerOptionsChanged.bind(this)} type="text" className="input-sm" placeholder="Search" />*/ }
    return <div>
      <ReactSplitPane split="horizontal" allowResize={false} onChange={this.onResize.bind(this)}>
        <div className="header">
          <span className="headerTitle">
            <img src="img/web-assembly-icon-white-64px.png" className="waIcon"/>{' '}
            {State.fiddleURI}
          </span>
          <div className="editorHeaderButtons">
            <a onClick={State.saveForever} href="#" className="btn"><span className="glyphicon glyphicon-share"></span> Share</a>
          </div>
        </div>
        <ReactSplitPane split="horizontal" defaultSize="70%" onChange={this.onResize.bind(this)}>
          <div>
            <ReactSplitPane split="vertical" defaultSize="50%" onChange={this.onResize.bind(this)}>
              <div className="editorContainer">
                <div className="editorHeader"><span className="editorHeaderTitle">main.c</span>
                  <div className="editorHeaderButtons">
                    <a title="CTRL + Shift + Return" onClick={State.run} href="#" className="btn"><span className="glyphicon glyphicon-play"></span> Compile & Run</a>
                  </div>
                </div>
                <EditorComponent name="main.c" mode="ace/mode/c_cpp" showGutter={true} showLineNumbers={true}/>
              </div>
              <div className="editorContainer">
                <div className="editorHeader"><span className="editorHeaderTitle">harness.js</span>
                  <div className="editorHeaderButtons">
                    <a title="CTRL + Return" onClick={State.runHarness} href="#" className="btn"><span className="glyphicon glyphicon-play"></span> Run</a>
                  </div>
                </div>
                <EditorComponent name="harness.js" mode="ace/mode/javascript" showGutter={true} showLineNumbers={true}/>
              </div>
            </ReactSplitPane>
          </div>
          <div>
            <ReactSplitPane split="vertical" defaultSize="50%" onChange={this.onResize.bind(this)}>
              <ReactSplitPane split="vertical" defaultSize="50%" onChange={this.onResize.bind(this)}>
                <div className="editorContainer">
                  <div className="editorHeader"><span className="editorHeaderTitle">out.wast</span>
                    <div className="editorHeaderButtons">
                      {/*<a onClick={State.run} href="#" className="btn"><span className="glyphicon glyphicon-play"></span> Assemble & Run</a>{' '}*/}
                    </div>
                  </div>
                  <EditorComponent name="wast" save={false} readOnly={true} />
                </div>
                <div className="editorContainer">
                  <div className="editorHeader"><span className="editorHeaderTitle">out.wasm</span>
                    <div className="editorHeaderButtons">
                      <a onClick={State.run} href="#" className="btn"><span className="glyphicon glyphicon-save"></span> Download</a>{' '}
                    </div>
                  </div>
                  <EditorComponent name="wasm" save={false} readOnly={true} />
                </div>
              </ReactSplitPane>
              <div className="editorContainer">
                <div className="editorHeader"><span className="editorHeaderTitle">out</span>
                  <div className="editorHeaderButtons">
                    <a onClick={State.clearOutput} href="#" className="btn"><span className="glyphicon glyphicon-ban-circle"></span> Clear</a>{' '}
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