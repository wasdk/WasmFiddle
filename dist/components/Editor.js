"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const State_1 = require("../State");
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
//# sourceMappingURL=Editor.js.map