export class IFrameSandbox {
  private _iframe: Element;

  public call: Function;

  public constructor(...args: any[]) {
    var body = args.pop();
    var iframe = document.createElement('iframe');
    iframe.className = 'hidden';
    iframe.src = URL.createObjectURL(new Blob([`<!DOCTYPE html>
  <html>
  <head><meta charset='utf-8'></head>
  <body>
    <script>
  function run() {
  ${body}
  }
  frameElement.onready();
    </script>
  </body></html>`], {type: 'text/html'}));
    document.body.appendChild(iframe);
    this._iframe = iframe;

    var ready = new Promise((resolve: (w: any)=>void) => {
      var iframe_: any = iframe;
      iframe_.onready = () => {
        resolve(iframe.contentWindow);
      };
    });

    this.call = function(...values: any[]) {
      ready.then((w: any) => {
        for (var i = 0; i < values.length; i++)
          w[args[i]] = values[i];
        w.run();
      });
    };
  }
  
  public destroy() {
    this._iframe.remove();
  }
}