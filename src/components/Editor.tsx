import * as React from "react";
import { State } from "../State";
import { AsyncEvent } from 'ts-events';

declare var monaco: any;
declare var require: any;
declare var ace: any;

export class EditorComponent extends React.Component<{
  save?: boolean;
  readOnly?: boolean;
  name: string;
  mode?: string;
  action?: string;
  showGutter?: boolean;
  showLineNumbers?: boolean;
  fontSize?: number;
}, void> {
  container: HTMLDivElement;
  public editor: any;
  public static defaultProps = {
    // source: "",
    mode: "",
    action: "",
    save: true,
    readOnly: false,
    showGutter: false,
    showLineNumbers: false,
    fontSize: 11
  };
  componentDidMount() {
    let editor = this.editor = ace.edit(this.container);
    var theme = true ? "ace/theme/monokai" : "ace/theme/github";
    // editor.setValue(this.props.source, -1);
    editor.setReadOnly(this.props.readOnly);
    editor.setTheme(theme);
    editor.setFontSize(this.props.fontSize);
    editor.getSession().setUseSoftTabs(true);
    editor.getSession().setTabSize(2);
    editor.setShowPrintMargin(false);
    editor.setOptions({
      wrap: true,
      enableBasicAutocompletion: true,
      // enableSnippets: true,
      // enableLiveAutocompletion: true,
      showLineNumbers: this.props.showLineNumbers,
      showGutter: this.props.showGutter
    });
    editor.$blockScrolling = Infinity;
    editor.renderer.setScrollMargin(10, 10);
    editor.getSession().setMode(this.props.mode);
    let action = this.props.action;
    let self = this;
    editor.commands.addCommands(
      [{
        bindKey: { win: "Ctrl-S", mac: "Command-S" }, exec: function () {
          State.app.share();
        }
      },
      {
        bindKey: { win: "Ctrl-Shift-Return", mac: "Ctrl-Shift-Return" }, exec: function () {
          State.app.run();
        }
      },
      {
        bindKey: { win: "Ctrl-Return", mac: "Ctrl-Return" }, exec: function () {
          State.app.runHarness();
        }
      }
      ]
    );
  }
  onChange() {

  }
  render(): any {
    return <div ref={(self: any) => this.container = self} className="editorBody"/>
  }
}