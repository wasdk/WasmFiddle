import * as React from "react";

export class ToastContainer extends React.Component<{
    toasts: Array<Object>,
    dismiss: Function
}, any> {

  constructor(props: any){
    super(props);
  }

  public render() {
    return (
      <div className="toast-container">
        {this.props.toasts.map((key: any, value: any) =>
          <Toast onClick={this.props.dismiss.bind(this, value)} key={value} data={key}/>
        )}
      </div>
    );
  }
}

const Toast = (props: any) => {
  return (
  <div className="toast">
    <div className="toastHeader">
      <span className="editorHeaderTitle">
        Gist created!
        <a target="_blank" href={props.data.url}><span className="toastSpan">Open in new tab</span>
        </a>
      </span>
      <div className="editorHeaderButtons">
        <a title="Dismiss" onClick={props.onClick}>Dismiss <i className="fa fa-window-close fa-lg" aria-hidden="true"></i></a>
      </div>
    </div>
  </div>
);
};