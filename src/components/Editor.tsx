import * as React from "react";
import { State } from "../State";
import { AsyncEvent } from 'ts-events';

declare var monaco: any;
declare var require: any;
declare var ace: any;

export class EditorComponent extends React.Component<{
  save?: boolean;
  readOnly?: boolean;
  name: string,
  mode?: string,
  action?: string
}, void> {
  container: HTMLDivElement;
  public editor: any;
  public static defaultProps = {
    // source: "",
    mode: "",
    action: "",
    save: true,
    readOnly: false
  };
  componentWillUnmount() {
    State.removeEditor(this);
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
    editor.commands.addCommands(
      [{
        bindKey: { win: "Ctrl-S", mac: "Command-S" }, exec: function () {
          State.saveForever();
        }
      },
      {
        bindKey: { win: "Ctrl-Shift-K", mac: "Command-Shift-K" }, exec: function () {
          State.run();
        }
      },
      {
        bindKey: { win: "Ctrl-Enter", mac: "Command-Enter" }, exec: function () {
          State.assemble();
        }
      },
      {
        bindKey: { win: "Ctrl-Shift-.", mac: "Command-Shift-." }, exec: function () {
          State.nextPane(1);
        }
      },
      {
        bindKey: { win: "Ctrl-Shift-,", mac: "Command-Shift-," }, exec: function () {
          State.nextPane(-1);
        }
      }
      ]
    );

    State.addEditor(this);
  }
  onChange() {

  }
  render(): any {
    return <div ref={(self: any) => this.container = self} className="editorBody" />
  }
}