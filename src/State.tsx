declare var WebAssembly: any;

import { EditorComponent } from "./components/Editor";
import { AppComponent } from "./App";
import { lib } from "./lib";
import { WasmFiddleConfig } from "./config";

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
    xhr.open("POST", WasmFiddleConfig.serviceURL, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xhr.send(command);
  }

  static getOutput(response: string): string {
    if (/^\{.*\}$/.test(response)) { // Is JSON?
      try {
        const obj = JSON.parse(response);
        if (obj.success) {
          return '';
        } else {
          return (!obj.tasks ? '' :
            obj.tasks.map((t : any) => '===== ' + t.name + '\n' + t.console)
            .join('\n') + '\n') + 'ERROR: ' + obj.message;
        }
      } catch (e) {
        // Ignore invalid JSON
      }
      // Fall through
    }
    if (response.indexOf("(module") !== 0 &&
        response.indexOf("AGFzbQE") !== 0) {
      return response;
    } else {
      return '';
    }
  }

  static getAnnotations(response: string) {
    var output = State.getOutput(response);
    // Parse and annotate errors if compilation fails.
    var annotations: any[] = [];
    if (!output) {
      return annotations;
    }
    var re = /^.*?:(\d+?):(\d+?):(.*)$/gm;
    var m: any;
    while ((m = re.exec(output)) !== null) {
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
    return annotations;
  }

  static getResultBinary(response: string): Uint8Array {
    if (/^\{.*\}$/.test(response)) { // Is JSON?
      try {
        const obj = JSON.parse(response);
        if (!obj.success) {
          return null;
        }
        response = obj.output;
      } catch (e) {
        // Ignore invalid JSON
      }
      // Fall through
    }
    var buffer = atob(response);
    var data = new Uint8Array(buffer.length);
    for (var i = 0; i < buffer.length; i++) {
      data[i] = buffer.charCodeAt(i);
    }
    return data;
  }

  static fiddleURI: string = "";
  static app: AppComponent;
}