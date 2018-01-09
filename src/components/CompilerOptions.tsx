import * as React from "react";

interface CompilerOptionsComponentState {
  dialect: string;
  optimizationLevel: string;
  compilerVersion: number;
}

export class CompilerOptionsComponent extends React.Component<{
  options?: string;
  compilerVersion?: number;
  onChange?: (options: string, version: number) => void
}, CompilerOptionsComponentState> {
  constructor(props: any) {
    super(props);
    this.state = {
      dialect: "-std=C99",
      optimizationLevel: "-O3",
      compilerVersion: 1
    } as any;
  }

  dialects = ["-std=C89", "-std=C99", "-std=C++98", "-std=C++11", "-std=C++14", "-std=C++1z"];
  optimizationLevels = ["-O0", "-O1", "-O2", "-O3", "-O4", "-Os"];

  componentDidMount() {
    if (this.props.options) {
      this.loadState(this.props.options, this.props.compilerVersion || 1);
    }
  }
  componentWillReceiveProps(props: any) {
    if (props.options) {
      this.loadState(props.options, props.compilerVersion);
    }
  }
  optimizationLevelChanged(e: any) {
    this.setState({ optimizationLevel: e.target.value } as any, () => {
      this.onChange();
    });
  }
  newCompilerChanged(e: any) {
    this.setState({ compilerVersion: e.target.checked ? 2 : 1 } as any, () => {
      this.onChange();
    })
  }

  dialectChanged(e: any) {
    this.setState({ dialect: e.target.value } as any, () => {
      this.onChange();
    });
  }

  loadState(options: string, compilerVersion: number) {
    let s: CompilerOptionsComponentState = {} as any;
    options.split(" ").forEach(o => {
      if (o.indexOf("-O") == 0) {
        s.optimizationLevel = o;
      } else if (o.indexOf("-std=") == 0) {
        s.dialect = o;
      }
    });
    s.compilerVersion = compilerVersion;
    this.setState(s);
  }

  saveState() {
    return [this.state.optimizationLevel, this.state.dialect].join(" ");
  }

  onChange() {
    if (this.props.onChange) {
      this.props.onChange(this.saveState(), this.state.compilerVersion);
    }
  }

  render() {
    return <div>
      <span>
        <select title="Optimization Level" value={this.state.optimizationLevel} onChange={this.optimizationLevelChanged.bind(this)}>
          {this.optimizationLevels.map(x => <option key={x}>{x}</option>)}
        </select>{' '}
        <select title="Dialect" value={this.state.dialect} onChange={this.dialectChanged.bind(this)}>
          {this.dialects.map(x => <option key={x}>{x}</option>)}
        </select>
      </span><br />
      <span>
        <label>
          New compiler:
          <input type="checkbox" checked={this.state.compilerVersion == 2} onChange={this.newCompilerChanged.bind(this)} />
        </label>
      </span>
    </div>
  }
}