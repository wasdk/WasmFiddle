declare var WebAssembly: any;

import { EditorComponent } from "./components/Editor";
import { AppComponent } from "./App";
import { lib } from "./lib"

export class State {
  static sendServiceEvent(label: string) {
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent('serviceevent', false, false,
      { 'category': 'Service', 'action': 'send', 'label': label });
    window.dispatchEvent(evt);
  }

  static sendAppEvent(action: string, label?: string): void {
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent('serviceevent', false, false,
      { 'category': 'App', 'action': action, 'label': label });
    window.dispatchEvent(evt);
  }

  static sendRequest(command: string, cb: (any)) {
    var self = this;
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function () {
      cb.call(this);
    });
    xhr.open("POST", "//wasmexplorer-service-next.herokuapp.com/service.php", true);
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
  static fiddleURI: string = "";
  static app: AppComponent;
}