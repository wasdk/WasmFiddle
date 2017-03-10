import * as React from "react";

interface CompilerOptionsComponentState {
  dialect: string;
  optimizationLevel: string;
}

export class CompilerOptionsComponent extends React.Component<{
  options?: string;
  onChange?: (options: string) => void
}, CompilerOptionsComponentState> {
  constructor () {
    super();
    this.state = {
      dialect: "-std=C99",
      optimizationLevel: "-O3"
    } as any;
  }

  dialects = ["-std=C89", "-std=C99", "-std=C++98", "-std=C++11", "-std=C++14", "-std=C++1z"];
  optimizationLevels = ["-O0", "-O1", "-O2", "-O3", "-O4", "-Os"];

  componentDidMount() {
    if (this.props.options) {
      this.loadState(this.props.options);
    }
  }
  componentWillReceiveProps(props: any) {
    if (props.options) {
      this.loadState(props.options);
    }
  }
  optimizationLevelChanged(e: any) {
    this.setState({optimizationLevel: e.target.value} as any, () => {
      this.onChange();
    });
  }

  dialectChanged(e: any) {
    this.setState({dialect: e.target.value} as any, () => {
      this.onChange();
    });
  }

  loadState(options: string) {
    let s: CompilerOptionsComponentState = {} as any;
    options.split(" ").forEach(o => {
      if (o.indexOf("-O") == 0) {
        s.optimizationLevel = o;
      } else if (o.indexOf("-std=") == 0) {
        s.dialect = o;
      }
    });
    this.setState(s);
  }

  saveState() {
    return [this.state.optimizationLevel, this.state.dialect].join(" ");
  }

  onChange() {
    if (this.props.onChange) {
      this.props.onChange(this.saveState());
    }
  }

  render() {
    return <span>
      <select title="Optimization Level" value={this.state.optimizationLevel} onChange={this.optimizationLevelChanged.bind(this)}>
        { this.optimizationLevels.map(x => <option key={x}>{x}</option>) }
      </select>{' '}
      <select title="Dialect" value={this.state.dialect} onChange={this.dialectChanged.bind(this)}>
        { this.dialects.map(x => <option key={x}>{x}</option>) }
      </select>
    </span>
  }
}